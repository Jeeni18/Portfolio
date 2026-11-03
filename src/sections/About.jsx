import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import { about, translations } from '../data/content'
import { useLanguage } from '../hooks/useLanguage'

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { lang } = useLanguage()

  const title = translations.sectionTitle.about[lang]
  const paragraphs = translations.aboutParagraphs[lang]

  return (
    <SectionWrapper id="about">
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left: Text */}
        <div>
          <SectionTitle apiLabel="GET /about" title={title} />

          <div
            lang={lang === 'ne' ? 'ne' : undefined}
            className={`space-y-5 text-plum/85 leading-relaxed text-[17px] ${
              lang === 'ne' ? 'font-devanagari' : 'font-body'
            }`}
          >
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* Right: Highlight grid */}
        <div className="grid grid-cols-2 gap-3 md:mt-[4.25rem]">
          {about.highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="card p-5"
            >
              <div className="w-8 h-8 rounded-sm bg-lilac flex items-center justify-center mb-3">
                <h.icon size={15} className="text-plum" />
              </div>
              <p className="font-display text-plum text-lg">{h.label}</p>
              <p className="font-body text-plum/60 text-xs mt-1 leading-snug">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
