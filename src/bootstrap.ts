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
  window.removeEventListener("pointerdown", handleInteraction)
  window.removeEventListener("keydown", handleInteraction)
  window.removeEventListener("touchstart", handleInteraction)
  window.removeEventListener("wheel", handleInteraction)
  window.removeEventListener("focusin", handleInteraction)
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

function isStaticCallbackInteraction(event: Event) {
  const target = event.target
  return target instanceof Element && Boolean(target.closest("form[action='/api/leads/callback']"))
}

function handleInteraction(event: Event) {
  if (isStaticCallbackInteraction(event)) {
    return
  }

  loadApp()
}

if (!window.__SHYNLI_BOOTSTRAP_STARTED__) {
  window.__SHYNLI_BOOTSTRAP_STARTED__ = true

  if (isStandaloneDomain) {
    loadApp()
  } else {
    window.addEventListener("pointerdown", handleInteraction, { passive: true })
    window.addEventListener("keydown", handleInteraction)
    window.addEventListener("touchstart", handleInteraction, { passive: true })
    window.addEventListener("wheel", handleInteraction, { passive: true })
    window.addEventListener("focusin", handleInteraction)
    appTimer = window.setTimeout(loadApp, 3600)
  }
}
