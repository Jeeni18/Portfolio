import { useSyncExternalStore } from 'react'

// The colour theme: 'dark' (default) or 'light', held on <html data-theme>.
// index.html sets it before the first paint from localStorage
// ('jeeni-theme'); with nothing saved it is dark. The OS colour-scheme
// setting is deliberately ignored.
export const THEME_KEY = 'jeeni-theme'
const SWITCH_MS = 300

const read = () => (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark')

const listeners = new Set()
const subscribe = (fn) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

let switchTimer = 0
export function setTheme(theme) {
  const next = theme === 'light' ? 'light' : 'dark'
  const html = document.documentElement
  if (read() === next) return
  // Colours animate for 300ms while switching (never on first load).
  html.classList.add('theme-switching')
  clearTimeout(switchTimer)
  switchTimer = setTimeout(() => html.classList.remove('theme-switching'), SWITCH_MS + 50)
  html.setAttribute('data-theme', next)
  html.style.backgroundColor = next === 'light' ? '#DFC3CB' : '#29232A'
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#DFC3CB' : '#29232A')
  try { window.localStorage.setItem(THEME_KEY, next) } catch { /* private mode: still switches, just not remembered */ }
  listeners.forEach((fn) => fn())
}

export function useTheme() {
  return useSyncExternalStore(subscribe, read, () => 'dark')
}
