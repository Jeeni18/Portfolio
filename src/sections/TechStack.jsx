import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import { techStack } from '../data/content'

function SkillPill({ skill, delay }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className="card flex flex-col items-center gap-2 p-4"
    >
      <skill.icon size={22} className="text-plum" aria-hidden="true" />
      <span className="font-mono text-[11px] text-plum/80 text-center leading-tight">
        {skill.name}
      </span>
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

      <div className="space-y-9">
        {techStack.categories.map((cat, ci) => (
          <div key={cat.name}>
            <p className="tag-chip mb-4">
              {cat.name}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {cat.skills.map((skill, si) => (
                <SkillPill
                  key={skill.name}
                  skill={skill}
                  delay={ci * 0.06 + si * 0.04}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
