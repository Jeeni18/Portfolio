import React from 'react'
import { motion } from 'framer-motion'

// Rose highlighter that "draws" under the lower ~40% of the text once,
// when scrolled into view. Framer Motion's reducedMotion="user" config
// (set globally in App.jsx) makes this jump to its end state instantly
// instead of animating, for users with that OS preference.
export default function Highlight({ children, className = '' }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.9 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute left-0 bottom-0 h-[40%] w-full bg-rose"
        style={{ transformOrigin: '0% 50%' }}
        aria-hidden="true"
      />
      <span className={`relative ${className}`}>{children}</span>
    </span>
  )
}
