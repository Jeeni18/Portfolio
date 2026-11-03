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
            className="font-mono text-xs text-plum whitespace-nowrap bg-paper border-2 border-plum px-3 py-1.5"
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
        className="w-12 h-12 rounded-full bg-paper border-2 border-plum hover:bg-plum hover:text-cream flex items-center justify-center text-plum transition-all duration-200"
      >
        <MessageCircle size={18} />
      </button>
    </div>
  )
}
