import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import { experience, translations } from '../data/content'
import { useLanguage } from '../hooks/useLanguage'

function Period({ value }) {
  const isTodo = value.includes('[TODO')
  if (!isTodo) {
    return <span className="font-mono text-xs text-plum/70">{value}</span>
  }
  return (
    <span className="tag border-dashed">
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
      <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-plum border-2 border-cream" />
      {index !== experience.items.length - 1 && (
        <div className="absolute left-[5.5px] top-6 bottom-[-2.5rem] w-px bg-plum/30" />
      )}

      <div className="card p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
          <h3 className="font-display text-plum text-xl">
            {job.role} <span className="text-plum/60 font-body text-base">— {job.org}</span>
          </h3>
          <Period value={job.period} />
        </div>

        <div className="flex flex-wrap gap-1.5 my-4">
          {job.tech.map((t) => (
            <span key={t} className="tag-chip">
              {t}
            </span>
          ))}
        </div>

        <ul className="space-y-1.5">
          {job.bullets.map((b, i) => (
            <li
              key={i}
              className="font-body text-plum/80 text-[15px] leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-plum/40"
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
  const { lang } = useLanguage()

  return (
    <SectionWrapper id="experience" band="blush">
      <SectionTitle apiLabel="GET /experience" title={translations.sectionTitle.experience[lang]} />

      <div className="space-y-10">
        {experience.items.map((job, i) => (
          <ExperienceItem key={job.role + job.org} job={job} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
