import React from 'react'
import { motion } from 'framer-motion'

// Rose highlighter that "draws" under the lower ~40% of the text once.
//
// Default: triggered when scrolled into view. Controlled: pass `active`
// (boolean) and the bar follows it instead -- used by the hero projector
// screen, whose reveal is driven by the shared intro timeline rather than
// by scroll. `instant` snaps to the end state with no animation.
//
// Framer Motion's reducedMotion="user" config (set globally in App.jsx)
// makes this jump to its end state instantly for users with that OS
// preference.
export default function Highlight({ children, className = '', active, instant = false, duration = 1.2 }) {
  const controlled = typeof active === 'boolean'
  const transition = { duration: instant ? 0 : duration, ease: 'easeOut' }

  return (
    <span className="relative inline-block whitespace-nowrap">
      <motion.span
        initial={{ scaleX: 0 }}
        {...(controlled
          ? { animate: { scaleX: active ? 1 : 0 } }
          : { whileInView: { scaleX: 1 }, viewport: { once: true, amount: 0.9 } })}
        transition={transition}
        className="absolute left-0 bottom-0 h-[40%] w-full bg-dusty"
        style={{ transformOrigin: '0% 50%' }}
        aria-hidden="true"
      />
      <span className={`relative ${className}`}>{children}</span>
    </span>
  )
}
