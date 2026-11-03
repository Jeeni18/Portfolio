import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import { about, translations } from '../data/content'
import { useLanguage } from '../hooks/useLanguage'
import { ScribbleCircle } from '../components/Doodles'

const NOTE_COLORS = ['bg-blush', 'bg-rose', 'bg-lilac', 'bg-blush']
const NOTE_ROTATIONS = ['-rotate-2', 'rotate-3', '-rotate-1', 'rotate-2']

function circleWord(text) {
  const word = text.includes('APIs') ? 'APIs' : text.includes('API') ? 'API' : null
  if (!word) return text
  const idx = text.indexOf(word)
  return (
    <>
      {text.slice(0, idx)}
      <span className="relative inline-block">
        {word}
        <ScribbleCircle
          className="absolute -left-2 -right-2 -top-2 -bottom-1 w-[calc(100%+1rem)] h-[calc(100%+0.75rem)] pointer-events-none"
          delay={0.3}
        />
      </span>
      {text.slice(idx + word.length)}
    </>
  )
}

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { lang } = useLanguage()

  const title = translations.sectionTitle.about[lang]
  const paragraphs = translations.aboutParagraphs[lang]

  return (
    <SectionWrapper id="about">
      <SectionTitle apiLabel="GET /about" title={title} />

      <div ref={ref} className="relative md:pr-16">
        <div className="lined-paper bg-paper border-2 border-plum relative px-8 py-9 md:pl-12">
          <span
            className="hidden md:block absolute left-7 top-0 bottom-0 w-px bg-rose"
            style={{ background: 'rgba(235,196,213,0.9)' }}
            aria-hidden="true"
          />
          <div
            lang={lang === 'ne' ? 'ne' : undefined}
            className={`space-y-6 text-plum/90 leading-[32px] text-[17px] md:pr-48 ${
              lang === 'ne' ? 'font-devanagari' : 'font-body'
            }`}
          >
            {paragraphs.map((p, i) => (
              <p key={i}>{i === 0 ? circleWord(p) : p}</p>
            ))}
          </div>
        </div>

        {/* Sticky notes -- stacked below the page on mobile, overlapping its right edge from md up */}
        <div className="mt-6 flex flex-wrap gap-4 md:mt-0 md:flex-col md:gap-5 md:absolute md:-right-4 md:top-10 md:w-44">
          {about.highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
              className={`${NOTE_COLORS[i % 4]} ${NOTE_ROTATIONS[i % 4]} w-36 md:w-full p-4 shadow-[3px_4px_8px_rgba(73,55,68,0.18)]`}
            >
              <div className="w-7 h-7 rounded-sm bg-paper/70 flex items-center justify-center mb-2">
                <h.icon size={14} className="text-plum" />
              </div>
              <p className="font-hand text-lg text-plum leading-tight">{h.label}</p>
              <p className="font-body text-plum/70 text-[11px] mt-0.5 leading-snug">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
