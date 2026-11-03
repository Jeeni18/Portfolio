import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy } from 'lucide-react'
import { footer } from '../data/content'

export default function CopyEmailButton({ className = '' }) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(footer.email)
      setCopied(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${footer.email}`
    }
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <button type="button" onClick={handleCopy} className="btn-secondary">
        <Copy size={14} />
        Copy my email
      </button>

      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7, rotate: -8, y: 4 }}
            animate={{ opacity: 1, scale: 1, rotate: -6, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 font-hand text-2xl text-plum whitespace-nowrap pointer-events-none"
          >
            copied!
          </motion.span>
        )}
      </AnimatePresence>

      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Email copied to clipboard' : ''}
      </span>
    </div>
  )
}
