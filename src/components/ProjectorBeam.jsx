import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { T, timeline } from '../hooks/introTimeline'

// Soft dusty-pink light cone from the laptop (inside the 3D canvas) fanning out
// to the near edge of the DOM projector screen. The laptop's pixel position is
// published by the scene every frame; the screen corners come from the
// DOM, and everything is expressed in the hero container's coordinates.
// Desktop only -- on mobile the screen stacks above the character and
// a beam wouldn't make sense.
export default function ProjectorBeam({ containerRef, canvasBoxRef, surfaceRef, visible, instant, idle }) {
  const [geom, setGeom] = useState(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    let raf = 0
    let lastKey = ''

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const c = containerRef.current
      const box = canvasBoxRef.current
      const s = surfaceRef.current
      const lp = timeline.laptopPx
      if (!c || !box || !s || !lp.valid) return

      const cr = c.getBoundingClientRect()
      const br = box.getBoundingClientRect()
      const sr = s.getBoundingClientRect()
      const next = {
        w: cr.width,
        h: cr.height,
        sx: br.left - cr.left + lp.x,
        sy: br.top - cr.top + lp.y,
        x: sr.right - cr.left,
        y1: sr.top - cr.top,
        y2: sr.bottom - cr.top,
      }
      const key = Object.values(next).map((v) => Math.round(v)).join(',')
      if (key !== lastKey) {
        lastKey = key
        setGeom(next)
      }
    }

    const sync = () => {
      cancelAnimationFrame(raf)
      if (mq.matches) tick()
      else setGeom(null)
    }
    sync()
    mq.addEventListener('change', sync)
    return () => {
      cancelAnimationFrame(raf)
      mq.removeEventListener('change', sync)
    }
  }, [containerRef, canvasBoxRef, surfaceRef])

  if (!geom) return null
  const { w, h, sx, sy, x, y1, y2 } = geom

  return (
    <svg
      className="absolute inset-0 z-[5] w-full h-full pointer-events-none"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-beam-grad" gradientUnits="userSpaceOnUse" x1={sx} y1={sy} x2={x} y2={(y1 + y2) / 2}>
          <stop offset="0" stopColor="#D5B7B8" stopOpacity="0.3" />
          <stop offset="0.6" stopColor="#D5B7B8" stopOpacity="0.12" />
          <stop offset="1" stopColor="#D5B7B8" stopOpacity="0.06" />
        </linearGradient>
        <filter id="hero-beam-blur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <motion.g
        initial={false}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: instant ? 0 : T.BEAM_DURATION, ease: 'easeOut' }}
        className={idle ? 'beam-flicker' : ''}
      >
        <polygon points={`${sx},${sy} ${x},${y1} ${x},${y2}`} fill="url(#hero-beam-grad)" filter="url(#hero-beam-blur)" />
      </motion.g>
    </svg>
  )
}
