export const REDIRECT_VERSION = "2026-10-23.1"
export const SOURCE_ORIGIN = "https://shynliapartmentcleaning.com"
export const DESTINATION_ORIGIN = "https://shynlicleaningservice.com"
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
const specialistCities = new Set(["naperville", "aurora", "plainfield", "bolingbrook"])
const moveServices = new Set(["move-out-apartment-cleaning", "move-in-apartment-cleaning", "tenant-move-out-cleaning"])

export const BLOG_GROUPS = Object.freeze([
  ["/blog/move-in-move-out/how-clean-should-apartment-be-when-moving-out", "blog-move-out", [
    "apartment-move-out-cleaning-checklist", "move-out-cleaning-week-timeline",
    "studio-apartment-move-out-cleaning", "do-you-need-professional-cleaners-before-moving-out",
    "what-broom-clean-actually-means", "the-move-out-walkthrough-itself",
    "landlord-cleaning-fee-after-move-out", "what-landlords-charge-when-cleaning-is-skipped",
    "three-hours-until-handover",
  ]],
  ["/blog/checklists/move-in-cleaning-checklist-apartment", "blog-move-in", [
    "move-in-deep-cleaning-checklist", "what-to-clean-before-unpacking-apartment",
    "apartment-professionally-cleaned-before-move-in", "disinfecting-new-apartment-what-matters",
  ]],
  ["/blog/services/cleaning-cost-for-1-bedroom-apartment", "blog-cost", [
    "apartment-cleaning-cost-chicago-suburbs", "hourly-vs-flat-rate-apartment-cleaning",
    "is-apartment-cleaning-service-worth-it",
  ]],
])
export const ROOT_REDIRECTS = new Map()
for (const slug of ["apartment-cleaning", "recurring-apartment-cleaning", "one-time-apartment-cleaning", "condo-cleaning", "townhouse-cleaning"]) {
  ROOT_REDIRECTS.set(`/${slug}`, { target: "/services/regular-cleaning", group: "main-regular" })
}
ROOT_REDIRECTS.set("/deep-apartment-cleaning", { target: "/services/deep-cleaning", group: "main-deep" })
for (const slug of ["move-out-apartment-cleaning", "move-in-apartment-cleaning"]) {
  ROOT_REDIRECTS.set(`/${slug}`, { target: "/services/move-in-move-out-cleaning", group: "main-move" })
}
ROOT_REDIRECTS.set("/apartment-cleaning-pricing", { target: "/pricing", group: "main-pricing" })
ROOT_REDIRECTS.set("/apartment-cleaning-checklist", { target: "/blog/checklists/move-in-cleaning-checklist-apartment", group: "main-checklist" })
for (const target of ["/faq", "/privacy-policy", "/terms-of-service", "/cancellation-policy"]) {
  ROOT_REDIRECTS.set(target, { target, group: "main-general" })
}
for (const [target, group, slugs] of BLOG_GROUPS) {
  for (const slug of slugs) ROOT_REDIRECTS.set(`/blog/${slug}`, { target, group })
}

export function getRedirect(input = "/") {
  let url
  try {
    url = new URL(input.startsWith("/") ? `${SOURCE_ORIGIN}${input}` : input, SOURCE_ORIGIN)
  } catch {
    url = new URL(SOURCE_ORIGIN)
  }
  let pathname = url.pathname
  try { pathname = decodeURIComponent(pathname) } catch { /* Malformed escapes use the fallback. */ }
  pathname = pathname.toLowerCase().replace(/\/{2,}/g, "/").replace(/\/+$/, "") || "/"
  if (pathname === "/index.html") pathname = "/"
  const result = (target, group) => ({ target, group, location: `${DESTINATION_ORIGIN}${target}${url.search}` })
  if (pathname === "/") return result("/", "home")
  if (pathname === "/sitemap.xml") return result("/sitemap.xml", "sitemap")
  if (pathname === "/robots.txt") return result("/robots.txt", "robots")
  if (pathname === "/service-areas") return result("/service-areas", "city-index")
  const parts = pathname.split("/").filter(Boolean)
  if (parts[0] === "service-areas" && cities.has(parts[1])) {
    const target = `/${parts[1].replaceAll("-", "")}`
    if (parts.length === 2) return result(target, "city")
    if (parts.length === 3 && specialistCities.has(parts[1])) {
      if (parts[2] === "deep-apartment-cleaning") return result(`${target}/deep-cleaning`, "city-deep-specialist")
      if (moveServices.has(parts[2])) return result(`${target}/move-out-cleaning`, "city-move-specialist")
    }
    return result(target, "city-subpage")
  }
  const root = ROOT_REDIRECTS.get(pathname)
  if (root) return result(root.target, root.group)
  if (parts[0] === "blog") return result("/blog", pathname === "/blog" ? "blog-index" : "blog-other")
  if (parts.some((part) => /(?:^|-)(?:quote|quotes|booking|bookings|book)(?:-|$)/.test(part) || part === "schedule")) {
    return result("/quote", "quote")
  }
  return result("/", "fallback")
}
