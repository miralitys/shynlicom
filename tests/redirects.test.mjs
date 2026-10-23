import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { once } from "node:events"
import { readFile } from "node:fs/promises"
import { createServer } from "node:net"
import { request as httpRequest } from "node:http"
import { after, before, test } from "node:test"
import { CITY_SLUGS, DESTINATION_ORIGIN, getRedirect, REDIRECT_VERSION } from "../redirects.mjs"

const expect = (source, target) => assert.equal(getRedirect(source).location, `${DESTINATION_ORIGIN}${target}`, source)

test("all 42 cities remove hyphens and use only the four specialist routes", () => {
  assert.equal(CITY_SLUGS.length, 42)
  for (const city of CITY_SLUGS) {
    const target = `/${city.replaceAll("-", "")}`
    const specialist = ["naperville", "aurora", "plainfield", "bolingbrook"].includes(city)
    expect(`/service-areas/${city}`, target)
    expect(`/service-areas/${city}/deep-cleaning`, specialist ? `${target}/deep-cleaning` : target)
    for (const service of ["move-in-cleaning", "move-out-cleaning", "move-in-move-out-cleaning"]) {
      expect(`/service-areas/${city}/${service}`, specialist ? `${target}/move-out-cleaning` : target)
    }
    for (const service of ["cleaning-guide", "other-guide", "guides/example", "regular-cleaning", "one-time-cleaning", "recurring-cleaning", "weekly-cleaning", "apartment-cleaning", "post-construction-cleaning"]) {
      expect(`/service-areas/${city}/${service}`, target)
    }
  }
})

test("services, general pages, articles, discovery files and unknown paths", () => {
  const cases = [
    ["/", "/"], ["/service-areas", "/service-areas"], ["/services", "/services/regular-cleaning"],
    ["/services/deep-cleaning", "/services/deep-cleaning"],
    ["/services/post-construction-cleaning", "/services/post-construction-cleaning"],
    ["/pricing", "/pricing"], ["/pricing/deep-cleaning", "/pricing"], ["/quote", "/quote"],
    ["/contact", "/contacts"], ["/reviews", "/"], ["/faq", "/faq"], ["/faq/pets", "/faq"],
    ["/terms", "/terms-of-service"], ["/privacy", "/privacy-policy"], ["/cancellation", "/cancellation-policy"],
    ["/checklists", "/blog/checklists"], ["/checklists/deep-cleaning", "/blog/checklists"],
    ["/guides", "/blog"], ["/guides/how-to-clean", "/blog"],
    ["/regular-cleaning-vs-deep-cleaning", "/services/deep-cleaning"],
    ["/sitemap.xml", "/sitemap.xml"], ["/robots.txt", "/robots.txt"],
    ["/sitemap-shinydeepcleaning.xml", "/sitemap.xml"], ["/shinymove-outcleaning-sitemap.xml", "/sitemap.xml"],
    ["/shiny-deep-cleaning", "/"], ["/assets/app.js", "/"], ["/nonexistent-xyz", "/"],
    ["/service-areas/not-a-city/deep-cleaning", "/"], ["/services/not-a-service", "/"],
    ["/pricingish", "/"], ["/faqish", "/"], ["/guidesish", "/"],
    ["/api/leads/callback", "/"], ["/%ZZ", "/"],
  ]
  for (const service of ["move-in-cleaning", "move-out-cleaning", "move-in-move-out-cleaning", "rental-cleaning"]) cases.push([`/services/${service}`, "/services/move-in-move-out-cleaning"])
  for (const service of ["regular-cleaning", "one-time-cleaning", "recurring-cleaning", "weekly-cleaning", "biweekly-cleaning", "house-cleaning", "apartment-cleaning", "townhouse-cleaning", "condo-cleaning"]) cases.push([`/services/${service}`, "/services/regular-cleaning"])
  for (const page of ["about", "why-shynli", "our-cleaning-process", "satisfaction-guarantee", "insured-cleaners", "background-checked-cleaners", "same-cleaner", "cleaning-supplies-included", "pet-friendly-cleaning", "eco-friendly-cleaning"]) cases.push([`/${page}`, "/about-us"])
  for (const page of ["cleaning-before-moving-in", "cleaning-after-moving-out", "cleaning-for-renters", "cleaning-for-landlords", "cleaning-for-property-managers", "move-out-cleaning-vs-deep-cleaning"]) cases.push([`/${page}`, "/services/move-in-move-out-cleaning"])
  for (const page of ["cleaning-after-renovation", "post-construction-cleaning-vs-deep-cleaning"]) cases.push([`/${page}`, "/services/post-construction-cleaning"])
  for (const page of ["cleaning-before-selling-house", "cleaning-before-guests", "cleaning-after-party", "cleaning-before-holidays", "cleaning-for-busy-families", "cleaning-for-pet-owners", "house-cleaning-vs-maid-service", "one-time-cleaning-vs-recurring-cleaning", "professional-cleaning-vs-independent-cleaner"]) cases.push([`/${page}`, "/blog"])
  for (const [source, target] of cases) {
    expect(source, target)
    expect(`${source.toUpperCase()}/`, target)
    expect(`${source}?gclid=abc%2fDEF&utm_source=google+ads&x=1&x=2&empty=&flag`, `${target}?gclid=abc%2fDEF&utm_source=google+ads&x=1&x=2&empty=&flag`)
  }
  expect("/index.html", "/")
  expect("//services///DEEP-CLEANING/", "/services/deep-cleaning")
  expect("//evil.example/", "/")
  expect("/service-areas/BURR%2DRIDGE/", "/burrridge")
})

test("all 584 sitemap URLs have known mappings with canonical destination paths", async () => {
  const xml = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8")
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
  assert.equal(urls.length, 584)
  for (const source of urls) {
    const result = getRedirect(source)
    assert.notEqual(result.group, "fallback", source)
    const target = new URL(result.location)
    assert.equal(target.origin, DESTINATION_ORIGIN)
    assert.ok(target.pathname === "/" || !target.pathname.endsWith("/"))
  }
})

let child
let origin
before(async () => {
  const socket = createServer()
  socket.listen(0, "127.0.0.1")
  await once(socket, "listening")
  const port = socket.address().port
  await new Promise((resolve) => socket.close(resolve))
  origin = `http://127.0.0.1:${port}`
  child = spawn(process.execPath, ["server.mjs"], {
    cwd: new URL("..", import.meta.url),
    env: { ...process.env, PORT: String(port), SITE_REDIRECT_ENABLED: "true" },
    stdio: ["ignore", "pipe", "pipe"],
  })
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Server did not start")), 10000)
    child.once("error", reject)
    child.once("exit", (code) => reject(new Error(`Server exited: ${code}`)))
    child.stdout.on("data", (chunk) => {
      if (String(chunk).includes("listening")) {
        clearTimeout(timer)
        resolve()
      }
    })
  })
})
after(() => child?.kill())

test("live Node handler returns empty server-side 301s before static assets and API handlers", async () => {
  for (const method of ["GET", "HEAD", "POST"]) {
    for (const source of ["/", "/Services/", "/service-areas/burr-ridge/deep-cleaning?gclid=test", "/sitemap.xml", "/robots.txt", "/assets/app.js", "/api/leads/callback"]) {
      const response = await fetch(`${origin}${source}`, { method, redirect: "manual" })
      assert.equal(response.status, 301, `${method} ${source}`)
      assert.equal(response.headers.get("location"), getRedirect(source).location)
      assert.equal(response.headers.get("x-shynli-redirect-version"), REDIRECT_VERSION)
      assert.equal(await response.text(), "")
    }
  }
})

test("Airbnb proxy is host-scoped and returns a final server 301 with tracking intact", async () => {
  const cases = [
    ["/", "/services/airbnb-cleaning"],
    ["/AiRbNb-ClEaNiNg-ChEcKlIsT/", "/blog/airbnb/airbnb-turnover-cleaning-checklist-with-photos"],
    ["/SERVICE-AREAS/BURR-RIDGE/ANY/NESTED/PAGE/", "/burrridge"],
    ["/booking/start", "/quote"],
    ["/robots.txt", "/robots.txt"],
  ]
  for (const [source, target] of cases) {
    const query = "?gclid=abc%2fDEF&utm_source=google+ads&x=1&x=2"
    const url = `${origin}/__airbnb_redirect${source}${query}`
    const result = await new Promise((resolve, reject) => {
      const request = httpRequest(url, { headers: { Host: "shynlicom.onrender.com" } }, (response) => {
        let body = ""
        response.on("data", (chunk) => { body += chunk })
        response.on("end", () => resolve({ status: response.statusCode, headers: response.headers, body }))
      })
      request.on("error", reject)
      request.end()
    })
    assert.equal(result.status, 301)
    assert.equal(result.headers.location, `https://shynlicleaningservice.com${target}${query}`)
    assert.equal(result.headers["x-shynli-redirect-site"], "airbnb")
    assert.equal(result.body, "")
    const primary = await fetch(url, { redirect: "manual" })
    assert.equal(primary.headers.get("location"), `https://shynlicleaningservice.com/${query}`)
    assert.equal(primary.headers.get("x-shynli-redirect-site"), null)
    for (const host of ["shynliairbnbcleaning.com", "www.shynliairbnbcleaning.com"]) {
      const direct = await new Promise((resolve, reject) => {
        const request = httpRequest(`${origin}${source}${query}`, { headers: { Host: host } }, (response) => {
          response.resume()
          response.once("end", () => resolve({ status: response.statusCode, headers: response.headers }))
        })
        request.once("error", reject)
        request.end()
      })
      assert.equal(direct.status, 301)
      assert.equal(direct.headers.location, `https://shynlicleaningservice.com${target}${query}`)
      assert.equal(direct.headers["x-shynli-redirect-site"], "airbnb")
    }
  }
})
