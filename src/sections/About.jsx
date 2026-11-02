import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Brain, Trophy, Code2 } from 'lucide-react'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'

const highlights = [
  {
    icon: Code2,
    label: 'Full-Stack',
    desc: 'Website, CMS & database — my day job'
  },
  {
    icon: Brain,
    label: 'AI / ML',
    desc: 'CNNs, diagnosis models, emotion recognition'
  },
  {
    icon: Trophy,
    label: '7 wins',
    desc: 'Hackathons and ideathons since 2025'
  },
  {
    icon: GraduationCap,
    label: '2026',
    desc: 'Computer Engineering, Khwopa College'
  },
]

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <SectionWrapper id="about">
      <div ref={ref} className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left: Text */}
        <div>
          <SectionTitle title="About" />

          <div className="space-y-5 font-body text-ink-400 leading-relaxed text-[15px]">
            <p>
              My day job pays me to be a{' '}
              <span className="text-ink-100 font-medium">full-stack developer</span> — I
              built the company's website, the CMS running it, and the database
              holding both together, which is a fancy way of saying I touch
              everything and occasionally break something gracefully.
            </p>
            <p>
              The real obsession runs on the side: hackathons. Seven wins since
              2025, building AI tools aimed at problems that don't usually get AI
              budgets — diagnostic bias against women, small businesses priced out of
              going digital, emotion recognition that actually works on real faces
              instead of just the demo. A few finalist rounds in there too, which
              taught me more than winning did.
            </p>
            <p>
              Next move: get paid to do the hackathon thing full-time. Less demo day,
              more production — an{' '}
              <span className="text-ink-100 font-medium">AI engineering</span> role
              where I build the model, not just call someone else's.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 space-y-3"
          >
            <div className="card rounded-md p-5 flex items-start gap-4">
              <div className="mt-0.5 w-8 h-8 rounded-sm bg-[var(--accent-soft)] border border-ink-700 flex items-center justify-center flex-shrink-0">
                <GraduationCap size={15} className="text-rust-500" />
              </div>
              <div>
                <p className="font-display font-semibold text-ink-100 text-sm">Bachelor of Computer Engineering</p>
                <p className="text-ink-500 text-xs mt-0.5">Khwopa College of Engineering · 2022 – 2026</p>
              </div>
            </div>
            <div className="card rounded-md p-5 flex items-start gap-4">
              <div className="mt-0.5 w-8 h-8 rounded-sm bg-[var(--accent-soft)] border border-ink-700 flex items-center justify-center flex-shrink-0">
                <GraduationCap size={15} className="text-rust-500" />
              </div>
              <div>
                <p className="font-display font-semibold text-ink-100 text-sm">High School</p>
                <p className="text-ink-500 text-xs mt-0.5">St. Xavier's College, Kathmandu · 2019 – 2022</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Highlight grid */}
        <div className="grid grid-cols-2 gap-3 md:mt-[4.25rem]">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="card rounded-md p-5"
            >
              <div className="w-8 h-8 rounded-sm bg-[var(--accent-soft)] border border-ink-700 flex items-center justify-center mb-3">
                <h.icon size={15} className="text-rust-500" />
              </div>
              <p className="font-display font-semibold text-ink-100 text-base">{h.label}</p>
              <p className="font-body text-ink-500 text-xs mt-1 leading-snug">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
