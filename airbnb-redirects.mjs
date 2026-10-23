export const REDIRECT_VERSION = "2026-10-23.1"
export const SOURCE_ORIGIN = "https://shynliairbnbcleaning.com"
export const DESTINATION_ORIGIN = "https://shynlicleaningservice.com"
export const DEFAULT_TARGET = "/services/airbnb-cleaning"
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

export const SERVICE_PATHS = Object.freeze([
  "airbnb-cleaning", "short-term-rental-cleaning", "vacation-rental-cleaning",
  "airbnb-turnover-cleaning", "vrbo-cleaning", "airbnb-cleaning-cost",
  "airbnb-cleaning-for-hosts", "cleaning-for-property-managers",
  "airbnb-cleaning-for-remote-hosts", "airbnb-cleaning-for-new-hosts",
  "airbnb-cleaning-for-superhosts", "airbnb-cleaning-for-multi-unit-hosts",
  "airbnb-cleaning-before-check-in", "airbnb-cleaning-after-checkout",
  "airbnb-deep-cleaning", "airbnb-cleaning-vs-regular-cleaning",
  "airbnb-cleaning-vs-deep-cleaning", "airbnb-cleaning-damage-report",
  "how-much-does-airbnb-cleaning-cost", "what-is-included-in-airbnb-cleaning",
  "how-to-prepare-for-airbnb-cleaner", "airbnb-host-cleaning-guide",
  "airbnb-cleaning-service-near-me", "short-term-rental-cleaning-service-near-me",
  "vacation-rental-cleaning-service-near-me", "airbnb-cleaning-company",
  "vacation-rental-cleaning-company", "airbnb-cleaning-pricing-guide",
  "airbnb-mid-stay-cleaning-plan", "airbnb-cleaner-hiring-questions",
  "airbnb-cleaner-access-instructions",
])

export const GUIDE_GROUPS = Object.freeze([
  ["airbnb-turnover-cleaning-checklist-with-photos", [
    "airbnb-cleaning-checklist", "airbnb-turnover-checklist",
    "short-term-rental-turnover-checklist", "vacation-rental-turnover-checklist",
    "airbnb-guest-ready-reset-checklist", "airbnb-cleaning-photos-guide",
    "airbnb-cleaning-with-photo-report", "photo-handoff-cleaning",
  ]],
  ["how-to-set-cleaning-fees-for-airbnb", ["airbnb-cleaning-fee-guide", "airbnb-checkout-instructions-cleaning-fee"]],
  ["how-to-schedule-airbnb-cleanings-between-guests", [
    "airbnb-cleaning-between-guests", "same-day-airbnb-turnover",
    "airbnb-cleaner-turnover-time-plan", "late-checkout-airbnb-cleaning-plan",
    "airbnb-early-check-in-cleaning-plan", "airbnb-turnover-backup-plan",
  ]],
  ["turnover-cleaning-time-estimate-2-bed-unit", ["how-long-does-airbnb-cleaning-take"]],
  ["how-to-handle-laundry-for-airbnb-cleaning", [
    "airbnb-laundry-service", "airbnb-linen-service", "do-airbnb-cleaners-change-linens",
    "airbnb-laundry-start-rules", "airbnb-stained-linens-plan",
  ]],
  ["airbnb-restocking-checklist-essentials", [
    "linen-and-restocking-service", "airbnb-restocking-service",
    "do-airbnb-cleaners-restock-supplies", "airbnb-cleaning-supply-check",
    "airbnb-cleaning-supplies-guide", "airbnb-starter-supplies-plan",
    "airbnb-owner-closet-supply-setup",
  ]],
  ["how-to-prevent-bad-reviews-from-cleanliness", ["airbnb-cleaning-reviews-guide", "airbnb-cleanliness-complaint-response"]],
  ["airbnb-cleaning-standards-what-guests-notice", ["airbnb-cleaning-quality-control"]],
  ["how-to-create-a-cleaning-checklist-for-co-hosts", ["airbnb-cleaning-for-cohosts", "airbnb-remote-host-cleaning-handoff"]],
  ["how-to-remove-odors-quickly-before-guests-arrive", ["airbnb-smoke-odor-cleaning-plan"]],
  ["how-to-clean-after-parties-in-airbnb", ["airbnb-excessive-mess-cleaning-plan"]],
  ["quick-kitchen-reset-checklist-for-airbnb", ["airbnb-dishes-kitchen-reset-plan"]],
  ["quick-bathroom-reset-checklist-for-airbnb", ["airbnb-mold-mildew-cleaning-plan"]],
  ["best-disinfecting-routine-for-short-term-rentals", ["airbnb-pet-hair-cleaning-plan", "airbnb-bed-bug-pest-response-plan"]],
])

export const GUIDE_INDEX_PATHS = Object.freeze([
  "host-problem-guides", "airbnb-cleaning-maintenance-notes",
  "airbnb-lost-and-found-cleaning-handoff", "airbnb-trash-recycling-turnover-plan",
  "airbnb-outdoor-space-cleaning-handoff",
])

export const ROOT_REDIRECTS = new Map()
for (const slug of SERVICE_PATHS) ROOT_REDIRECTS.set(`/${slug}`, { target: DEFAULT_TARGET, group: "service" })
for (const [target, slugs] of GUIDE_GROUPS) {
  for (const slug of slugs) ROOT_REDIRECTS.set(`/${slug}`, { target: `/blog/airbnb/${target}`, group: "guide-matched" })
}
for (const slug of GUIDE_INDEX_PATHS) ROOT_REDIRECTS.set(`/${slug}`, { target: "/blog/airbnb", group: "guide-index" })
for (const target of ["/faq", "/privacy-policy", "/terms-of-service", "/cancellation-policy", "/quote"]) {
  ROOT_REDIRECTS.set(target, { target, group: target === "/quote" ? "quote" : "general" })
}

export function getRedirect(input = "/") {
  let url
  try {
    url = new URL(input.startsWith("/") ? `${SOURCE_ORIGIN}${input}` : input, SOURCE_ORIGIN)
  } catch {
    url = new URL(SOURCE_ORIGIN)
  }
  let pathname = url.pathname
  try { pathname = decodeURIComponent(pathname) } catch { /* Use fallback for malformed escapes. */ }
  pathname = pathname.toLowerCase().replace(/\/{2,}/g, "/").replace(/\/+$/, "") || "/"
  if (pathname === "/index.html") pathname = "/"
  const result = (target, group) => ({ target, group, location: `${DESTINATION_ORIGIN}${target}${url.search}` })
  if (pathname === "/") return result(DEFAULT_TARGET, "home")
  if (pathname === "/sitemap.xml") return result("/sitemap.xml", "sitemap")
  if (pathname === "/robots.txt") return result("/robots.txt", "robots")
  if (pathname === "/service-areas") return result("/service-areas", "city-index")
  const parts = pathname.split("/").filter(Boolean)
  if (parts[0] === "service-areas" && cities.has(parts[1])) {
    return result(`/${parts[1].replaceAll("-", "")}`, parts.length === 2 ? "city" : "city-subpage")
  }
  const root = ROOT_REDIRECTS.get(pathname)
  if (root) return result(root.target, root.group)
  if (parts.some((part) => /(?:^|-)(?:quote|quotes|booking|bookings|book)(?:-|$)/.test(part) || part === "schedule")) {
    return result("/quote", "quote")
  }
  if (parts[0] === "host-problem-guides") return result("/blog/airbnb", "guide-index")
  return result(DEFAULT_TARGET, "fallback")
}

