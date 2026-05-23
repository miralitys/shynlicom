import { lazy, Suspense } from "react"
import { cityPages, cityServicePageCities, genericSeoPages, getCityServiceSeoServices, seoServices } from "@/site/data"
import { legalPages } from "@/site/legal-data"
import { LegalPage } from "@/site/legal-pages"
import { CityPage, GenericSeoPage, HomePage, NotFoundPage, ServiceAreasPage, ServicesIndexPage, ServiceSeoPage } from "@/site/pages"

const StandaloneRoute = lazy(() => import("@/site/standalone-route"))

function App() {
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/"
  const hostname = window.location.hostname.toLowerCase()
  const isDeepCleaningSite = hostname === "shinydeepcleaning.com" || hostname === "www.shinydeepcleaning.com"
  const isMoveOutCleaningSite = hostname === "shinymove-outcleaning.com" || hostname === "www.shinymove-outcleaning.com"
  const isStandalonePath = currentPath.startsWith("/shiny-")
  const cityMatch = cityPages.find((city) => currentPath === `/service-areas/${city.slug}`)
  const serviceMatch = seoServices.find((service) => currentPath === `/services/${service.slug}`)
  const genericSeoMatch = genericSeoPages.find((page) => currentPath === page.path)
  const legalMatch = legalPages.find((page) => currentPath === page.path)
  const cityServiceMatch = cityServicePageCities
    .flatMap((city) =>
      getCityServiceSeoServices(city.name).map((service) => ({
        city,
        service,
        path: `/service-areas/${city.slug}/${service.slug}`,
      })),
    )
    .find((item) => currentPath === item.path)

  if (isDeepCleaningSite || isMoveOutCleaningSite || isStandalonePath) {
    return (
      <Suspense fallback={null}>
        <StandaloneRoute currentPath={currentPath} hostname={hostname} />
      </Suspense>
    )
  }

  if (currentPath === "/services") {
    return <ServicesIndexPage />
  }

  if (currentPath === "/service-areas") {
    return <ServiceAreasPage />
  }

  if (serviceMatch) {
    return <ServiceSeoPage service={serviceMatch} />
  }

  if (cityServiceMatch) {
    return <ServiceSeoPage service={cityServiceMatch.service} city={cityServiceMatch.city} />
  }

  if (cityMatch) {
    return <CityPage city={cityMatch} />
  }

  if (genericSeoMatch) {
    return <GenericSeoPage page={genericSeoMatch} />
  }

  if (legalMatch) {
    return <LegalPage page={legalMatch} />
  }

  if (currentPath === "/") {
    return <HomePage />
  }

  return <NotFoundPage />
}

export default App
