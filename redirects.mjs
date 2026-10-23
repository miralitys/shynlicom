// Shared by the Node origin and an optional edge deployment. No browser code.
export const REDIRECT_VERSION = "2026-10-23.1"
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
const moveServices = new Set(["move-out-cleaning", "move-in-cleaning", "move-in-move-out-cleaning"])
const regularServices = new Set([
  "regular-cleaning", "one-time-cleaning", "recurring-cleaning", "weekly-cleaning",
  "biweekly-cleaning", "house-cleaning", "apartment-cleaning", "townhouse-cleaning",
  "condo-cleaning",
])
const aboutPages = new Set([
  "about", "why-shynli", "our-cleaning-process", "satisfaction-guarantee",
  "insured-cleaners", "background-checked-cleaners", "same-cleaner",
  "cleaning-supplies-included", "pet-friendly-cleaning", "eco-friendly-cleaning",
])
const moveArticles = new Set([
  "cleaning-before-moving-in", "cleaning-after-moving-out", "cleaning-for-renters",
  "cleaning-for-landlords", "cleaning-for-property-managers", "move-out-cleaning-vs-deep-cleaning",
])
const constructionArticles = new Set([
  "cleaning-after-renovation", "post-construction-cleaning-vs-deep-cleaning",
])
const blogArticles = new Set([
  "cleaning-before-selling-house", "cleaning-before-guests", "cleaning-after-party",
  "cleaning-before-holidays", "cleaning-for-busy-families", "cleaning-for-pet-owners",
  "house-cleaning-vs-maid-service", "one-time-cleaning-vs-recurring-cleaning",
  "professional-cleaning-vs-independent-cleaner",
])
const legalPages = new Map([
  ["terms", "/terms-of-service"],
  ["privacy", "/privacy-policy"],
  ["cancellation", "/cancellation-policy"],
])

export function getRedirect(requestTarget = "/") {
  let url
  try {
    // A leading double slash is a path in an HTTP origin-form request.
    url = new URL(requestTarget.startsWith("/") ? `https://shynli.com${requestTarget}` : requestTarget, "https://shynli.com")
  } catch {
    url = new URL("https://shynli.com/")
  }
  let pathname = url.pathname
  try {
    pathname = decodeURIComponent(pathname)
  } catch {
    // Malformed percent escapes still receive the safe fallback redirect.
  }
  pathname = pathname.toLowerCase().replace(/\/{2,}/g, "/").replace(/\/+$/, "") || "/"
  if (pathname === "/index.html") pathname = "/"
  const parts = pathname.split("/").filter(Boolean)
  const [root, city, service] = parts
  const result = (targetPath, group) => ({
    targetPath,
    group,
    location: `${DESTINATION_ORIGIN}${targetPath}${url.search}`,
  })

  if (pathname === "/") return result("/", "home")
  if (["/sitemap.xml", "/sitemap-shinydeepcleaning.xml", "/shinymove-outcleaning-sitemap.xml"].includes(pathname)) {
    return result("/sitemap.xml", "sitemap")
  }
  if (pathname === "/robots.txt") return result("/robots.txt", "robots")

  if (root === "service-areas") {
    if (parts.length === 1) return result("/service-areas", "city-index")
    if (!cities.has(city)) return result("/", "fallback")
    const targetCity = `/${city.replaceAll("-", "")}`
    if (parts.length === 2) return result(targetCity, "city")
    if (parts.length === 3 && service === "deep-cleaning") {
      return specialistCities.has(city)
        ? result(`${targetCity}/deep-cleaning`, "city-deep-specialist")
        : result(targetCity, "city-deep-general")
    }
    if (parts.length === 3 && moveServices.has(service)) {
      return specialistCities.has(city)
        ? result(`${targetCity}/move-out-cleaning`, "city-move-specialist")
        : result(targetCity, "city-move-general")
    }
    if (parts.slice(2).some((part) => part.includes("guide"))) return result(targetCity, "city-guide")
    return result(targetCity, "city-other-service")
  }

  if (root === "services") {
    if (parts.length === 1 || (parts.length === 2 && regularServices.has(city))) {
      return result("/services/regular-cleaning", "service-regular")
    }
    if (parts.length === 2 && city === "deep-cleaning") return result("/services/deep-cleaning", "service-deep")
    if (parts.length === 2 && (moveServices.has(city) || city === "rental-cleaning")) {
      return result("/services/move-in-move-out-cleaning", "service-move")
    }
    if (parts.length === 2 && city === "post-construction-cleaning") {
      return result("/services/post-construction-cleaning", "service-construction")
    }
  }

  if (root === "pricing") return result("/pricing", "pricing")
  if (root === "faq") return result("/faq", "faq")
  if (root === "checklists") return result("/blog/checklists", "checklist")
  if (root === "guides") return result("/blog", "guide")
  if (parts.length === 1) {
    if (root === "quote") return result("/quote", "quote")
    if (aboutPages.has(root)) return result("/about-us", "about")
    if (root === "contact") return result("/contacts", "contact")
    if (root === "reviews") return result("/", "reviews")
    if (legalPages.has(root)) return result(legalPages.get(root), "legal")
    if (moveArticles.has(root)) return result("/services/move-in-move-out-cleaning", "article-move")
    if (constructionArticles.has(root)) return result("/services/post-construction-cleaning", "article-construction")
    if (root === "regular-cleaning-vs-deep-cleaning") return result("/services/deep-cleaning", "article-deep")
    if (blogArticles.has(root)) return result("/blog", "article-blog")
  }
  return result("/", "fallback")
}

export function redirectHeaders(requestTarget) {
  return {
    Location: getRedirect(requestTarget).location,
    "Cache-Control": "public, max-age=3600",
    "X-Shynli-Redirect-Version": REDIRECT_VERSION,
    "Content-Length": "0",
  }
}
