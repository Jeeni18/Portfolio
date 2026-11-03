import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Users } from 'lucide-react'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import { leadership } from '../data/content'

function LeadershipCard({ role, index }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card p-6"
    >
      <div className="flex items-start gap-4">
        <div className="mt-0.5 w-8 h-8 rounded-sm bg-lilac flex items-center justify-center flex-shrink-0">
          <Users size={15} className="text-plum" />
        </div>
        <div>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1">
            <h3 className="font-display text-plum text-lg">{role.role}</h3>
            <span className="font-mono text-xs text-plum/60">{role.org} · {role.period}</span>
          </div>
          <p className="font-body text-plum/80 text-sm leading-relaxed">{role.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Leadership() {
  return (
    <SectionWrapper id="leadership">
      <SectionTitle apiLabel="GET /leadership" title="Leadership & Community" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {leadership.items.map((role, i) => (
          <LeadershipCard key={role.role + role.org} role={role} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
