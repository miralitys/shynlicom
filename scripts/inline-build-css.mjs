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

const entryScriptPattern =
  /<script\s+type="module"\s+crossorigin\s+src="([^"]+\/index-[^"]+\.js)"><\/script>/
const entryScriptMatch = html.match(entryScriptPattern)

if (!entryScriptMatch) {
  console.log("No build entry script found to inline.")
} else {
  const [scriptTag, src] = entryScriptMatch
  const scriptPath = path.join(distDir, src.replace(/^\//, ""))
  const script = await readFile(scriptPath, "utf8")
  const safeScript = script
    .replaceAll("import(`./", "import(`/assets/")
    .replaceAll('import("./', 'import("/assets/')
    .replaceAll("</script", "<\\/script")

  html = html.replace(
    scriptTag,
    `<script type="module" data-inlined-build-entry="${path.basename(scriptPath)}">\n${safeScript}\n    </script>`
  )
}

await writeFile(htmlPath, html)
console.log(
  `Inlined ${stylesheets.length} build CSS file(s)${
    entryScriptMatch ? " and the build entry script" : ""
  } into index.html.`
)
