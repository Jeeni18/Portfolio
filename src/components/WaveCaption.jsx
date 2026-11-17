import React, { useEffect, useRef } from 'react'
import { INTRO_TIMING, CAPTION_CHAR_TIMES, CAPTION_BREAK_AT, T, timeline, between } from '../hooks/introTimeline'

// What she "says" while she waves: a thin rose leader line up and to the
// right of her head, an underline, and the text typing out above it in the
// display serif with a small dusty-pink block cursor. Real HTML over the 3D
// canvas, anchored to the point her scene projects from her head bone every
// frame (timeline.captionAnchor). Driven by the intro timeline: it only shows
// while the intro plays, so skip / key / scroll / return visits / reduced
// motion (all of which jump to the end) never show it, and replay does.
//
// Positions and the typed text are written to the DOM directly each frame
// (no React re-renders).

const CAPTION = INTRO_TIMING.caption
const LEADER = { dx: 0.95, dy: 0.85 }   // leader line, in ems of the caption font (up and to the right)
const TEXT_GAP = 0.22                    // em: text starts this far after the corner ...
const TEXT_LIFT = 0.12                   // em: ... and sits this far above the underline
const EDGE = 12                          // px: keep this far inside the screen

export default function WaveCaption({ compact = false, fontSize = 28, minTop = 0 }) {
  const rootRef = useRef(null)
  const leaderRef = useRef(null)
  const underRef = useRef(null)
  const textRef = useRef(null)
  const typedRef = useRef(null)
  const measureRef = useRef(null)
  const liveRef = useRef(null)

  // Phones: break after "Namaste!" (the underline runs under the longer line).
  const fullText = compact
    ? `${CAPTION.text.slice(0, CAPTION_BREAK_AT)}\n${CAPTION.text.slice(CAPTION_BREAK_AT).trimStart()}`
    : CAPTION.text
  // On phones the space after the break is replaced by the line break.
  const typedAt = (n) => {
    const shown = CAPTION.text.slice(0, n)
    if (!compact || n <= CAPTION_BREAK_AT) return shown
    return `${shown.slice(0, CAPTION_BREAK_AT)}\n${shown.slice(CAPTION_BREAK_AT).trimStart()}`
  }

  useEffect(() => {
    let raf = 0
    let width = 0
    let height = 0
    let announced = false
    let lastTyped = -1
    let shown = false
    // The measuring copy lives inside the caption, which is display:none
    // while hidden, so it is only measured while the caption is shown.
    const measure = () => {
      const m = measureRef.current
      if (!m || !shown) return
      width = m.offsetWidth
      height = m.offsetHeight
    }
    const remeasure = () => { width = 0; measure() }
    document.fonts?.ready.then(remeasure)
    window.addEventListener('resize', remeasure)

    // Hidden = display:none on the whole caption (text, lines, cursor and
    // the measuring copy), with everything reset, so nothing can linger at a
    // partial opacity or show through a child's own visibility.
    const hide = () => {
      const root = rootRef.current
      if (!shown || !root) return
      shown = false
      root.style.display = 'none'
      root.style.opacity = '0'
      typedRef.current.textContent = ''
      textRef.current.style.visibility = 'hidden'
      leaderRef.current.style.width = '0px'
      underRef.current.style.width = '0px'
      lastTyped = -1
    }

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const root = rootRef.current
      if (!root) return
      const t = timeline.getT()
      const a = timeline.captionAnchor
      const playing = timeline.getStatus() === 'playing'
      const on = playing && t >= T.TURN_END && t < T.CAPTION_END && a.valid
      // Screen readers: the whole sentence once, as the caption starts;
      // emptied again as soon as the caption is gone.
      if (on && !announced) {
        liveRef.current.textContent = CAPTION.text
        announced = true
      }
      if (!on && liveRef.current.textContent) liveRef.current.textContent = ''
      // Ready to announce again only once a new play is before the caption.
      if (announced && (!playing || t < T.TURN_END)) announced = false
      if (!on) {
        hide()
        return
      }
      if (!shown) {
        shown = true
        root.style.display = 'block'
        measure()
      }
      if (!width) measure()

      // Geometry (container px): anchor -> leader -> corner -> underline.
      const em = fontSize
      const parent = root.offsetParent || root.parentElement
      const box = parent.getBoundingClientRect()
      const maxRight = window.innerWidth - EDGE - box.left
      const textW = width + TEXT_GAP * em
      let cx = a.x + LEADER.dx * em
      const cy = Math.max(a.y - LEADER.dy * em, minTop + height + TEXT_LIFT * em)
      if (cx + textW > maxRight) cx = Math.max(a.x + 0.3 * em, maxRight - textW)
      const ldx = cx - a.x
      const ldy = a.y - cy
      const len = Math.hypot(ldx, ldy)

      // Timing: lines draw (leader, then underline), text types, holds, fades.
      const draw = between(t, T.TURN_END, T.CAPTION_TYPE_START)
      const fade = 1 - between(t, T.WAVE_END, T.CAPTION_END)
      leaderRef.current.style.transform = `translate(${a.x}px, ${a.y}px) rotate(${-Math.atan2(ldy, ldx)}rad) scaleX(${Math.min(1, draw * 2)})`
      leaderRef.current.style.width = `${len}px`
      underRef.current.style.transform = `translate(${cx}px, ${cy}px) scaleX(${Math.max(0, Math.min(1, draw * 2 - 1))})`
      underRef.current.style.width = `${textW + 0.1 * em}px`
      textRef.current.style.transform = `translate(${cx + TEXT_GAP * em}px, ${cy - TEXT_LIFT * em - height}px)`

      const since = t - T.CAPTION_TYPE_START
      let n = 0
      if (since >= 0) while (n < CAPTION_CHAR_TIMES.length && CAPTION_CHAR_TIMES[n] <= since) n++
      if (n !== lastTyped) {
        typedRef.current.textContent = typedAt(n)
        textRef.current.style.visibility = since >= 0 ? 'visible' : 'hidden'
        lastTyped = n
      }
      root.style.opacity = String(fade)
    }
    tick()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', remeasure)
      hide()
    }
    // typedAt only depends on `compact`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compact, fontSize, minTop])

  return (
    <>
    {/* Screen-reader copy: sr-only, outside the caption (a display:none live
        region isn't announced), and empty whenever the caption isn't shown. */}
    <span ref={liveRef} className="wave-caption__sr" aria-live="polite" />
    <div ref={rootRef} className="wave-caption" style={{ fontSize, display: 'none', opacity: 0 }}>
      <div aria-hidden="true">
        <span ref={leaderRef} className="wave-caption__line" />
        <span ref={underRef} className="wave-caption__line" />
        <div ref={textRef} className="wave-caption__text font-display italic" style={{ visibility: 'hidden' }}>
          <span ref={typedRef} />
          <span className="wave-caption__cursor" />
        </div>
        {/* Invisible copy of the full caption, to size the underline. */}
        <div ref={measureRef} className="wave-caption__text wave-caption__measure font-display italic">
          {fullText}
          <span className="wave-caption__cursor" />
        </div>
      </div>
    </div>
    </>
  )
}
