import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import { hero, site, translations } from '../data/content'
import { useLanguage } from '../hooks/useLanguage'
import Highlight from '../components/Highlight'
import PolaroidPhoto from '../components/PolaroidPhoto'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 }
  }
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export default function Hero({ onContactOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const { lang } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 left-6 z-[60] flex items-center gap-2.5 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src={hero.photo}
              alt={site.name}
              className="w-7 h-7 rounded-full object-cover object-top border-2 border-plum"
            />
            <p className="font-hand text-2xl text-plum">
              jeeni.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 md:pt-0
            grid grid-cols-1 md:grid-cols-[1.3fr_0.9fr] items-center gap-14 md:gap-10"
        >
          {/* Text column */}
          <div className="order-2 md:order-1 min-w-0">
            <motion.p
              variants={item}
              className="font-mono text-xs text-plum/60 tracking-wide mb-5"
            >
              {hero.locationLine}
            </motion.p>

            <motion.p
              variants={item}
              lang="ne"
              className="font-devanagari text-2xl text-plum/80 mb-2"
            >
              {translations.heroGreeting.ne}
            </motion.p>

            {lang === 'en' ? (
              <>
                <motion.h1
                  variants={item}
                  className="font-display leading-[1.05] tracking-tight mb-5 text-plum"
                  style={{ fontSize: 'clamp(2.75rem, 7vw, 4.75rem)' }}
                >
                  {hero.firstName} {hero.lastName}
                </motion.h1>

                <motion.p
                  variants={item}
                  className="font-mono text-sm text-plum/70 mb-7"
                >
                  {hero.roleLine}
                </motion.p>

                <motion.p
                  variants={item}
                  className="font-body text-[17px] text-plum/90 max-w-md leading-relaxed mb-10"
                >
                  {hero.bioPre}
                  <Highlight>{hero.bioHighlight}</Highlight>
                  {hero.bioPost}
                </motion.p>
              </>
            ) : (
              <>
                <motion.h1
                  variants={item}
                  lang="ne"
                  className="font-devanagari leading-[1.3] tracking-tight mb-5 text-plum"
                  style={{ fontSize: 'clamp(2rem, 5.5vw, 3.25rem)' }}
                >
                  {translations.heroHeading.ne}
                </motion.h1>

                <motion.p
                  variants={item}
                  lang="ne"
                  className="font-devanagari text-[17px] text-plum/90 max-w-md leading-relaxed mb-10"
                >
                  {translations.heroIntro.ne}
                </motion.p>
              </>
            )}

            <motion.div variants={item} className="relative flex flex-wrap items-center gap-4">
              <button onClick={() => scrollTo(hero.ctaPrimary.href)} className="btn-primary">
                {hero.ctaPrimary.label}
              </button>
              <a
                href={hero.ctaDownload.href}
                download
                className="btn-secondary"
              >
                <Download size={14} />
                {hero.ctaDownload.label}
              </a>
              <button onClick={onContactOpen} className="btn-secondary">
                {hero.ctaSecondary.label}
              </button>
              <span className="hidden sm:block font-hand text-xl text-plum/80 -rotate-3 ml-1" aria-hidden="true">
                ← {hero.handwrittenNote}
              </span>
            </motion.div>
          </div>

          {/* Photo column */}
          <motion.div variants={item} className="order-1 md:order-2 min-w-0 flex justify-center md:justify-end">
            <PolaroidPhoto />
          </motion.div>
        </motion.div>

        <div
          onClick={() => scrollTo('#about')}
          className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 cursor-pointer group"
        >
          <span className="font-mono text-xs text-plum/60 tracking-widest uppercase group-hover:text-plum transition-colors">
            Scroll
          </span>
          <ArrowDown size={14} className="text-plum/60 group-hover:text-plum transition-colors" />
        </div>
      </section>
    </>
  )
}
