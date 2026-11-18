import { stackProgress } from './useStickyStack'

// When scroll animations play (every section except the hero): per
// element, naturally as the visitor scrolls -- and again each time they
// come back to it.
//
// - Each animated group (a board, a project row, the workflow chain, the
//   "4" box, the About highlight, the open project's image ...) has its
//   own trigger: it plays as soon as its top edge is about 15% up from the
//   bottom of the screen (IntersectionObserver, threshold 0, rootMargin
//   0px 0px -15% 0px). No extra waiting.
// - About: not before it has covered 60% of the hero in the sticky stack
//   (so it is already playing as it settles into place). Without the
//   sticky stack (small phones) the normal rule applies.
// - Replays: once a group has left the screen completely (fully above or
//   below it -- a second observer, no margin), it is quietly reset to its
//   starting state, off-screen; when it comes back it plays again, in
//   either scroll direction. Never reset while any part of it is visible.
// - Already on screen at load / after a nav jump: plays straight away.
// - Inside a group: a board with several rows plays row by row, a single
//   row blade by blade, 60-80ms apart, the whole group within about 1s.
// - Reduced motion: final states at once, no replays.
const ROOT_MARGIN = '0px 0px -15% 0px'
const ZONE = 0.85          // the same line, for the scroll backup check
const ABOUT_AT = 0.6       // sticky-stack progress at which About starts
const STEP_MIN = 60
const STEP_MAX = 80
const GROUP_SPAN_MS = 450  // last item starts by then (+0.55s wipe ~ 1s)
const MAX_BANDS = 8        // more rows than this (tall boards on phones): neighbouring rows play together

const groups = new Map()   // group element -> { el, items: [], played, section }
const openSections = new WeakSet()
let zoneIO = null
let viewIO = null
let listening = false
let checkQueued = false

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const isAbout = (g) => g.section && g.section.id === 'about'
const aboutReady = () => !stackProgress.enabled() || stackProgress.get() >= ABOUT_AT

// Delay per item: row by row when the group has several rows, else item by
// item. At most MAX_BANDS steps, so the group stays within about 1s.
function delays(items) {
  const tops = items.map((it) => Math.round(it.el.getBoundingClientRect().top))
  const rows = [...new Set(tops)].sort((a, b) => a - b)
  const multi = rows.length > 1
  const units = multi ? rows.length : items.length
  const bands = Math.min(units, MAX_BANDS)
  const band = (i) => (units > MAX_BANDS ? Math.floor((i * MAX_BANDS) / units) : i)
  const step = bands > 1 ? Math.max(STEP_MIN, Math.min(STEP_MAX, GROUP_SPAN_MS / (bands - 1))) : 0
  if (multi) return tops.map((t) => Math.round(band(rows.indexOf(t)) * step))
  // one row: left to right
  const order = items.map((it, i) => [it.el.getBoundingClientRect().left, i]).sort((a, b) => a[0] - b[0]).map((x) => x[1])
  const d = new Array(items.length)
  order.forEach((idx, k) => { d[idx] = Math.round(band(k) * step) })
  return d
}

const live = (g) => g.items.filter((it) => !it.off)

function play(g) {
  g.played = true
  if (g.section) openSections.add(g.section)
  const items = live(g)
  const d = delays(items)
  items.forEach((it, i) => it.run(d[i], false))
}

function reset(g) {
  g.played = false
  live(g).forEach((it) => it.reset && it.reset())
}

// Decide for one group from where it is now.
function evaluate(g) {
  if (!g.el.isConnected) { forget(g); return }
  const r = g.el.getBoundingClientRect()
  const vh = window.innerHeight
  if (r.bottom <= 0 || r.top >= vh) {               // completely off-screen
    if (g.played) reset(g)
    return
  }
  if (g.played) return
  if (r.top >= vh * ZONE) return                     // only peeking in at the bottom
  if (isAbout(g) && !aboutReady()) return            // waits for the sticky stack
  play(g)
}

function forget(g) {
  groups.delete(g.el)
  zoneIO?.unobserve(g.el)
  viewIO?.unobserve(g.el)
}

function check() {
  checkQueued = false
  groups.forEach((g) => evaluate(g))
}
const scheduleCheck = () => { if (!checkQueued) { checkQueued = true; requestAnimationFrame(check) } }

function ensureWatching() {
  if (zoneIO || !('IntersectionObserver' in window)) return
  const onEntries = (entries) => entries.forEach((e) => { const g = groups.get(e.target); if (g) evaluate(g) })
  // plays: the top edge 15% up from the bottom of the screen
  zoneIO = new window.IntersectionObserver(onEntries, { rootMargin: ROOT_MARGIN, threshold: 0 })
  // resets: completely out of the screen
  viewIO = new window.IntersectionObserver(onEntries, { threshold: 0 })
  if (!listening) {
    listening = true
    // backup for very fast scrolling, and About's sticky-stack start
    window.addEventListener('scroll', scheduleCheck, { passive: true })
    window.addEventListener('resize', scheduleCheck)
    stackProgress.subscribe(scheduleCheck)
  }
}

// Register an animated element. `run(delayMs, instant)` plays it after the
// delay (instant: show the final state at once); `reset()` puts it back to
// its starting state (called off-screen, before a replay). `group`: the
// element whose position triggers it (default: itself). Reduced motion:
// runs once, at once, and never resets. Returns an unregister function.
export function whenRevealed(el, run, { group = el, reset: resetItem = null } = {}) {
  if (!el) return () => {}
  const section = (group || el).closest('section.reveal')
  if (reduced() || !('IntersectionObserver' in window)) { run(0, true); if (section) openSections.add(section); return () => {} }
  ensureWatching()
  let g = groups.get(group)
  if (!g) {
    g = { el: group, items: [], played: false, section }
    groups.set(group, g)
    zoneIO.observe(group)
    viewIO.observe(group)
  }
  const item = { el, run, reset: resetItem, off: false }
  g.items.push(item)
  // joining a group that is already playing / on screen: just show it
  if (g.played) run(0, true)
  scheduleCheck()
  return () => {
    item.off = true
    if (!live(g).length) forget(g)
  }
}

// Has anything in this section played yet?
export function isSectionOpen(sectionEl) {
  return !!sectionEl && openSections.has(sectionEl)
}
