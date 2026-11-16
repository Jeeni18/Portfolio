import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import { about } from '../data/content'

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [lead, ...rest] = about.paragraphs

  return (
    <SectionWrapper id="about">
      <SectionTitle index="01" apiLabel="GET /about" title={about.sectionTitle} />

      <div className="grid md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-10 md:gap-16">
        <p className="font-display text-ink text-[1.65rem] md:text-[2rem] leading-[1.25]">
          {lead}
        </p>
        <div className="space-y-5 font-body text-ink/80 text-[16px] leading-[1.8] md:pt-2">
          {rest.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      {/* Fact strip */}
      <div ref={ref} className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
        {about.highlights.map((h, i) => (
          <motion.div
            key={h.label}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            className="border-t border-ink/15 pt-6"
          >
            <h.icon size={16} strokeWidth={1.5} className="text-wine mb-4" aria-hidden="true" />
            <p className="font-display text-ink text-xl leading-tight">{h.label}</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-rose mt-2 leading-snug">{h.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
