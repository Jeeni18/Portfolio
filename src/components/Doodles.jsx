import React from 'react'
import { motion } from 'framer-motion'

// Small hand-drawn-style SVG doodles. All decorative (aria-hidden),
// all draw themselves in once via pathLength when scrolled into view.
// Framer Motion's global reducedMotion="user" config (set in App.jsx)
// makes this jump to the finished drawing instantly for users with
// that OS preference, instead of animating.

const drawIn = (delay = 0, duration = 0.8) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, amount: 0.6 },
  transition: { duration, delay, ease: 'easeInOut' },
})

export function CurvedArrow({ className = '', color = 'var(--plum)', delay = 0 }) {
  return (
    <svg viewBox="0 0 120 60" className={className} fill="none" aria-hidden="true">
      <motion.path
        d="M6,12 C 18,46 58,52 96,28"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        {...drawIn(delay)}
      />
      <motion.path
        d="M80,19 L98,28 L84,42"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...drawIn(delay + 0.65, 0.25)}
      />
    </svg>
  )
}

export function ScribbleCircle({ className = '', color = 'var(--plum)', delay = 0 }) {
  return (
    <svg viewBox="0 0 120 56" className={className} fill="none" aria-hidden="true">
      <motion.path
        d="M58,4 C 28,1 4,15 5,28 C 6,41 32,50 60,49 C 92,48 116,36 112,20 C 109,8 80,2 60,6"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        {...drawIn(delay, 0.9)}
      />
    </svg>
  )
}

export function Sparkle({ className = '', color = 'var(--plum)', delay = 0 }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <motion.path
        d="M12,1 C 12.8,7.5 14.5,9.2 21,10 C 14.5,10.8 12.8,12.5 12,19 C 11.2,12.5 9.5,10.8 3,10 C 9.5,9.2 11.2,7.5 12,1 Z"
        fill={color}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4, delay, ease: 'backOut' }}
        style={{ transformOrigin: '12px 10px' }}
      />
    </svg>
  )
}

export function SquiggleUnderline({ className = '', color = 'var(--plum)', delay = 0 }) {
  return (
    <svg viewBox="0 0 100 12" className={className} fill="none" preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d="M2,6 Q 10,0 18,6 T 34,6 T 50,6 T 66,6 T 82,6 T 98,6"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        {...drawIn(delay, 0.7)}
      />
    </svg>
  )
}

export function TimelineDot({ className = '', color = 'var(--plum)', delay = 0 }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <motion.path
        d="M12,3 C 18,2.5 21,7 20.5,12 C 20,18 15,21 10,20.5 C 4.5,20 2,15 3,10 C 3.8,5.5 7.5,3.3 12,3.2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        {...drawIn(delay, 0.5)}
      />
      <motion.circle
        cx="12" cy="12" r="4"
        fill={color}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.3, delay: delay + 0.45 }}
      />
    </svg>
  )
}

export function HandDrawnBracket({ className = '', color = 'var(--plum)', delay = 0, flip = false }) {
  return (
    <svg
      viewBox="0 0 24 100"
      className={className}
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <motion.path
        d="M20,3 C 6,3 10,22 8,32 C 6,42 1,46 1,50 C 1,54 6,58 8,68 C 10,78 6,97 20,97"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        {...drawIn(delay, 0.9)}
      />
    </svg>
  )
}
