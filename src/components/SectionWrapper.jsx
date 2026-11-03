import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function SectionWrapper({ children, id, className = '', band }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={band === 'blush' ? 'bg-blush' : ''}
    >
      <div className={`section-padding max-w-5xl mx-auto ${className}`}>
        {children}
      </div>
    </motion.section>
  )
}

export function SectionTitle({ title, subtitle, apiLabel }) {
  return (
    <div className="mb-12">
      {apiLabel && (
        <p className="api-label mb-2" aria-hidden="true">{apiLabel}</p>
      )}
      <div className="flex items-end justify-between gap-6 border-b-2 border-plum pb-5">
        <h2 className="font-display text-3xl md:text-4xl text-plum">
          {title}
        </h2>
        {subtitle && (
          <p className="font-body text-plum/70 text-sm max-w-xs text-right leading-relaxed hidden sm:block">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}

export function Dhaka() {
  return <div className="dhaka" aria-hidden="true" />
}
