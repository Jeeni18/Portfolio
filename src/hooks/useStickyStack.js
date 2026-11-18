import { useEffect } from 'react'
import { timeline } from './introTimeline'

// "Sticky stack" between the hero (01) and About (02): the hero stays
// pinned (position: sticky) while About slides up over it like a card. The
// hero gently recedes as it is covered (scale 1 -> 0.95, opacity 1 -> 0.55),
// tied to the scroll position (one requestAnimationFrame per scroll frame,
// transform and opacity only). CSS: .stack-on in index.css.
//
// - At every screen size. A hero taller than the screen (phones, short
//   laptop windows) first scrolls up normally until its bottom edge meets
//   the bottom of the screen, then pins there while About covers it.
// - Reduced motion: the pinned cover stays (it's the visitor's own
//   scrolling), without the scale and dimming.
// - The intro is left as it is while About slides over it (it keeps
//   playing); once the hero is fully covered it pauses with the 3D scene
//   and carries on from the same moment when it is uncovered again.
// - Fully covered: `heroCovered` is true, so Hero.jsx pauses the 3D scene
//   (the sticky hero still counts as "on screen" to an IntersectionObserver).
const RECEDE_SCALE = 0.05   // scale 1 -> 0.95
const RECEDE_FADE = 0.45    // opacity 1 -> 0.55

const listeners = new Set()
let covered = false
export const heroCovered = {
  get: () => covered,
  subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn) },
}
// How far About has covered the hero (0..1), and whether the effect is on
// (revealScheduler starts About's animations at 60%).
const progressListeners = new Set()
let progress = 0
let stackOn = false
export const stackProgress = {
  get: () => progress,
  enabled: () => stackOn,
  subscribe(fn) { progressListeners.add(fn); return () => progressListeners.delete(fn) },
}
const setProgress = (p, on) => {
  if (p === progress && on === stackOn) return
  progress = p
  stackOn = on
  progressListeners.forEach((fn) => fn(p, on))
}
const setCovered = (v) => {
  if (v === covered) return
  covered = v
  listeners.forEach((fn) => fn(v))
}

export function useStickyStack(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    const hero = document.getElementById('hero')
    const about = document.getElementById('about')
    if (!root || !hero || !about) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let enabled = false
    let raf = 0
    let last = -1

    const reset = () => {
      hero.style.transform = ''
      hero.style.opacity = ''
      hero.style.willChange = ''
      about.style.removeProperty('--stack-shadow')
      last = -1
    }

    const frame = () => {
      raf = 0
      if (!enabled) { setCovered(false); setProgress(0, false); return }
      // the part of the hero that stays on screen while it is pinned: all
      // of it, or (taller than the screen) the bottom screenful
      const h = Math.min(hero.offsetHeight, window.innerHeight)
      const top = about.getBoundingClientRect().top
      // within 2px of either end counts as the end: section edges sit on
      // fractional pixels (a smooth-scroll to #about can stop 1px short)
      const raw = (h - top) / h
      const p = raw <= 2 / h ? 0 : raw >= 1 - 2 / h ? 1 : raw
      if (p !== last) {
        last = p
        if (p === 0 || reduced.matches) {
          hero.style.transform = ''
          hero.style.opacity = ''
        } else {
          hero.style.transform = `scale(${1 - RECEDE_SCALE * p})`
          hero.style.opacity = String(1 - RECEDE_FADE * p)
        }
        // own compositing layer only while it moves (at rest -- uncovered or
        // fully covered -- text renders exactly as without the effect)
        hero.style.willChange = p > 0 && p < 1 && !reduced.matches ? 'transform, opacity' : ''
        // the shadow on About's top edge fades in as it starts to rise
        about.style.setProperty('--stack-shadow', String(Math.min(1, p * 6)))
      }
      setCovered(p >= 1)
      // fully covered: hold the intro where it is (the scene is paused too)
      if (p >= 1) timeline.pause()
      else timeline.resume()
      setProgress(p, true)
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(frame) }
    // Sticky only once scrolled (see index.css). Set in the scroll event
    // itself, before that frame is painted, so the hero never jumps.
    const pin = () => root.classList.toggle('stack-pinned', enabled && window.scrollY > 0)
    const onScroll = () => { pin(); schedule() }

    // On at every size. A hero taller than the screen (phones, short
    // windows) scrolls up normally until its bottom edge reaches the bottom
    // of the screen, then stays pinned there (a negative sticky top) while
    // About slides over it; it recedes around the middle of what's visible.
    const measure = () => {
      const h = hero.offsetHeight
      const vh = window.innerHeight
      const extra = Math.max(0, h - vh)
      root.style.setProperty('--stack-top', `${-extra}px`)
      hero.style.transformOrigin = extra ? `50% ${Math.round(h - vh / 2)}px` : ''
      if (!enabled) {
        enabled = true
        root.classList.add('stack-on')
      }
      pin()
      schedule()
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    const onReduced = () => { last = -1; schedule() }
    reduced.addEventListener?.('change', onReduced)
    const ro = 'ResizeObserver' in window ? new window.ResizeObserver(measure) : null
    ro?.observe(hero)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      reduced.removeEventListener?.('change', onReduced)
      ro?.disconnect()
      root.classList.remove('stack-on', 'stack-pinned')
      root.style.removeProperty('--stack-top')
      hero.style.transformOrigin = ''
      reset()
      setCovered(false)
      setProgress(0, false)
      timeline.resume()
    }
  }, [rootRef])
}
