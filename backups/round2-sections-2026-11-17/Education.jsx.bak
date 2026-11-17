import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, ZoomIn } from 'lucide-react'
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
      className="border-t border-ink/15 pt-6 flex gap-5"
    >
      <GraduationCap size={18} strokeWidth={1.5} className="text-wine mt-1 flex-shrink-0" aria-hidden="true" />
      <div>
        <p className="font-display text-ink text-2xl leading-snug">{entry.degree}</p>
        <p className="text-rose text-[11px] mt-2 font-mono tracking-wider uppercase">{entry.org}</p>
        <p className="text-ink/50 text-[11px] mt-1 font-mono">{entry.period}</p>
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
      role="button"
      tabIndex={0}
      aria-label={`View certificate: ${cert.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(cert)
        }
      }}
      className="card relative overflow-hidden cursor-pointer"
    >
      <div className="relative h-44 flex items-center justify-center overflow-hidden bg-cream">
        {cert.image ? (
          <img
            src={cert.image}
            alt={cert.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 flex items-center justify-center text-xl font-display text-ink border border-ink/15 bg-paper">
            {cert.initials}
          </div>
        )}

        <div className="absolute inset-0 bg-wine-deep/75 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="flex items-center gap-2 px-4 py-2 border border-bone/60 text-bone text-[11px] uppercase font-mono tracking-wide">
            <ZoomIn size={13} />
            <span>View Certificate</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <p className="font-mono text-[11px] text-rose tracking-wider uppercase mb-1.5">
          {cert.org} · {cert.year}
        </p>
        <h3 className="font-display text-ink text-lg leading-snug mb-2">
          {cert.title}
        </h3>
        <p className="font-body text-ink/75 text-[13px] leading-relaxed">
          {cert.description}
        </p>
      </div>

    </motion.div>
  )
}

export default function Education({ onCertClick }) {
  return (
    <SectionWrapper id="education">
      <SectionTitle
        apiLabel="GET /education"
        index="08"
        title={education.sectionTitle}
        subtitle={education.sectionSubtitle}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 mb-16">
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
