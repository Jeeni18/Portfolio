import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function SectionWrapper({ children, id, className = '' }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`section-padding max-w-5xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  )
}

export function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-12 flex items-end justify-between gap-6 border-b border-ink-700 pb-5">
      <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink-100">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body text-ink-500 text-sm max-w-xs text-right leading-relaxed hidden sm:block">
          {subtitle}
        </p>
      )}
    </div>
  )
}
