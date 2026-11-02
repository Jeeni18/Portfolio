import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Award } from 'lucide-react'

export default function CertModal({ cert, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg bg-ink-900 border border-ink-700 rounded-md overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 bg-ink-800 hover:bg-ink-700 border border-ink-700 flex items-center justify-center text-ink-400 hover:text-ink-100 transition-all"
          >
            <X size={14} />
          </button>

          <div className="relative h-56 bg-ink-950 flex items-center justify-center">
            {cert.image ? (
              <img src={cert.image} alt={cert.title} className="w-full h-full object-contain" />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center text-3xl font-display font-bold text-ink-100 border border-ink-700 bg-ink-800">
                {cert.initials}
              </div>
            )}
          </div>

          <div className="p-7">
            <div className="flex items-center gap-2 mb-1">
              <Award size={14} className="text-rust-500" />
              <p className="font-mono text-[10px] text-rust-500 tracking-wide uppercase">
                {cert.org} · {cert.year}
              </p>
            </div>
            <h2 className="font-display font-semibold text-xl text-ink-100 mt-1 mb-3">
              {cert.title}
            </h2>
            <p className="font-body text-ink-400 text-sm leading-relaxed">
              {cert.description}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
