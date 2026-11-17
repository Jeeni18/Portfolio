import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const TONES = {
  base: '',                       // deep burgundy page
  light: 'tone-light bg-cream',   // architectural cream panel
}

// `tone="light"` switches the section onto a cream ground; all semantic colours
// inside (ink, cream, paper, rose, dusty, wine) re-map via CSS variables.
export default function SectionWrapper({ children, id, className = '', tone = 'base' }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id={id} className={`relative ${TONES[tone] || ''}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`section-padding max-w-5xl mx-auto ${className}`}
      >
        {children}
      </motion.div>
    </section>
  )
}

// Editorial section heading: index number + endpoint label on a hairline,
// then a large serif title. Wrap one word of the title in `*...*` to set
// it in italic, e.g. "*Selected* Projects".
export function SectionTitle({ title, subtitle, apiLabel, index }) {
  const parts = title.split(/(\*[^*]+\*)/).filter(Boolean)

  return (
    <div className="mb-14">
      <div className="flex items-center gap-4 mb-6" aria-hidden="true">
        {index && <span className="font-mono text-[11px] text-rose tracking-[0.16em]">{index}</span>}
        <span className="h-px flex-1 bg-ink/15" />
        {apiLabel && <span className="api-label">{apiLabel}</span>}
      </div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-10">
        <h2 className="font-display text-ink leading-[0.95] tracking-tight" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4rem)' }}>
          {parts.map((p, i) =>
            p.startsWith('*') ? <em key={i} className="italic text-wine">{p.slice(1, -1)}</em> : <React.Fragment key={i}>{p}</React.Fragment>
          )}
        </h2>
        {subtitle && (
          <p className="font-body text-ink/70 text-[15px] max-w-xs md:text-right leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
