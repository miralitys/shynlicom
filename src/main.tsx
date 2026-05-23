import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

let mounted = false

export function mountApp() {
  if (mounted) return
  mounted = true

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
