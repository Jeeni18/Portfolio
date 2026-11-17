import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import { techStack } from '../data/content'

function SpecimenColumn({ cat, index }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="border-t border-ink/15 pt-5"
    >
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="font-display text-xl text-ink leading-none">{cat.name}</h3>
        <span className="font-mono text-[10px] text-rose tracking-wider">{String(cat.skills.length).padStart(2, '0')}</span>
      </div>
      <ul className="space-y-2">
        {cat.skills.map((skill) => (
          <li key={skill.name} className="font-mono text-[13px] text-ink/75">
            {skill.name}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function TechStack() {
  return (
    <SectionWrapper id="techstack">
      <SectionTitle
        index="02"
        apiLabel="GET /skills"
        title="Tech *Stack*"
        subtitle={techStack.sectionSubtitle}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-12">
        {techStack.categories.map((cat, i) => (
          <SpecimenColumn key={cat.name} cat={cat} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
