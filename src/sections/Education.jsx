import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, GraduationCap, ZoomIn } from 'lucide-react'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import { education, certifications } from '../data/content'

function EducationCard({ entry, index }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card rounded-md p-5 flex items-start gap-4"
    >
      <div className="mt-0.5 w-8 h-8 rounded-sm bg-[var(--accent-soft)] border border-ink-700 flex items-center justify-center flex-shrink-0">
        <GraduationCap size={15} className="text-rust-500" />
      </div>
      <div>
        <p className="font-display font-semibold text-ink-100 text-sm">{entry.degree}</p>
        <p className="text-ink-500 text-xs mt-0.5">{entry.org} · {entry.period}</p>
      </div>
    </motion.div>
  )
}

function CertCard({ cert, onClick }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      onClick={() => onClick(cert)}
      className="card relative rounded-md overflow-hidden cursor-pointer"
    >
      <div className="relative h-44 flex items-center justify-center overflow-hidden bg-ink-900">
        {cert.image ? (
          <img
            src={cert.image}
            alt={cert.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 flex items-center justify-center text-xl font-display font-bold text-ink-100 border border-ink-700 bg-ink-800">
            {cert.initials}
          </div>
        )}

        <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="flex items-center gap-2 px-4 py-2 border border-rust-500 text-rust-500 text-xs font-mono tracking-wide">
            <ZoomIn size={13} />
            <span>View Certificate</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <p className="font-mono text-[9px] text-ink-500 tracking-wide uppercase mb-1.5">
          {cert.org} · {cert.year}
        </p>
        <h3 className="font-display font-semibold text-ink-100 text-sm leading-snug mb-2">
          {cert.title}
        </h3>
        <p className="font-body text-ink-500 text-[12px] leading-relaxed">
          {cert.description}
        </p>
      </div>

      <div className="absolute top-3 right-3 w-7 h-7 bg-ink-950/80 border border-ink-700 flex items-center justify-center">
        <Award size={13} className="text-rust-500" />
      </div>
    </motion.div>
  )
}

export default function Education({ onCertClick }) {
  return (
    <SectionWrapper id="education">
      <SectionTitle
        title={education.sectionTitle}
        subtitle={education.sectionSubtitle}
      />

      <div className="grid sm:grid-cols-2 gap-3 mb-10">
        {education.entries.map((entry, i) => (
          <EducationCard key={entry.degree} entry={entry} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certifications.items.map((cert) => (
          <CertCard key={cert.id} cert={cert} onClick={onCertClick} />
        ))}
      </div>
    </SectionWrapper>
  )
}
