import { useLayoutEffect, useRef } from 'react'
import { whenRevealed } from './revealScheduler'

// Scroll reveal for a section: its blades wipe in left to right, and the
// About highlight sweeps in -- when revealScheduler says so (each group by
// its own position: a board, a project row, the workflow chain, the "4"
// box), and again each time the visitor comes back to it (reset off-screen
// in between). CSS: .blade.rv-wait / .is-in, .rv-instant and
// .s-highlight.is-in in index.css; per-blade delay in --d.
//
// Only what is in the section when it mounts takes part; content that
// appears later (a project panel the visitor opens) shows as it is.
// Reduced motion: everything is shown at once, no replays.
const GROUPS = '.works-flow, .works-row, .board, .awards-four'

export function useReveal() {
  const ref = useRef(null)
  // before the first paint, so nothing flashes in and back out
  useLayoutEffect(() => {
    const section = ref.current
    if (!section) return undefined
    const offs = []
    section.querySelectorAll('.blade').forEach((blade) => {
      const group = blade.closest(GROUPS)
      blade.classList.add('rv-wait')
      offs.push(whenRevealed(blade, (delay, instant) => {
        if (instant) blade.classList.add('rv-instant')
        else blade.style.setProperty('--d', `${delay}ms`)
        blade.classList.add('is-in')
      }, {
        group: group && section.contains(group) ? group : blade,
        // back to hidden (off-screen) for the next visit
        reset: () => {
          blade.classList.remove('is-in', 'rv-instant')
          blade.style.removeProperty('--d')
        },
      }))
    })
    section.querySelectorAll('.s-highlight').forEach((hl) => {
      offs.push(whenRevealed(hl, (delay, instant) => {
        if (instant) hl.classList.add('rv-instant')
        hl.classList.add('is-in')
      }, { reset: () => hl.classList.remove('is-in', 'rv-instant') }))
    })
    return () => offs.forEach((off) => off())
  }, [])
  return ref
}
