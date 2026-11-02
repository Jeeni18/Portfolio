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
            className="font-mono text-[11px] text-ink-300 whitespace-nowrap bg-ink-900 border border-ink-700 px-3 py-1.5"
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
        className="w-12 h-12 bg-ink-900 border border-ink-700 hover:border-rust-500 flex items-center justify-center text-ink-300 hover:text-rust-500 transition-all duration-200"
      >
        <MessageCircle size={18} />
      </button>
    </div>
  )
}
