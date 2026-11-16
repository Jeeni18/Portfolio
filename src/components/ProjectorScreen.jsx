import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import { hero } from '../data/content'
import Highlight from './Highlight'
import { T, STEP, timeline, useIntro, progress } from '../hooks/introTimeline'

// Height of bottom bar + pull cord that stays visible below the roller
// while the screen is rolled up (so the cord has something to hang from).
const BAR_H = 14
const CORD_H = 30
const PEEK = BAR_H + CORD_H
// The clip box tucks this far under the roller so the sheet looks like it
// comes out of the housing; the rolled-up bar is pushed below it.
const ROLLER_OVERLAP = 8

const EASE_OUT = [0.22, 1, 0.36, 1]
const EASE_OUT_BACK = [0.34, 1.56, 0.64, 1] // overshoot for the weighted-bar bounce

// Line-by-line reveal. `initial={false}` means an element mounts straight
// into its current state -- so a visitor who already saw the intro this
// session gets the finished screen with no flash.
const reveal = (shown, instant, delay = 0) => ({
  initial: false,
  animate: shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
  transition: { duration: instant ? 0 : 0.45, ease: EASE_OUT, delay: instant ? 0 : delay },
})

const pop = (shown, instant, delay = 0) => ({
  initial: false,
  animate: shown ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 6 },
  transition: instant
    ? { duration: 0 }
    : { type: 'spring', stiffness: 420, damping: 22, delay },
})

// Character count for the typed role line, read straight off the
// timeline clock while that phase is running.
function useTypedChars(text, status, step) {
  const len = text.length
  const [chars, setChars] = useState(() => (status === 'done' ? len : 0))

  useEffect(() => {
    if (status === 'done') { setChars(len); return undefined }
    if (step < STEP.ROLE) { setChars(0); return undefined }
    let raf = 0
    const tick = () => {
      const n = Math.round(progress(timeline.getT(), T.ROLE_START, T.ROLE_END - T.ROLE_START) * len)
      setChars(n)
      if (n < len) raf = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [status, step, len])

  return chars
}

export default function ProjectorScreen({ surfaceRef, onPrimary, onSecondary }) {
  const { status, step, instant } = useIntro()
  const sheetRef = useRef(null)
  const [sheetH, setSheetH] = useState(0)

  const down = step >= STEP.ROLL
  const lit = step >= STEP.BEAM
  const done = status === 'done'
  const chars = useTypedChars(hero.roleLine, status, step)

  // The sheet slides out from behind the roller by its own height, so we
  // need that height in px (and keep it fresh across resizes / font load).
  useLayoutEffect(() => {
    const el = sheetRef.current
    if (!el) return undefined
    const measure = () => setSheetH(el.offsetHeight)
    measure()
    const ro = new window.ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const rolledY = -(sheetH - PEEK - ROLLER_OVERLAP)

  return (
    <div className="relative w-full select-none" aria-live="off">
      {/* Roller bar -- wall-mounted housing the sheet rolls out of */}
      <div
        className="relative z-10 mx-1 h-4 rounded-full shadow-[0_3px_6px_rgba(20,5,11,0.45)]"
        style={{ background: 'linear-gradient(180deg, #7A2B45 0%, #641D35 45%, #35101E 100%)' }}
      >
        <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-5 w-3 rounded-[3px] bg-charcoal" />
        <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-5 w-3 rounded-[3px] bg-charcoal" />
      </div>

      {/* Clip box: everything above the roller's lower edge is hidden */}
      <div className="relative -mt-2 overflow-hidden px-1 pb-3">
        <motion.div
          ref={sheetRef}
          initial={false}
          animate={{ y: down ? 0 : rolledY }}
          transition={
            instant
              ? { duration: 0 }
              : down
                ? { duration: T.ROLL_DURATION, ease: EASE_OUT_BACK }
                : { duration: 0.4, ease: 'easeIn' }
          }
          style={{ visibility: sheetH ? 'visible' : 'hidden' }}
          className="will-change-transform"
        >
          {/* Surface */}
          <div
            ref={surfaceRef}
            className={`tone-light relative border border-charcoal/15 rounded-b-[2px] pt-16 md:pt-12 pb-8 px-7 md:px-10 ${
              instant ? '' : 'transition-[background-color,box-shadow] duration-500'
            }`}
            style={{
              // Off-white sheet; brightens slightly once the projector is on.
              background: lit ? '#FAF6F0' : '#EDE4D8',
              boxShadow: lit
                ? 'inset 0 12px 14px -12px rgba(53,16,30,0.28), 0 1px 2px rgba(53,16,30,0.06), 0 18px 40px rgba(53,16,30,0.1)'
                : 'inset 0 12px 14px -12px rgba(53,16,30,0.28)',
            }}
          >
            <motion.p
              {...reveal(step >= STEP.HELLO, instant)}
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-charcoal/55 mb-5 md:pr-48"
            >
              {hero.locationLine}
            </motion.p>

            <motion.p {...reveal(step >= STEP.HELLO, instant)} className="font-display italic text-2xl md:text-[1.75rem] text-[#8D5365] mb-1">
              {hero.greeting}
            </motion.p>

            <motion.h1
              {...reveal(step >= STEP.NAME, instant)}
              className="font-display leading-[0.95] tracking-tight text-charcoal mb-4"
              style={{ fontSize: 'clamp(2.4rem, 5.6vw, 4.1rem)' }}
            >
              {hero.firstName} {hero.lastName}
            </motion.h1>

            <p className="font-mono text-sm text-[#8D5365] mb-6 min-h-[1.5em]" aria-label={hero.roleLine}>
              <span aria-hidden="true">{hero.roleLine.slice(0, chars)}</span>
              <span
                aria-hidden="true"
                className={`inline-block w-[0.5em] h-[1.05em] bg-[#641D35] ml-0.5 align-[-0.2em] ${
                  chars >= hero.roleLine.length ? 'cursor-blink' : ''
                }`}
                style={{ opacity: step >= STEP.ROLE ? 1 : 0 }}
              />
            </p>

            <motion.p
              {...reveal(step >= STEP.BIO, instant)}
              className="font-body text-[15px] md:text-[16px] text-charcoal/85 max-w-md leading-relaxed mb-8"
            >
              {hero.bioPre}
              <Highlight active={step >= STEP.MARK} instant={instant} duration={T.MARK_DURATION}>
                {hero.bioHighlight}
              </Highlight>
              {hero.bioPost}
            </motion.p>

            <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
              <motion.button
                {...pop(step >= STEP.BUTTONS, instant)}
                onClick={onPrimary}
                className="btn-primary"
                tabIndex={step >= STEP.BUTTONS ? 0 : -1}
              >
                {hero.ctaPrimary.label}
              </motion.button>
              <motion.button
                {...pop(step >= STEP.BUTTONS, instant, 0.08)}
                onClick={onSecondary}
                className="btn-secondary"
                tabIndex={step >= STEP.BUTTONS ? 0 : -1}
              >
                {hero.ctaSecondary.label}
              </motion.button>
            </div>

            {/* Handwritten margin note -- the one place the hand font is used */}
            <motion.span
              {...pop(step >= STEP.BUTTONS, instant, 0.16)}
              className="absolute top-5 right-5 md:right-8 font-hand text-xl md:text-2xl leading-none text-[#641D35] -rotate-3"
              aria-hidden="true"
            >
              {hero.handwrittenNote}
              <svg viewBox="0 0 120 8" preserveAspectRatio="none" className="block w-full h-2 mt-1" fill="none">
                <path d="M2 5 C 30 2, 60 7, 118 3" stroke="#8D5365" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.span>
          </div>

          {/* Weighted bottom bar */}
          <div
            className="relative -mx-1 rounded-[3px] shadow-[0_3px_6px_rgba(20,5,11,0.45)] flex items-center justify-end pr-3"
            style={{ height: BAR_H, background: 'linear-gradient(180deg, #7A2B45 0%, #641D35 55%, #4A1527 100%)' }}
          >
            {done && (
              <button
                type="button"
                onClick={() => timeline.replay()}
                className="inline-flex items-center gap-1 font-mono text-[10px] leading-none text-bone/70 hover:text-[#D5B7B8] focus-visible:text-[#D5B7B8] transition-colors"
                aria-label="Replay intro"
              >
                <RotateCcw size={9} strokeWidth={2.5} />
                replay
              </button>
            )}
          </div>

          {/* Pull cord + ring */}
          <div className="relative" style={{ height: CORD_H }} aria-hidden="true">
            <span className="absolute left-[72%] top-0 w-px bg-bone/50" style={{ height: CORD_H - 12 }} />
            <span
              className="absolute left-[72%] -translate-x-1/2 w-3.5 h-3.5 rounded-full border-[1.5px] border-bone/60"
              style={{ top: CORD_H - 14 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
