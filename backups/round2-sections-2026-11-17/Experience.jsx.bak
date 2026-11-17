import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import { experience } from '../data/content'

function Period({ value }) {
  const isTodo = value.includes('[TODO')
  if (!isTodo) {
    return <span className="font-mono text-[11px] uppercase tracking-wider text-rose">{value}</span>
  }
  return <span className="tag border-dashed">{value}</span>
}

function ExperienceItem({ job, index }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const isCurrent = job.org.includes('Cloud Himalaya')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="grid md:grid-cols-[180px_minmax(0,1fr)] gap-3 md:gap-10 border-t border-ink/15 pt-8"
    >
      <div className="flex md:flex-col items-center md:items-start gap-3">
        <Period value={job.period} />
        {isCurrent && (
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-wine">
            <span className="w-1.5 h-1.5 rounded-full bg-wine" aria-hidden="true" />
            Current
          </span>
        )}
      </div>

      <div>
        <h3 className="font-display text-ink text-2xl leading-snug">
          {job.role}
          <span className="block md:inline font-body text-ink/60 text-base md:ml-2">{job.org}</span>
        </h3>

        <ul className="mt-4 space-y-2">
          {job.bullets.map((b, i) => (
            <li
              key={i}
              className="font-body text-ink/80 text-[15px] leading-relaxed pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-dusty"
            >
              {b}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 mt-5">
          {job.tech.map((t) => (
            <span key={t} className="tag-chip">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionTitle index="03" apiLabel="GET /experience" title="Experience" />

      <div className="space-y-12">
        {experience.items.map((job, i) => (
          <ExperienceItem key={job.role + job.org} job={job} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
