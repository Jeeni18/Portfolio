import { useEffect, useRef } from 'react'

// Scroll reveal for a section: when it scrolls into view, its blades wipe
// in left to right once, staggered so the whole section takes < 1s (CSS in
// index.css: .reveal / .is-in, delay per blade in --d). No flips, no sound.
// With prefers-reduced-motion the CSS shows everything at once.
const MAX_STAGGER_MS = 480 // last blade starts by then (+0.3s wipe = 0.78s max)
const STEP_MS = 40

export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const reveal = () => {
      const blades = el.querySelectorAll('.blade')
      const step = Math.min(STEP_MS, MAX_STAGGER_MS / Math.max(1, blades.length - 1))
      blades.forEach((b, i) => b.style.setProperty('--d', `${Math.round(i * step)}ms`))
      el.classList.add('is-in')
    }
    if (!('IntersectionObserver' in window)) { reveal(); return undefined }
    const io = new window.IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal()
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -18% 0px', threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}
