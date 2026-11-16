import { useSyncExternalStore } from 'react'

// One timeline for the whole hero intro. It owns its own clock (a rAF
// ticker), and everything else -- the 3D rig in HeroScene, the DOM
// projector screen, the beam and the laptop screen texture -- just reads
// `t` from here, so character motion and text reveal can never drift
// apart. All times are seconds from the start of the sequence.
//
// Phase map (desktop):
//   0.00  walk in                     (rig)
//   0.90  arrive / settle             (rig)
//   1.10  wave                        (rig)
//   1.70  sit down                    (rig)
//   2.10  tap the laptop              (rig)       ─┐ roll starts on the
//   2.20  screen rolls down           (DOM)        ┘ tap-down moment
//   2.45  beam fades in, screen lit   (DOM)
//   2.55  "Hello, I'm"                (DOM)
//   2.75  "Jeeni Shrestha."           (DOM)
//   2.95  role line types out         (DOM + laptop texture)
//   3.50  bio line                    (DOM)
//   3.65  marker highlight draws      (DOM)
//   4.00  buttons + sticker pop in    (DOM)
//   4.50  end -> seated idle, cursor keeps blinking
export const T = {
  WALK_END: 0.9,
  ARRIVE_END: 1.1,
  WAVE_END: 1.7,
  SIT_END: 2.1,
  TAP_END: 2.4,
  ROLL_START: 2.2,
  ROLL_DURATION: 0.55,
  BEAM_START: 2.45,
  BEAM_DURATION: 0.45,
  LAPTOP_TYPE_START: 2.3,
  LAPTOP_TYPE_END: 4.2,
  HELLO: 2.55,
  NAME: 2.75,
  ROLE_START: 2.95,
  ROLE_END: 3.45,
  BIO: 3.5,
  MARK_START: 3.65,
  MARK_DURATION: 0.45,
  BUTTONS: 4.0,
  END: 4.5,
}

// The DOM doesn't need raw time; it subscribes to a coarse "step" index
// that increments as each reveal boundary is crossed. Order matters.
const STEP_TIMES = [
  ['ROLL', T.ROLL_START],
  ['BEAM', T.BEAM_START],
  ['HELLO', T.HELLO],
  ['NAME', T.NAME],
  ['ROLE', T.ROLE_START],
  ['BIO', T.BIO],
  ['MARK', T.MARK_START],
  ['BUTTONS', T.BUTTONS],
  ['END', T.END],
]
export const STEP = Object.fromEntries(STEP_TIMES.map(([name], i) => [name, i + 1]))
const stepFor = (t) => STEP_TIMES.filter(([, time]) => t >= time).length

const SESSION_KEY = 'jeeni-intro-played'

const listeners = new Set()
const state = {
  t: 0,
  status: 'idle', // idle | playing | done
  instant: false, // true when the final state was reached by skip / reduced motion / replayed session
  // Laptop screen centre in canvas CSS pixels, written by the 3D scene
  // each frame and read by the beam overlay. Kept out of React state so
  // the per-frame write doesn't re-render anything.
  laptopPx: { x: 0, y: 0, valid: false },
}
let snapshot = { status: 'idle', step: 0, instant: false }
let raf = 0
let last = 0

function publish() {
  const step = stepFor(state.t)
  if (snapshot.status !== state.status || snapshot.step !== step || snapshot.instant !== state.instant) {
    snapshot = { status: state.status, step, instant: state.instant }
    listeners.forEach((fn) => fn())
  }
}

function stopTicker() {
  if (raf) cancelAnimationFrame(raf)
  raf = 0
}

function loop(now) {
  // Clamp the step so a hitch (lazy chunk, tab switch) can't jump the
  // sequence forward by a whole phase.
  const dt = Math.min(0.05, (now - last) / 1000)
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
  state.t = 0
  state.status = 'playing'
  state.instant = false
  last = window.performance.now()
  raf = requestAnimationFrame(loop)
  publish()
}

export const timeline = {
  getT: () => state.t,
  getStatus: () => state.status,
  laptopPx: state.laptopPx,

  // First play of the session. No-op once the sequence has been started
  // or finished, so the 3D scene and the no-WebGL fallback can both call it.
  start() {
    if (state.status !== 'idle') return
    try { window.sessionStorage.setItem(SESSION_KEY, '1') } catch { /* private mode */ }
    play()
  },
  // Jump straight to the finished state (reduced motion, already seen
  // this session, or user skip).
  finish() {
    stopTicker()
    state.t = T.END
    state.status = 'done'
    state.instant = true
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
  setLaptopPx(x, y) {
    state.laptopPx.x = x
    state.laptopPx.y = y
    state.laptopPx.valid = true
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
  const frozen = new window.URLSearchParams(window.location.search).get('introT')
  if (frozen !== null) {
    const freezeAt = Math.max(0, Math.min(T.END, Number(frozen) || 0))
    const freeze = () => {
      stopTicker()
      state.t = freezeAt
      state.status = 'playing'
      state.instant = false
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

// Progress 0..1 of `t` through [a, a + duration].
export const progress = (t, a, duration) => Math.max(0, Math.min(1, (t - a) / duration))
