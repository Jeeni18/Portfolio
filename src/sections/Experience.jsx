import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import { experience } from '../data/content'

function Period({ value }) {
  const isTodo = value.includes('[TODO')
  if (!isTodo) {
    return <span className="font-mono text-xs text-ink-500">{value}</span>
  }
  return (
    <span className="font-mono text-xs text-rust-400 border border-dashed border-rust-500/60 px-2 py-0.5 rounded-sm">
      {value}
    </span>
  )
}

function ExperienceItem({ job, index }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8"
    >
      <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-rust-500" />
      {index !== experience.items.length - 1 && (
        <div className="absolute left-[4.5px] top-5 bottom-[-2.5rem] w-px bg-ink-700" />
      )}

      <div className="card rounded-md p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
          <h3 className="font-display font-semibold text-ink-100 text-base">
            {job.role} <span className="text-ink-500 font-body font-normal">— {job.org}</span>
          </h3>
          <Period value={job.period} />
        </div>

        <div className="flex flex-wrap gap-1.5 my-4">
          {job.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-2.5 py-1 bg-ink-900 text-ink-500 border border-ink-800"
            >
              {t}
            </span>
          ))}
        </div>

        <ul className="space-y-1.5">
          {job.bullets.map((b, i) => (
            <li
              key={i}
              className="font-body text-ink-400 text-sm leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-ink-600"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionTitle title="Experience" />

      <div className="space-y-10">
        {experience.items.map((job, i) => (
          <ExperienceItem key={job.role + job.org} job={job} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
