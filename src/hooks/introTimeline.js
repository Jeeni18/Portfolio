import { useSyncExternalStore } from 'react'

// One timeline for the whole hero intro. It owns its own clock (a rAF
// ticker); the 3D rig (HeroScene), the board's slide (Hero.jsx) and the
// laptop screen all read `t` from here, so she and the board can never
// drift apart. Times are seconds from the start of the sequence.
//
// While she pulls, the 3D scene publishes where the board's handle is each
// frame (`hand`), her hands are IK-locked onto it, and the board's
// translateX is derived from it.
//
// ======================================================================
//  INTRO_TIMING -- the one place to tweak the intro.
//  Durations in seconds, played in this order; every phase time below is
//  derived from them, so changing one row shifts everything after it.
// ======================================================================
export const INTRO_TIMING = {
  // The caption she "says" while she waves: "Namaste! Let me show you
  // around". Her wave lasts exactly as long as the caption draws, types and
  // holds (lineDraw + typing + hold = ~3.5s); it fades as she turns away.
  caption: {
    text: 'Namaste! Let me show you around',
    breakAfter: 'Namaste!', // the pause (and, on phones, the line break) comes after this
    lineDraw: 0.3,          // s: leader line, then underline, draw in
    msPerChar: 45,          // ms per typed character
    pauseAfterBreak: 0.3,   // s: natural pause after "Namaste!"
    hold: 1.5,              // s: full text held so it can be read
    fade: 0.3,              // s: text, lines and cursor fade out as she turns away
  },
  // Desktop (board left, mini-me right) -- ~12.3s in total
  desktop: {
    fadeIn: 0.5,          // 0.0-0.5  room fades up; desk + laptop in place; no board, spotlight off
    walkIn: 1.8,          // 0.5-2.3  walks in from off-screen left, relaxed pace, stops at ~12%
    turnToVisitor: 0.25,  // 2.3-2.55 turns three-quarter toward the visitor ...
    wave: 'caption',      // 2.55-6.05 ... and waves while the caption draws, types and holds
    turnAndGrip: 0.9,     // 6.05-6.95 turns to the left edge (caption fades), steps to it, grips the handle as it peeks in
    tugs: 3,              // 6.95-9.8 three heavy tugs, stepping backwards ...
    tugPull: 0.75,        //          ... each: pull (ease-out) ...
    tugReset: 0.2,        //          ... then a pause while she resets her stance
    letGo: 0.55,          // 9.8-10.35 lets go, straightens up, small exhale
    walkToDesk: 0.5,      // 10.35-10.85 walks to her desk ...
    sit: 0.5,             // 10.85-11.35 ... and sits, the chair pulled out
    scootIn: 0.5,         // 11.35-11.85 scoots her chair in to the desk
    finale: 0.5,          // 11.85-12.35 taps the laptop: spotlight fades on, buttons + scroll cue fade in; she starts typing
    walkCadence: 6.5,     // walk-cycle speed while walking in (relaxed)
  },
  // Tablet / phone (board stacked above her) -- 2.6s: she walks in, waves
  // and sits while the board slides in on its own
  stacked: {
    fadeIn: 0.2,
    walkIn: 0.7,
    turnToVisitor: 0.1,
    wave: 'caption',
    turnAndGrip: 0,
    tugs: 0,
    tugPull: 0,
    tugReset: 0,
    letGo: 0,
    walkToDesk: 0.15,
    sit: 0.4,
    scootIn: 0.35,
    finale: 0.45,
    walkCadence: 11,
    boardIn: [0.2, 1.2],  // board's own slide-in window (s)
  },
}

// Caption: when each character appears (s after typing starts), and how
// long the line draw + typing + hold lasts (= her wave).
const CAPTION = INTRO_TIMING.caption
const BREAK_AT = CAPTION.text.indexOf(CAPTION.breakAfter) + CAPTION.breakAfter.length
export const CAPTION_CHAR_TIMES = [...CAPTION.text].map(
  (_, i) => (i * CAPTION.msPerChar) / 1000 + (i >= BREAK_AT ? CAPTION.pauseAfterBreak : 0)
)
export const CAPTION_BREAK_AT = BREAK_AT
const CAPTION_TYPING = CAPTION_CHAR_TIMES[CAPTION_CHAR_TIMES.length - 1] + CAPTION.msPerChar / 1000
const CAPTION_LENGTH = CAPTION.lineDraw + CAPTION_TYPING + CAPTION.hold

// Phase boundaries (absolute seconds) derived from INTRO_TIMING.
function schedule(layout) {
  const d = { ...INTRO_TIMING[layout] }
  if (d.wave === 'caption') d.wave = CAPTION_LENGTH
  const FADE_END = d.fadeIn
  const WALK_END = FADE_END + d.walkIn
  const TURN_END = WALK_END + d.turnToVisitor
  const WAVE_END = TURN_END + d.wave
  const REACH_END = WAVE_END + d.turnAndGrip
  const PULL_END = REACH_END + d.tugs * (d.tugPull + d.tugReset)
  const RELEASE_END = PULL_END + d.letGo
  const TO_DESK_END = RELEASE_END + d.walkToDesk
  const SIT_END = TO_DESK_END + d.sit
  const SCOOT_END = SIT_END + d.scootIn
  const END = SCOOT_END + d.finale
  const [BOARD_START, BOARD_END] = d.boardIn || [WAVE_END, PULL_END]
  return {
    layout,
    FADE_END, WALK_END, TURN_END, WAVE_END, REACH_END,
    // The caption: lines draw from TURN_END, typing from CAPTION_TYPE_START,
    // held until WAVE_END, faded out by CAPTION_END.
    CAPTION_TYPE_START: TURN_END + CAPTION.lineDraw,
    CAPTION_END: WAVE_END + CAPTION.fade,
    TUGS: d.tugs, TUG_PULL: d.tugPull, TUG_RESET: d.tugReset,
    PULL_END, RELEASE_END, TO_DESK_END, SIT_END, SCOOT_END,
    // The light tap: her hand reaches the laptop, presses (the light comes
    // on at the press) and stays on the keys.
    TAP_END: SCOOT_END + d.finale * 0.6,
    BOARD_START, BOARD_END,
    SPOT: SCOOT_END + d.finale * 0.4, SPOT_DURATION: d.finale * 0.6,
    LAPTOP_TYPE_START: SCOOT_END + d.finale * 0.4, LAPTOP_TYPE_END: END,
    WALK_CADENCE: d.walkCadence,
    END,
  }
}
const DESKTOP = schedule('desktop')
const STACKED = schedule('stacked')

const DESKTOP_QUERY = '(min-width: 1024px) and (min-height: 600px)'
const pickSchedule = () =>
  (typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches ? DESKTOP : STACKED)

// Live schedule. Consumers read T.X; it is re-pointed (in place) at the
// start of every play, so a resize between visits picks the right one.
export const T = { ...pickSchedule() }

// The DOM subscribes to a coarse "step" index, not raw time.
const STEP_NAMES = ['BOARD', 'SPOT', 'END']
const stepTime = (name) => (name === 'BOARD' ? T.BOARD_START : T[name])
export const STEP = Object.fromEntries(STEP_NAMES.map((name, i) => [name, i + 1]))
const stepFor = (t) => STEP_NAMES.filter((name) => t >= stepTime(name)).length

const SESSION_KEY = 'jeeni-intro-played'

const listeners = new Set()
// Called the moment the 3D scene publishes her hand, inside its own frame, so
// the board can move in that same frame instead of one behind.
const handListeners = new Set()
const state = {
  t: 0,
  status: 'idle', // idle | playing | done
  instant: false, // final state reached with no animation (skip / reduced motion)
  quick: false,   // final state reached with a short fade (seen this session)
  // Published by the 3D scene every frame (hero px): `x` = where the board's
  // handle should be, `y` = her hand height, `handleY` = the handle's fixed
  // height on screen, `stamp` = when (so a stalled scene can be detected).
  hand: { x: 0, y: 0, handleY: 0, stamp: 0, valid: false },
  // Where the caption's leader line starts: a point up and to the right of
  // her head, projected to canvas px by the 3D scene every frame.
  captionAnchor: { x: 0, y: 0, stamp: 0, valid: false },
}
let snapshot = { status: 'idle', step: 0, instant: false, quick: false, layout: T.layout }
let raf = 0
let last = 0

function publish() {
  const step = stepFor(state.t)
  if (
    snapshot.status !== state.status ||
    snapshot.step !== step ||
    snapshot.instant !== state.instant ||
    snapshot.quick !== state.quick ||
    snapshot.layout !== T.layout
  ) {
    snapshot = { status: state.status, step, instant: state.instant, quick: state.quick, layout: T.layout }
    listeners.forEach((fn) => fn())
  }
}

function stopTicker() {
  if (raf) cancelAnimationFrame(raf)
  raf = 0
}

function loop(now) {
  // Clamp the step so a hitch (lazy chunk, tab switch) can't jump the
  // sequence forward by a whole phase -- but keep real time down to 4fps.
  const dt = Math.min(0.25, (now - last) / 1000)
  last = now
  state.t = Math.min(T.END, state.t + dt)
  if (state.t >= T.END) {
    state.status = 'done'
    raf = 0
  } else {
    raf = requestAnimationFrame(loop)
  }
  publish()
}

function play() {
  stopTicker()
  Object.assign(T, pickSchedule())
  state.t = 0
  state.status = 'playing'
  state.instant = false
  state.quick = false
  last = window.performance.now()
  raf = requestAnimationFrame(loop)
  publish()
}

export const timeline = {
  getT: () => state.t,
  getStatus: () => state.status,
  // True when the end was reached by skipping / a returning visit / reduced
  // motion (no animation), false after a full play-through.
  jumpedToEnd: () => state.status === 'done' && (state.instant || state.quick),
  hand: state.hand,
  captionAnchor: state.captionAnchor,
  setCaptionAnchor(x, y) {
    state.captionAnchor.x = x
    state.captionAnchor.y = y
    state.captionAnchor.stamp = window.performance.now()
    state.captionAnchor.valid = true
  },

  // First play of the session. No-op once started or finished, so the 3D
  // scene and the fallback kick in Hero.jsx can both call it.
  start() {
    if (state.status !== 'idle') return
    try { window.sessionStorage.setItem(SESSION_KEY, '1') } catch { /* private mode */ }
    play()
  },
  // Jump to the finished state. `quick` = returning visitor (short fade).
  finish({ quick = false } = {}) {
    stopTicker()
    Object.assign(T, pickSchedule())
    state.t = T.END
    state.status = 'done'
    state.instant = !quick
    state.quick = quick
    publish()
  },
  skip() {
    if (state.status === 'playing') timeline.finish()
  },
  replay() {
    play()
  },
  hasPlayedThisSession() {
    try { return window.sessionStorage.getItem(SESSION_KEY) === '1' } catch { return false }
  },
  setHand(x, y, handleY) {
    state.hand.x = x
    state.hand.y = y
    state.hand.handleY = handleY
    state.hand.stamp = window.performance.now()
    state.hand.valid = true
    handListeners.forEach((fn) => fn())
  },
  onHand(fn) {
    handListeners.add(fn)
    return () => handListeners.delete(fn)
  },
  subscribe(fn) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
  getSnapshot: () => snapshot,
}

// Dev aid: `?introT=2.3` freezes the sequence at that second so a given
// moment can be screenshotted / tuned. Ignored in production builds.
if (import.meta.env.DEV && typeof window !== 'undefined') {
  window.__introTimeline = timeline
  const frozen = new window.URLSearchParams(window.location.search).get('introT')
  if (frozen !== null) {
    const freeze = () => {
      stopTicker()
      Object.assign(T, pickSchedule())
      state.t = Math.max(0, Math.min(T.END, Number(frozen) || 0))
      state.status = state.t >= T.END ? 'done' : 'playing'
      state.instant = false
      state.quick = false
      publish()
    }
    timeline.start = freeze
    timeline.finish = freeze
    timeline.replay = freeze
    timeline.skip = () => {}
    timeline.hasPlayedThisSession = () => false
  }
}

export function useIntro() {
  return useSyncExternalStore(timeline.subscribe, timeline.getSnapshot, timeline.getSnapshot)
}

// Progress 0..1 of `t` through [a, b].
export const between = (t, a, b) => (b <= a ? (t >= b ? 1 : 0) : Math.max(0, Math.min(1, (t - a) / (b - a))))
// Progress 0..1 of `t` through [a, a + duration].
export const progress = (t, a, duration) => between(t, a, a + duration)
