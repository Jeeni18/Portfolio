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
      className="card p-7"
    >
      <div className="flex items-center gap-3 mb-5">
        <Users size={15} strokeWidth={1.5} className="text-wine" aria-hidden="true" />
        <span className="font-mono text-[11px] uppercase tracking-wider text-rose">{role.org} · {role.period}</span>
      </div>
      <h3 className="font-display text-ink text-2xl leading-snug mb-3">{role.role}</h3>
      <p className="font-body text-ink/80 text-[15px] leading-relaxed">{role.description}</p>
    </motion.div>
  )
}

export default function Leadership() {
  return (
    <SectionWrapper id="leadership">
      <SectionTitle apiLabel="GET /leadership" index="07" title="Leadership & *Community*" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {leadership.items.map((role, i) => (
          <LeadershipCard key={role.role + role.org} role={role} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
