import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import cplus from '../assets/techStack/c++.png'
import python from '../assets/techStack/python.png'
import c from '../assets/techStack/c.png'
import java from '../assets/techStack/java.png'

const categories = [
  {
    name: 'Programming',
    skills: [
      { name: 'Python', img: python },
      { name: 'C', img: c },
      { name: 'C++', img: cplus },
      { name: 'Java', img: java },
    ]
  },
  {
    name: 'AI / Data',
    skills: [
      { name: 'Pandas', icon: '🐼' },
      { name: 'NumPy', icon: '🔢' },
      { name: 'Scikit-learn', icon: '🤖' },
    ]
  },
  {
    name: 'Web',
    skills: [
      { name: 'React', icon: '⚛️' },
      { name: 'HTML', icon: '🌐' },
      { name: 'CSS', icon: '🎨' },
      { name: 'Tailwind CSS', icon: '💨' },
    ]
  },
  {
    name: 'Tools',
    skills: [
      { name: 'Git', icon: '🌿' },
      { name: 'GitHub', icon: '🐙' },
    ]
  },
]

function SkillPill({ skill, delay }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className="card rounded-md flex flex-col items-center gap-2 p-4"
    >
      {skill.img
        ? <img src={skill.img} alt={skill.name} className="w-7 h-7 object-contain" />
        : <span className="text-xl">{skill.icon}</span>
      }
      <span className="font-mono text-[11px] text-ink-400 text-center leading-tight">
        {skill.name}
      </span>
    </motion.div>
  )
}

export default function TechStack() {
  return (
    <SectionWrapper id="techstack">
      <SectionTitle
        title="Tech Stack"
        subtitle="Tools I reach for when something needs building."
      />

      <div className="space-y-9">
        {categories.map((cat, ci) => (
          <div key={cat.name}>
            <p className="font-mono text-[11px] text-ink-500 tracking-[0.15em] uppercase mb-4">
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
