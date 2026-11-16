import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function FloatingContact({ onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="fixed bottom-7 right-7 z-50 flex items-center gap-3">
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.15 }}
            className="font-mono text-[11px] uppercase tracking-wider text-ink whitespace-nowrap bg-paper border border-ink/10 shadow-soft rounded-[2px] px-3 py-1.5"
          >
            Contact
          </motion.span>
        )}
      </AnimatePresence>

      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
        aria-label="Open contact form"
        className="w-12 h-12 rounded-full bg-wine-rich text-bone shadow-soft border border-bone/30 hover:bg-wine-deep flex items-center justify-center transition-colors duration-200"
      >
        <MessageCircle size={18} strokeWidth={1.5} />
      </button>
    </div>
  )
}
