import { readFile, rm, writeFile } from "node:fs/promises"
import path from "node:path"

const distDir = path.resolve("dist")
const htmlPath = path.join(distDir, "index.html")

let html = await readFile(htmlPath, "utf8")
const stylesheetPattern =
  /<link\s+rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/g

const stylesheets = [...html.matchAll(stylesheetPattern)]

if (stylesheets.length === 0) {
  console.log("No build CSS links found to inline.")
  process.exit(0)
}

for (const match of stylesheets) {
  const [linkTag, href] = match
  const cssPath = path.join(distDir, href.replace(/^\//, ""))
  const css = await readFile(cssPath, "utf8")
  const safeCss = css.replaceAll("</style", "<\\/style")

  html = html.replace(
    linkTag,
    `<style data-inlined-build-css="${path.basename(cssPath)}">\n${safeCss}\n    </style>`
  )

  await rm(cssPath)
}

await writeFile(htmlPath, html)
console.log(`Inlined ${stylesheets.length} build CSS file(s) into index.html.`)
