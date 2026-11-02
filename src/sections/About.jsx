import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import { about } from '../data/content'

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <SectionWrapper id="about">
      <div ref={ref} className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left: Text */}
        <div>
          <SectionTitle title={about.sectionTitle} />

          <div className="space-y-5 font-body text-ink-400 leading-relaxed text-[15px]">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* Right: Highlight grid */}
        <div className="grid grid-cols-2 gap-3 md:mt-[4.25rem]">
          {about.highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="card rounded-md p-5"
            >
              <div className="w-8 h-8 rounded-sm bg-[var(--accent-soft)] border border-ink-700 flex items-center justify-center mb-3">
                <h.icon size={15} className="text-rust-500" />
              </div>
              <p className="font-display font-semibold text-ink-100 text-base">{h.label}</p>
              <p className="font-body text-ink-500 text-xs mt-1 leading-snug">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
