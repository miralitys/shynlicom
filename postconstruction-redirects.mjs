export const REDIRECT_VERSION = "2026-10-23.1"
export const SOURCE_ORIGIN = "https://shynlipostconstructioncleaning.com"
export const DESTINATION_ORIGIN = "https://shynlicleaningservice.com"
export const DEFAULT_TARGET = "/services/post-construction-cleaning"
export const CITY_SLUGS = Object.freeze([
  "addison", "aurora", "bartlett", "batavia", "bolingbrook", "bristol",
  "burr-ridge", "carol-stream", "clarendon-hills", "darien", "downers-grove",
  "elmhurst", "geneva", "glen-ellyn", "hinsdale", "homer-glen", "itasca",
  "lemont", "lisle", "lockport", "lombard", "montgomery", "naperville",
  "north-aurora", "oak-brook", "oswego", "plainfield", "romeoville",
  "st-charles", "streamwood", "sugar-grove", "villa-park", "warrenville",
  "wayne", "west-chicago", "westmont", "wheaton", "willowbrook", "winfield",
  "wood-dale", "woodridge", "yorkville",
])
const cities = new Set(CITY_SLUGS)
export const MAPPING_GROUPS = Object.freeze([
  ["/blog/checklists/cleaning-checklist-for-new-construction-dust", "checklist", ["post-construction-cleaning-checklist", "final-cleaning-checklist", "rough-cleaning-checklist"]],
  ["/blog/seasonal/cleaning-after-renovation-dust-tips", "renovation-dust", ["renovation-dust-cleaning", "vent-cleaning-after-renovation-dust", "dust-cleaning-after-floor-installation", "guides/why-construction-dust-keeps-coming-back", "guides/hvac-dust-after-renovation-cleaning", "guides/cleaning-renovation-dust-from-furniture-and-belongings", "guides/when-renovation-dust-needs-specialty-remediation"]],
  ["/services/commercial-cleaning", "commercial", ["office-buildout-cleaning", "retail-buildout-cleaning", "restaurant-buildout-cleaning", "medical-office-buildout-cleaning", "tenant-improvement-cleaning"]],
  ["/quote", "quote", ["request-a-bid", "post-construction-cleaning-quote", "post-construction-cleaning-photo-quote"]],
  ["/faq", "faq", ["post-construction-cleaning-faq"]],
])
const exact = new Map()
for (const [target, group, paths] of MAPPING_GROUPS) {
  for (const pathname of paths) exact.set(`/${pathname}`, { target, group })
}
for (const pathname of ["/privacy-policy", "/terms-of-service", "/cancellation-policy"]) exact.set(pathname, { target: pathname, group: "legal" })

export function getRedirect(input = "/") {
  let url
  try {
    url = new URL(input.startsWith("/") ? `${SOURCE_ORIGIN}${input}` : input, SOURCE_ORIGIN)
  } catch {
    url = new URL(SOURCE_ORIGIN)
  }
  let pathname = url.pathname
  try { pathname = decodeURIComponent(pathname) } catch { /* Invalid escapes use the default service. */ }
  pathname = pathname.toLowerCase().replace(/\/{2,}/g, "/").replace(/\/+$/, "") || "/"
  if (pathname === "/index.html") pathname = "/"
  const result = (target, group) => ({ target, group, location: `${DESTINATION_ORIGIN}${target}${url.search}` })
  if (pathname === "/") return result(DEFAULT_TARGET, "home")
  if (pathname === "/sitemap.xml") return result("/sitemap.xml", "sitemap")
  if (pathname === "/robots.txt") return result("/robots.txt", "robots")
  if (pathname === "/service-areas") return result("/service-areas", "city-index")
  const parts = pathname.split("/").filter(Boolean)
  if (parts.length === 2 && parts[0] === "service-areas" && cities.has(parts[1])) return result(`/${parts[1].replaceAll("-", "")}`, "city")
  const match = exact.get(pathname)
  if (match) return result(match.target, match.group)
  return result(DEFAULT_TARGET, "default-service")
}
