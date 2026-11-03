import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import { experience, translations } from '../data/content'
import { useLanguage } from '../hooks/useLanguage'
import { TimelineDot } from '../components/Doodles'

function Period({ value }) {
  const isTodo = value.includes('[TODO')
  if (!isTodo) {
    return <span className="font-mono text-xs text-plum/70">{value}</span>
  }
  return <span className="tag border-dashed text-[11px]">{value}</span>
}

function ExperienceItem({ job, index }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const isCurrent = job.org.includes('Cloud Himalaya')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative grid grid-cols-[auto_auto_minmax(0,1fr)] gap-x-4 sm:gap-x-6"
    >
      <div className="w-20 sm:w-28 pt-3 text-right">
        <Period value={job.period} />
      </div>

      <div className="relative flex justify-center">
        <TimelineDot className="w-6 h-6 mt-1" delay={index * 0.1 + 0.2} />
        {index !== experience.items.length - 1 && (
          <div
            className="absolute top-8 bottom-[-2.5rem] left-1/2 -translate-x-1/2 w-0 border-l-2 border-dashed"
            style={{ borderColor: 'rgba(73,55,68,0.4)' }}
            aria-hidden="true"
          />
        )}
      </div>

      <div className="relative card p-6" style={{ boxShadow: '5px 5px 0 var(--rose, #EBC4D5)' }}>
        {isCurrent && (
          <span
            className="hidden sm:block absolute -top-6 right-2 font-hand text-lg text-plum/80 rotate-2"
            aria-hidden="true"
          >
            ← current!
          </span>
        )}
        <div className="mb-1">
          <h3 className="font-display text-plum text-xl">
            {job.role} <span className="text-plum/60 font-body text-base">— {job.org}</span>
          </h3>
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
