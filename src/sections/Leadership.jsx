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
      className="relative card overflow-hidden"
      style={{ borderRadius: '18px 18px 10px 10px' }}
    >
      {/* Punched hole */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-[9px] w-[18px] h-[18px] rounded-full bg-cream border-2 border-plum z-10"
        aria-hidden="true"
      />

      <div className="h-7 bg-rose mt-2.5" aria-hidden="true" />

      <div className="p-6 pt-5">
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
      </div>
    </motion.div>
  )
}

export default function Leadership() {
  return (
    <SectionWrapper id="leadership">
      <SectionTitle apiLabel="GET /leadership" title="Leadership & Community" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {leadership.items.map((role, i) => (
          <LeadershipCard key={role.role + role.org} role={role} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
