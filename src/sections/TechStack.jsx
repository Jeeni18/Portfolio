import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check } from 'lucide-react'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import { techStack } from '../data/content'
import { SquiggleUnderline } from '../components/Doodles'

function SpecimenColumn({ cat, index }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <h3 className="font-hand text-2xl text-plum leading-none">{cat.name}</h3>
      <SquiggleUnderline className="w-24 h-3 mb-4 mt-1.5" delay={index * 0.08 + 0.3} />
      <ul className="space-y-2.5">
        {cat.skills.map((skill) => (
          <li key={skill.name} className="flex items-center gap-2.5">
            <span className="w-4 h-4 rounded-[3px] border-2 border-plum flex items-center justify-center flex-shrink-0">
              <Check size={10} strokeWidth={3} className="text-plum" aria-hidden="true" />
            </span>
            <span className="font-mono text-[13px] text-plum/85">{skill.name}</span>
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
        apiLabel="GET /skills"
        title="Tech Stack"
        subtitle={techStack.sectionSubtitle}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">
        {techStack.categories.map((cat, i) => (
          <SpecimenColumn key={cat.name} cat={cat} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
