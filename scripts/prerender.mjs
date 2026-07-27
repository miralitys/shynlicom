/**
 * Пре-рендер статических HTML для всех маршрутов из sitemap.xml.
 *
 * Зачем: сайт это Vite + React SPA. В сыром HTML у всех страниц одинаковая
 * пустая оболочка (title «Shynli Cleaning | House Cleaning in Chicago Western
 * Suburbs», H1 «Shynli», слово города 0 раз). Google рендерит JS и индексирует
 * ядро, но 453 из ~640 страниц висят в «Обнаружена, не проиндексирована»:
 * краулер не тратит бюджет на то, что в HTML выглядит одинаковым.
 *
 * Как чинится: после сборки поднимаем dist локально, прогоняем Playwright по
 * всем URL из sitemap и сохраняем ГОТОВЫЙ HTML в dist/<путь>/index.html.
 *
 * Менять server.mjs НЕ нужно: serveStatic уже отдаёт dist/<путь>/index.html,
 * если файл существует, и падает в SPA-фолбэк только когда файла нет.
 *
 * Запуск:
 *   npm run build
 *   npx playwright install chromium   (один раз)
 *   node scripts/prerender.mjs
 */

import { createServer } from "node:http"
import { createReadStream } from "node:fs"
import { mkdir, readFile, stat, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { chromium } from "playwright"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, "..")
const distDir = path.join(rootDir, "dist")

const PORT = Number(process.env.PRERENDER_PORT || 4183)
const CONCURRENCY = Number(process.env.PRERENDER_CONCURRENCY || 6)
const NAV_TIMEOUT = 30000

// Главную НЕ трогаем: в dist/index.html лежит оболочка, которую server.mjs
// использует как SPA-фолбэк для неизвестных маршрутов. К тому же у главной
// title и description в сыром HTML и так правильные.
const SKIP_PATHS = new Set(["/"])

const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".png", "image/png"],
  [".webp", "image/webp"],
  [".ico", "image/x-icon"],
  [".txt", "text/plain; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
  [".woff2", "font/woff2"],
])

function startStaticServer(shellHtml) {
  const server = createServer(async (request, response) => {
    const url = new URL(request.url || "/", "http://localhost")
    const normalized = decodeURIComponent(url.pathname).replace(/^\/+/, "")
    const safe = normalized.split("/").filter((part) => part && part !== "..").join("/")

    // Маршруты приложения (без расширения) ВСЕГДА отдаём чистой оболочкой.
    // Иначе повторный запуск скормил бы Playwright свой же прошлый вывод
    // из dist/<путь>/index.html, и ошибка бы законсервировалась.
    if (!path.extname(safe)) {
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
      response.end(shellHtml)
      return
    }

    const candidate = path.join(distDir, safe)
    const filePath = candidate.startsWith(distDir) ? candidate : path.join(distDir, "index.html")

    try {
      const info = await stat(filePath)
      const finalPath = info.isDirectory() ? path.join(filePath, "index.html") : filePath
      response.writeHead(200, { "Content-Type": contentTypes.get(path.extname(finalPath)) || "application/octet-stream" })
      createReadStream(finalPath).pipe(response)
    } catch {
      response.writeHead(404)
      response.end("not found")
    }
  })

  return new Promise((resolve) => server.listen(PORT, () => resolve(server)))
}

async function readRoutesFromSitemap() {
  const sitemapPath = path.join(distDir, "sitemap.xml")
  const xml = await readFile(sitemapPath, "utf8")
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((match) => match[1])

  const routes = new Set()
  for (const loc of locs) {
    let pathname
    try {
      pathname = new URL(loc).pathname
    } catch {
      pathname = loc.startsWith("/") ? loc : `/${loc}`
    }
    pathname = pathname.replace(/\/+$/, "") || "/"
    if (SKIP_PATHS.has(pathname)) continue
    routes.add(pathname)
  }

  return [...routes].sort()
}

async function renderRoute(context, route, shellTitle) {
  const page = await context.newPage()
  try {
    await page.goto(`http://127.0.0.1:${PORT}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: NAV_TIMEOUT,
    })

    // Ключевой момент. У index.html есть статическая заглушка (~87 слов),
    // и она проходит любую наивную проверку «в root есть текст». Реальный
    // React-рендер приходит секунд через шесть и МЕНЯЕТ document.title.
    // Поэтому ждём именно смены title плюс объём текста.
    await page.waitForFunction(
      (shell) => {
        const root = document.getElementById("root")
        if (!root) return false
        const words = (root.innerText || "").split(/\s+/).filter(Boolean).length
        return document.title !== shell && document.title.length > 0 && words > 250
      },
      shellTitle,
      { timeout: NAV_TIMEOUT },
    )

    const html = await page.content()
    const title = await page.title()
    const words = await page.evaluate(() => (document.getElementById("root")?.innerText || "").split(/\s+/).length)

    const outDir = path.join(distDir, route.replace(/^\//, ""))
    await mkdir(outDir, { recursive: true })
    await writeFile(path.join(outDir, "index.html"), html, "utf8")

    return { route, ok: true, title, words }
  } catch (error) {
    return { route, ok: false, error: error.message }
  } finally {
    await page.close()
  }
}

async function main() {
  try {
    await stat(path.join(distDir, "index.html"))
  } catch {
    console.error("dist/index.html не найден. Сначала запусти: npm run build")
    process.exit(1)
  }

  const shellHtml = await readFile(path.join(distDir, "index.html"), "utf8")
  const shellTitle = (shellHtml.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "").trim()
  if (!shellTitle) {
    console.error("Не удалось прочитать <title> из dist/index.html")
    process.exit(1)
  }

  const routes = await readRoutesFromSitemap()
  console.log(`Маршрутов к пре-рендеру: ${routes.length} (главная пропущена намеренно)`)
  console.log(`Оболочка определяется по title: «${shellTitle}»`)

  const server = await startStaticServer(shellHtml)
  const browser = await chromium.launch()
  const context = await browser.newContext({ userAgent: "ShynliPrerender/1.0" })

  // Внешние запросы (аналитика, пиксели) при пре-рендере не нужны и только
  // тормозят: они не отвечают и держат загрузку лишние секунды.
  await context.route("**/*", (route) => {
    const host = new URL(route.request().url()).hostname
    if (host === "127.0.0.1" || host === "localhost") return route.continue()
    return route.abort()
  })

  const results = []
  let cursor = 0
  let done = 0

  async function worker() {
    while (cursor < routes.length) {
      const route = routes[cursor++]
      const result = await renderRoute(context, route, shellTitle)
      results.push(result)
      done += 1
      if (done % 25 === 0 || done === routes.length) {
        console.log(`  ${done}/${routes.length}`)
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker))

  await context.close()
  await browser.close()
  server.close()

  const ok = results.filter((result) => result.ok)
  const failed = results.filter((result) => !result.ok)
  const thin = ok.filter((result) => result.words < 150)
  const dupTitles = new Map()
  for (const result of ok) {
    dupTitles.set(result.title, (dupTitles.get(result.title) || 0) + 1)
  }
  const repeated = [...dupTitles.entries()].filter(([, count]) => count > 1)

  console.log("")
  console.log(`Готово: ${ok.length} страниц записано, ошибок ${failed.length}`)
  if (thin.length) console.log(`⚠️  Тонких (<150 слов): ${thin.length}`)
  if (repeated.length) {
    console.log(`⚠️  Повторяющихся title: ${repeated.length}`)
    for (const [title, count] of repeated.slice(0, 5)) console.log(`     ${count}× ${title}`)
  }
  if (failed.length) {
    console.log("")
    console.log("Не удалось:")
    for (const result of failed.slice(0, 20)) console.log(`  ${result.route}: ${result.error}`)
  }

  if (failed.length > routes.length * 0.1) {
    console.error("")
    console.error(`⚠️  Больше 10% маршрутов не отрендерилось (${failed.length} из ${routes.length}).`)
    if (process.env.PRERENDER_STRICT === "1") {
      console.error("PRERENDER_STRICT=1, останавливаю сборку.")
      process.exit(1)
    }
    console.error("Сайт задеплоится и будет работать (SPA-фолбэк), но SEO-выигрыш неполный. Разобраться в логах.")
  }
}

main().catch((error) => {
  console.error("Пре-рендер упал целиком:")
  console.error(error)
  // Сайт без пре-рендера всё равно рабочий (SPA-фолбэк), поэтому деплой не роняем.
  // Нужно жёстко, ставь PRERENDER_STRICT=1.
  process.exit(process.env.PRERENDER_STRICT === "1" ? 1 : 0)
})
