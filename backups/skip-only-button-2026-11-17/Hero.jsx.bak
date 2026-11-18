import React, { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { hero } from '../data/content'
import { useWebglSupport } from '../hooks/useWebglSupport'
import { STEP, T, timeline, useIntro, between } from '../hooks/introTimeline'
import { useLocalTime } from '../hooks/useLocalTime'
import Blade from '../components/Blade'
import Board from '../components/Board'
import WaveCaption from '../components/WaveCaption'

const HeroScene = lazy(() => import('../three/HeroScene'))

// Room proportions, measured from the reference (1234 x 655 frame).
// Fractions of the hero height (H) unless marked "% of content".
const ROOM = {
  content: '94%',      // content column, of viewport width
  rule: 0.1145,        // header rule height (also set in Navbar)
  boardTop: 0.157,
  boardH: 0.628,       // bottom sits ~28px (at 800px tall) above the floor line
  boardW: '73.6%',     // % of content
  floorLine: 0.82,     // wall / floor line
  coneX: 0.884,        // spotlight centre, fraction of content width
  coneTop: 0.022,      // spotlight width at the rule, fraction of content width
  coneBottom: 0.195,   // spotlight width at the floor, fraction of content width (fits the desk)
  miniW: 0.29,         // 3D canvas width, fraction of content width
  miniH: 0.36,         // 3D canvas height
  miniRight: 0.0,      // canvas right edge, in from the content's right edge (fraction)
  sink: 0.16,          // canvas bottom below the floor line, fraction of canvas height
}
// Wave caption size: ~28px at 1440 wide (a fraction of the content width),
// kept between min and max; a little smaller in stacked layouts.
const CAPTION_SIZE = { ofContent: 0.0207, min: 20, max: 30, stacked: 18 }
// Stacked layouts: space between the board and her box, room for her
// two-line wave caption above her head.
const STACK_CAPTION_GAP = 56
const STACK_FLOOR = 170 // floor band height when the layout stacks (tablet / phone), px

// Board interior: relative row heights (reference: 72 / 40 / 34) and the
// blade gap, which is 8px when the board is ~1000px wide (1440 viewport).
const BOARD_ROWS = { name: 72, row2: 40, row3: 34 }
const BLADE_GAP = '0.8cqw'

// Type sizes in % of the board's width (cqw), floored for small screens.
const TYPE = {
  name: 'max(30px, 9.4cqw)',
  role: 'max(16px, 4.05cqw)',
  mono: 'max(12px, 2.27cqw)',
}

// Room-level mono size (nav, floor actions), matching the board's labels.
const ROOM_MONO = 'clamp(13px, min(1.55vw, 2.9vh), 26px)'

// Desktop room layout (absolute positions) vs. stacked layout below it.
function useDesktopRoom() {
  const query = '(min-width: 1024px) and (min-height: 600px)'
  const [on, setOn] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const sync = () => setOn(mq.matches)
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return on
}

// Intro choreography anchors, in hero px / fractions of the content column.
const INTRO = {
  standX: 0.12,      // where she stops after walking in, fraction of content width
  offX: -70,         // her start, hero px (beyond the left edge)
  offHandle: -60,    // handle position while the board waits off-screen, hero px
  handleTop: 0.84,   // handle height on the edge (fraction of board height) until the 3D scene reports her hand height
  safetyStart: 600,  // ms: start without the 3D scene if it hasn't loaded (she joins mid-walk-in)
  safetyEnd: 16000,  // ms: force the final state no matter what
}
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3)

export default function Hero({ onContactOpen }) {
  const prefersReducedMotion = useReducedMotion()
  const webglSupported = useWebglSupport()
  const { status, step, instant } = useIntro()
  const time = useLocalTime()
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const boardRef = useRef(null)
  const [H, setH] = useState(800)
  const [W, setW] = useState(1200)
  const [contentLeft, setContentLeft] = useState(0)
  const desktop = useDesktopRoom()
  const screenLines = [`> whoami`, hero.firstName + ' ' + hero.lastName.replace('.', ''), `> role`, hero.roleLine]

  // Decide once -- before the first paint -- whether to play the intro or
  // land on the final state. Reduced motion: final state, no fade. Seen
  // already this session: final state behind a 300ms fade. Playing itself
  // is kicked off by the 3D scene's first frame (so her walk never runs
  // behind a loading canvas), or right away when there's no WebGL.
  useState(() => {
    if (prefersReducedMotion) timeline.finish()
    else if (timeline.hasPlayedThisSession()) timeline.finish({ quick: true })
    return null
  })

  useEffect(() => {
    if (!webglSupported) timeline.start()
  }, [webglSupported])

  // Safety nets: if her scene hasn't started the intro by 1.2s (slow 3D
  // chunk), start it anyway -- the board then slides in on its own timing
  // and she joins mid-sequence. Whatever happens (load failure, tab hidden,
  // stalled timeline), everything is in its final state 16s after load.
  useEffect(() => {
    const kick = setTimeout(() => {
      if (timeline.getStatus() === 'idle') timeline.start()
    }, INTRO.safetyStart)
    const hardStop = setTimeout(() => {
      if (timeline.getStatus() !== 'done') timeline.finish()
    }, INTRO.safetyEnd)
    return () => {
      clearTimeout(kick)
      clearTimeout(hardStop)
    }
  }, [])

  // Pause the 3D scene (and her typing loop) while the hero is scrolled out
  // of view or the tab is hidden; it picks up where it left off.
  const [scenePaused, setScenePaused] = useState(false)
  useEffect(() => {
    const el = sectionRef.current
    let onScreen = true
    const update = () => setScenePaused(!onScreen || document.visibilityState === 'hidden')
    const io = new window.IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      update()
    })
    if (el) io.observe(el)
    document.addEventListener('visibilitychange', update)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  // Any interaction while the intro is running jumps to the end.
  useEffect(() => {
    if (status !== 'playing') return undefined
    const skip = () => timeline.skip()
    const opts = { passive: true }
    const events = ['pointerdown', 'keydown', 'wheel', 'touchmove', 'scroll']
    events.forEach((e) => window.addEventListener(e, skip, opts))
    return () => events.forEach((e) => window.removeEventListener(e, skip, opts))
  }, [status])

  useLayoutEffect(() => {
    const measure = () => {
      if (sectionRef.current) setH(sectionRef.current.offsetHeight)
      if (contentRef.current) {
        setW(contentRef.current.offsetWidth)
        setContentLeft(contentRef.current.offsetLeft)
      }
    }
    measure()
    const ro = new window.ResizeObserver(measure)
    if (sectionRef.current) ro.observe(sectionRef.current)
    if (contentRef.current) ro.observe(contentRef.current)
    return () => ro.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const done = status === 'done'
  const settled = step >= STEP.SPOT
  const fade = (shown) => ({
    initial: false,
    animate: { opacity: shown ? 1 : 0 },
    transition: { duration: instant ? 0 : T.SPOT_DURATION, ease: 'easeOut' },
  })

  // ---- geometry ----
  const floorY = H * ROOM.floorLine
  const floorH = H - floorY
  const miniW = Math.round(W * ROOM.miniW)
  const miniH = Math.round(H * ROOM.miniH)
  const stackedMiniW = Math.min(W * 0.78, 300)
  const stackedMiniH = Math.round(stackedMiniW * 0.78)

  const boardStyle = desktop
    ? {
        top: `${ROOM.boardTop * 100}%`,
        height: `${ROOM.boardH * 100}%`,
        width: ROOM.boardW,
        paddingInline: '2.87%', // 3.9% of the board's width
      }
    : undefined
  const legHeight = Math.round(floorY - H * (ROOM.boardTop + ROOM.boardH))
  const miniStyle = { width: stackedMiniW, height: stackedMiniH, marginBottom: STACK_FLOOR - stackedMiniH * ROOM.sink }

  // Desktop: the canvas covers the whole hero; `frame` is where her old
  // mini-me box was (hero px) -- the scene renders that box exactly as
  // before. `anchors` are the screen positions her walk + pull use.
  const boardRight = contentLeft + W * 0.736
  const handleX = boardRight + 3 // handle centre (1px clear of the 4px frame, 4px wide)
  const frame = desktop
    ? {
        left: Math.round(contentLeft + W - miniW - W * ROOM.miniRight),
        top: Math.round(H - (floorH - miniH * ROOM.sink) - miniH),
        width: miniW,
        height: miniH,
      }
    : null
  const anchors = desktop
    ? { offX: INTRO.offX, offHandleX: INTRO.offHandle, p1X: contentLeft + W * INTRO.standX, handleX }
    : null

  // The board slides in with a transform set every frame (no re-renders):
  // locked to her hand while she pulls it (desktop), or on its own easing
  // (stacked layouts, or if the 3D scene isn't running).
  useEffect(() => {
    let raf = 0
    const boardTopPx = H * ROOM.boardTop
    const boardH = H * ROOM.boardH
    const offStacked = -(contentLeft + W + 40)
    const update = () => {
      const el = boardRef.current
      if (!el) return
      const st = timeline.getStatus()
      const t = timeline.getT()
      const hand = timeline.hand
      const fresh = hand.valid && window.performance.now() - hand.stamp < 250
      let x = 0
      if (st === 'idle') {
        x = desktop ? INTRO.offHandle - handleX : offStacked
      } else if (st === 'playing') {
        if (desktop && fresh) {
          x = Math.min(0, hand.x - handleX)
        } else {
          const off = desktop ? INTRO.offHandle - handleX : offStacked
          x = off * (1 - easeOutCubic(between(t, T.BOARD_START, T.BOARD_END)))
        }
      }
      el.style.transform = x ? `translate3d(${x.toFixed(1)}px, 0, 0)` : ''
      const handleEl = el.querySelector('.board__handle')
      if (handleEl) {
        // Desktop: at her hand height (she pulls the board by it). Stacked:
        // centred on the edge.
        const top = !desktop
          ? el.offsetHeight / 2
          : hand.valid && hand.handleY > 0 ? hand.handleY - boardTopPx : boardH * INTRO.handleTop
        handleEl.style.top = `${top.toFixed(1)}px`
      }
    }
    // Every frame (for the phases she isn't holding it), and again right
    // after the 3D scene moves her hand, so the handle stays in her grip in
    // the same frame rather than trailing it by one.
    const tick = () => {
      raf = requestAnimationFrame(tick)
      update()
    }
    tick()
    const offHand = timeline.onHand(update)
    return () => {
      cancelAnimationFrame(raf)
      offHand()
    }
  }, [desktop, H, W, contentLeft, handleX])

  const monoSize = { fontSize: TYPE.mono }
  const replayControls = (
    <span className="hidden sm:inline-flex items-center opacity-0 group-hover/board:opacity-100 focus-within:opacity-100 transition-opacity">
      {done && (
        <button
          type="button"
          onClick={() => timeline.replay()}
          className="board-control"
          aria-label="Replay intro"
        >
          ↻ replay
        </button>
      )}
    </span>
  )

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="room relative overflow-hidden lg:h-screen lg:min-h-[640px] lg:max-h-[1100px]"
    >
      {/* Room fades up from dark (first visit: 0.3s; return visit in the
          same session: a quick 300ms fade; reduced motion: no fade). */}
      <motion.div
        initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
        className="lg:absolute lg:inset-0"
      >
        {/* Wall: flat #29232A (the section background) */}

        {/* Floor: darker band with a thin rose line where it meets the wall */}
        <div
          aria-hidden="true"
          className="room-floor absolute inset-x-0 bottom-0"
          style={{ height: desktop ? floorH : STACK_FLOOR }}
        />

        <div
          ref={contentRef}
          className="relative mx-auto lg:h-full pt-[calc(max(56px,11.45vh)+20px)] lg:pt-0"
          style={{ width: ROOM.content }}
        >
          {/* Spotlight: a narrow, flat #F1E8DD cone at 5% from the header
              rule down to the floor, painted behind the canvas so it frames
              her without tinting her; a dark pool where it meets the floor. */}
          {desktop && (
            <motion.div {...fade(settled)} className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
              <div
                aria-hidden="true"
                className="room-cone absolute z-0 pointer-events-none"
                style={{
                  left: W * (ROOM.coneX - ROOM.coneBottom / 2),
                  width: W * ROOM.coneBottom,
                  top: H * ROOM.rule,
                  height: floorY - H * ROOM.rule,
                  clipPath: `polygon(${50 - (ROOM.coneTop / ROOM.coneBottom) * 50}% 0, ${50 + (ROOM.coneTop / ROOM.coneBottom) * 50}% 0, 100% 100%, 0 100%)`,
                }}
              />
              <div
                aria-hidden="true"
                className="room-pool absolute z-0 pointer-events-none"
                style={{
                  left: W * (ROOM.coneX - ROOM.coneBottom / 2),
                  width: W * ROOM.coneBottom,
                  top: floorY - 5,
                  height: 10,
                }}
              />
            </motion.div>
          )}

          {/* Departure board */}
          <Board
            ref={boardRef}
            label="Introduction board"
            topLeft={hero.board.label}
            topRight={`${hero.board.place} · ${time}`}
            bottomLeft={
              <span className="inline-flex items-center gap-5 whitespace-nowrap">
                <span>{hero.board.footnote}</span>
                {replayControls}
              </span>
            }
            bottomRight={hero.board.index}
            legs={desktop}
            legHeight={legHeight}
            handleTop={0}
            className="group/board w-full px-4 pb-4 sm:px-6 lg:absolute lg:left-0 lg:p-0 will-change-transform"
            metaClassName="text-[length:max(12px,2.27cqw)]"
            topClassName="h-[52px] lg:h-auto lg:basis-[16%] lg:shrink-0"
            bottomClassName="h-[52px] lg:h-auto lg:flex-1"
            bodyClassName="flex-none gap-2 lg:gap-0 lg:basis-[64%] lg:min-h-0"
            style={boardStyle}
          >
            {/* Row 1: name (cream panel, pins at the hinge ends) */}
            <div className="relative h-[76px] sm:h-[96px] lg:h-auto lg:min-h-0" style={desktop ? { flex: `${BOARD_ROWS.name} 1 0`, marginBottom: BLADE_GAP } : undefined}>
              <Blade
                as="h1"
                variant="cream"
                text={`${hero.firstName} ${hero.lastName}`}
                className="h-full font-display"
                textClassName="leading-none px-[max(18px,3.5cqw)]"
                style={{ fontSize: TYPE.name }}
              />
              <span aria-hidden="true" className="room-pin room-pin--l" />
              <span aria-hidden="true" className="room-pin room-pin--r" />
            </div>

            {/* Row 2: role · field (both charcoal; field in dusty pink) */}
            <div className="flex gap-2 h-[54px] lg:h-auto lg:min-h-0" style={desktop ? { flex: `${BOARD_ROWS.row2} 1 0`, gap: BLADE_GAP, marginBottom: BLADE_GAP } : undefined}>
              <Blade
                variant="dark"
                text={hero.board.role}
                className="basis-[63%] shrink-0 font-display italic"
                textClassName="leading-none px-[max(14px,2.6cqw)]"
                style={{ fontSize: TYPE.role }}
              />
              <Blade
                variant="dark"
                secondary
                text={hero.board.field}
                className="flex-1 font-mono"
                textClassName="px-[max(14px,2.6cqw)]"
                style={monoSize}
              />
            </div>

            {/* Row 3: stack (charcoal, cream type) · status (burgundy) */}
            <div className="grid grid-cols-2 sm:flex gap-2 sm:h-[48px] lg:h-auto lg:min-h-0" style={desktop ? { flex: `${BOARD_ROWS.row3} 1 0`, gap: BLADE_GAP } : undefined}>
              {hero.board.stack.map((item) => (
                <Blade
                  key={item}
                  variant="dark"
                  text={item}
                  center
                  className="h-[46px] sm:h-auto sm:flex-1 font-mono"
                  style={monoSize}
                />
              ))}
              <Blade
                variant="status"
                text={hero.board.status}
                center
                className="h-[46px] sm:h-auto sm:flex-[1.15] font-mono"
                style={monoSize}
              />
            </div>
          </Board>

          {/* Stacked layouts: mini-me in her own box below the board */}
          {!desktop && (
            <div className="relative z-10 mx-auto" style={{ ...miniStyle, marginTop: STACK_CAPTION_GAP }}>
              {webglSupported && (
                <>
                  <div className="absolute inset-0" aria-hidden="true">
                    <Suspense fallback={null}>
                      <HeroScene reducedMotion={!!prefersReducedMotion} lines={screenLines} paused={scenePaused} />
                    </Suspense>
                  </div>
                  <WaveCaption compact fontSize={CAPTION_SIZE.stacked} minTop={6 - STACK_CAPTION_GAP} />
                </>
              )}
            </div>
          )}
        </div>

        {/* Desktop: her canvas covers the whole room (above the board, so
            she's always in front of it; transparent to clicks). While the
            3D chunk loads, or without WebGL, nothing is shown -- no
            placeholder image. */}
        {desktop && webglSupported && (
          <div className="absolute inset-0 z-20 pointer-events-none" aria-hidden="true">
            <Suspense fallback={null}>
              <HeroScene reducedMotion={!!prefersReducedMotion} lines={screenLines} frame={frame} anchors={anchors} paused={scenePaused} />
            </Suspense>
          </div>
        )}
        {/* What she says while she waves (typed HTML over the canvas). */}
        {desktop && webglSupported && (
          <div className="absolute inset-0 z-30 pointer-events-none">
            <WaveCaption
              fontSize={Math.round(Math.min(CAPTION_SIZE.max, Math.max(CAPTION_SIZE.min, W * CAPTION_SIZE.ofContent)))}
              minTop={H * ROOM.rule + 12}
            />
          </div>
        )}

        {/* On the floor: actions left, scroll cue right */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{ height: desktop ? floorH : STACK_FLOOR }}
        >
          <div
            className="mx-auto h-full flex items-end pb-7 lg:items-center lg:pb-0 justify-between"
            style={{ width: ROOM.content, fontSize: ROOM_MONO }}
          >
            <motion.div {...fade(settled)} className="flex items-center gap-[1.6em] pointer-events-auto">
              <button
                type="button"
                onClick={() => scrollTo(hero.ctaPrimary.href)}
                className="room-btn-primary"
                tabIndex={settled ? 0 : -1}
              >
                {hero.ctaPrimary.label}
              </button>
              <button
                type="button"
                onClick={onContactOpen}
                className="room-btn-secondary"
                tabIndex={settled ? 0 : -1}
              >
                {hero.ctaSecondary.label} <span aria-hidden="true">→</span>
              </button>
            </motion.div>

            {/* Bottom-right corner: "skip intro" while it plays, then the
                scroll cue fades in in the same spot. */}
            <div className="relative self-start mt-[18px] lg:mt-[22px] pointer-events-auto">
              <motion.button
                {...fade(settled)}
                type="button"
                onClick={() => scrollTo('#about')}
                className="scroll-cue hidden sm:flex"
                aria-label="Scroll to About"
                tabIndex={settled ? 0 : -1}
              >
                <span className="font-mono leading-none">scroll</span>
                <span className="scroll-cue__line" aria-hidden="true" />
              </motion.button>
              {status === 'playing' && !settled && (
                <button
                  type="button"
                  onClick={() => timeline.skip()}
                  className="skip-intro absolute right-0 top-0 whitespace-nowrap font-mono leading-none"
                >
                  skip intro <span aria-hidden="true">→</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
