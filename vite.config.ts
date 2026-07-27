import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { mkdirSync, writeFileSync } from 'node:fs'
import {
  cityPages,
  cityServicePageCities,
  genericSeoPages,
  getCityServiceSeoServices,
  seoServices,
} from './src/site/data'

const SITE_NAME = 'Shynli Cleaning'

// Обрезка описания повторяет normalizeSeoDescription из src/site/shared.tsx.
function normalizeDescription(value: string) {
  const text = value.replace(/\s+/g, ' ').trim()
  if (text.length <= 170) return text
  return `${text.slice(0, 167).replace(/\s+\S*$/, '')}.`
}

/**
 * Пишет dist/seo-routes.json: карта «маршрут → title/description» для всех
 * страниц городов и услуг.
 *
 * Зачем. Сайт это SPA, title и description ставит клиентский JS (useSeoMeta),
 * поэтому в сыром HTML у всех 626 страниц был один и тот же заголовок, и 453
 * URL висели в GSC как «Обнаружена, не проиндексирована»: краулер не тратит
 * бюджет на то, что выглядит одинаково.
 *
 * server.mjs уже умеет подставлять мету в HTML до отдачи (injectRouteSeo), но
 * знал только про /guides/*. Этот файл даёт ему остальные маршруты.
 *
 * Тексты один в один повторяют то, что рисует React (src/site/pages.tsx,
 * CityPage и ServiceSeoPage), чтобы серверная и клиентская версии не расходились.
 */
function seoRoutesPlugin() {
  return {
    name: 'shynli-seo-routes',
    apply: 'build' as const,
    closeBundle() {
      const routes: Record<string, { title: string; description: string }> = {}

      for (const city of cityPages) {
        routes[`/service-areas/${city.slug}`] = {
          title: `House Cleaning in ${city.name}, IL | ${SITE_NAME}`,
          description: normalizeDescription(
            `Book standard, deep, move-in, move-out, and recurring home cleaning in ${city.name}, IL. Check your ZIP and get a clear Shynli quote before booking.`,
          ),
        }
      }

      for (const service of seoServices) {
        routes[`/services/${service.slug}`] = {
          title: `${service.name} | ${SITE_NAME}`,
          description: normalizeDescription(
            `Book ${service.name.toLowerCase()} with Shynli Cleaning. Check your ZIP, choose the clean, and get clear pricing before you book.`,
          ),
        }
      }

      for (const city of cityServicePageCities) {
        for (const service of getCityServiceSeoServices(city.name)) {
          routes[`/service-areas/${city.slug}/${service.slug}`] = {
            title: `${service.name} in ${city.name}, IL | ${SITE_NAME}`,
            description: normalizeDescription(
              `Book ${service.name.toLowerCase()} in ${city.name}, IL. Check your ZIP, choose the clean, and get clear pricing before you book.`,
            ),
          }
        }
      }

      for (const page of genericSeoPages) {
        if (!page?.path) continue
        routes[page.path] = {
          title: page.title,
          description: normalizeDescription(page.meta ?? ''),
        }
      }

      const entries = Object.entries(routes)
      if (entries.length < 100) {
        throw new Error(`seo-routes: маршрутов всего ${entries.length}, ожидались сотни`)
      }

      const titles = new Set(entries.map(([, meta]) => meta.title))

      mkdirSync(path.resolve(__dirname, 'dist'), { recursive: true })
      writeFileSync(
        path.resolve(__dirname, 'dist/seo-routes.json'),
        JSON.stringify(routes),
        'utf8',
      )

      console.log(
        `seo-routes.json: ${entries.length} маршрутов, уникальных title ${titles.size}` +
          (titles.size < entries.length ? `, пар с одинаковым title ${entries.length - titles.size}` : ''),
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoRoutesPlugin()],
  server: {
    allowedHosts: ["shynli.com", "www.shynli.com", "shiny.com", "www.shiny.com", "shinydeepcleaning.com", "www.shinydeepcleaning.com", "shinymove-outcleaning.com", "www.shinymove-outcleaning.com"],
  },
  build: {
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return
          if (id.includes("lucide-react")) return "vendor-icons"
          if (id.includes("react") || id.includes("react-dom")) return "vendor-react"
          if (id.includes("radix-ui")) return "vendor-radix"
          return "vendor"
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
