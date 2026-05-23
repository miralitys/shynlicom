import './index.css'

const currentPath = window.location.pathname.replace(/\/$/, '') || '/'
const canUseStaticHomeShell =
  currentPath === '/' && document.documentElement.dataset.initialHome === 'true'

let loadStarted = false

const wakeEvents = ['pointerdown', 'keydown', 'touchstart', 'scroll'] as const

function removeWakeListeners() {
  for (const event of wakeEvents) {
    window.removeEventListener(event, loadApp)
  }
}

function loadApp() {
  if (loadStarted) return
  loadStarted = true
  removeWakeListeners()

  void import('./main.tsx').then(({ mountApp }) => {
    mountApp()
  })
}

function addWakeListeners() {
  for (const event of wakeEvents) {
    window.addEventListener(event, loadApp, { once: true, passive: true })
  }
}

if (canUseStaticHomeShell) {
  addWakeListeners()
  globalThis.setTimeout(loadApp, 2500)
} else {
  loadApp()
}
