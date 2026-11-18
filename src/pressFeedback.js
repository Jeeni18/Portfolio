// Touch "pressed" state for the filling buttons (index.css: .is-pressed).
// Touch screens get no hover fill; instead, while a finger is down on one
// of these buttons it shows the fill briefly. Done with a class rather than
// :active, which browsers apply inconsistently to touches (Safari needs a
// touch listener for it at all).
const FILLS = '.room-btn-primary, .btn-primary, .btn-outline, .fill-link, a.blade--status, .works-row'
const HOLD_MS = 140 // keep the fill this long after the finger lifts, so a quick tap still shows it

let pressed = null
let timer = 0
const release = () => {
  const el = pressed
  pressed = null
  clearTimeout(timer)
  if (el) timer = setTimeout(() => el.classList.remove('is-pressed'), HOLD_MS)
}

document.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'mouse') return
  const el = e.target instanceof window.Element ? e.target.closest(FILLS) : null
  if (!el) return
  if (pressed && pressed !== el) pressed.classList.remove('is-pressed')
  clearTimeout(timer)
  pressed = el
  el.classList.add('is-pressed')
}, { passive: true })
document.addEventListener('pointerup', release, { passive: true })
document.addEventListener('pointercancel', release, { passive: true })
