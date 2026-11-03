// One-off diagnostic tool (not part of the build). Uses Node's native
// WebSocket + the Chrome DevTools Protocol to screenshot a page after
// a real wall-clock settle delay, avoiding --virtual-time-budget's
// animation-timing artifacts.
//
// Single viewport shot:
//   node scripts/cdp-screenshot.mjs <url> <width> <height> <delayMs> <outPath>
// Scrolled tile (keeps the real viewport size -- doesn't resize the
// viewport, which would break 100vh/min-h-screen sections):
//   node scripts/cdp-screenshot.mjs <url> <width> <height> <delayMs> <outPath> scroll <scrollY>
import { writeFileSync } from 'fs'

const [, , url, widthStr, heightStr, delayStr, outPath, mode, scrollYStr] = process.argv
const width = parseInt(widthStr, 10)
const height = parseInt(heightStr, 10)
const delayMs = parseInt(delayStr, 10)

const CDP_PORT = 9333

const res = await fetch(`http://localhost:${CDP_PORT}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' })
const target = await res.json()
const ws = new WebSocket(target.webSocketDebuggerUrl)

let msgId = 1
const pending = new Map()

function send(method, params = {}) {
  const id = msgId++
  return new Promise((resolve) => {
    pending.set(id, resolve)
    ws.send(JSON.stringify({ id, method, params }))
  })
}

await new Promise((resolve) => { ws.onopen = resolve })

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data)
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg.result)
    pending.delete(msg.id)
  }
}

await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride', {
  width, height, deviceScaleFactor: 1, mobile: width < 500,
})

await send('Page.navigate', { url })
await new Promise((resolve) => {
  const check = setInterval(async () => {
    const r = await send('Runtime.evaluate', { expression: 'document.readyState' })
    if (r?.result?.value === 'complete') {
      clearInterval(check)
      resolve()
    }
  }, 200)
})

// Real wall-clock settle delay for CSS/JS animations
await new Promise((resolve) => setTimeout(resolve, delayMs))

if (mode === 'scroll') {
  const scrollY = parseInt(scrollYStr, 10)
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${scrollY})` })
  // let scroll-triggered (useInView) animations in newly-visible content finish
  await new Promise((resolve) => setTimeout(resolve, 900))
  const r = await send('Runtime.evaluate', { expression: 'document.documentElement.scrollHeight' })
  console.log('scrollHeight:', r?.result?.value)
}

const shot = await send('Page.captureScreenshot', { format: 'png' })
writeFileSync(outPath, Buffer.from(shot.data, 'base64'))
console.log('saved', outPath)

ws.close()
process.exit(0)
