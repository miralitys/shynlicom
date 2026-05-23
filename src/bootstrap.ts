import "./index.css"

declare global {
  interface Window {
    __SHYNLI_BOOTSTRAP_STARTED__?: boolean
  }
}

const path = window.location.pathname.replace(/\/$/, "") || "/"
const host = window.location.hostname.toLowerCase()
const isStandaloneDomain =
  host === "shinydeepcleaning.com" ||
  host === "www.shinydeepcleaning.com" ||
  host === "shinymove-outcleaning.com" ||
  host === "www.shinymove-outcleaning.com" ||
  path.startsWith("/shiny-")

let appLoaded = false
let appTimer: number | undefined

function removeInteractionListeners() {
  window.removeEventListener("pointerdown", loadApp)
  window.removeEventListener("keydown", loadApp)
  window.removeEventListener("touchstart", loadApp)
  window.removeEventListener("wheel", loadApp)
  window.removeEventListener("focusin", loadApp)
}

function loadApp() {
  if (appLoaded) return
  appLoaded = true
  if (appTimer !== undefined) {
    window.clearTimeout(appTimer)
  }
  removeInteractionListeners()
  void import("./main")
}

if (!window.__SHYNLI_BOOTSTRAP_STARTED__) {
  window.__SHYNLI_BOOTSTRAP_STARTED__ = true

  if (isStandaloneDomain) {
    loadApp()
  } else {
    window.addEventListener("pointerdown", loadApp, { once: true, passive: true })
    window.addEventListener("keydown", loadApp, { once: true })
    window.addEventListener("touchstart", loadApp, { once: true, passive: true })
    window.addEventListener("wheel", loadApp, { once: true, passive: true })
    window.addEventListener("focusin", loadApp, { once: true })
    appTimer = window.setTimeout(loadApp, 3600)
  }
}
