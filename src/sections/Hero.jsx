import React, { Suspense, lazy, useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import { hero, site, translations } from '../data/content'
import { useLanguage } from '../hooks/useLanguage'
import { useWebglSupport } from '../hooks/useWebglSupport'
import Highlight from '../components/Highlight'
import PolaroidPhoto from '../components/PolaroidPhoto'
import { CurvedArrow } from '../components/Doodles'

const HeroScene = lazy(() => import('../three/HeroScene'))

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
  const prefersReducedMotion = useReducedMotion()
  const webglSupported = useWebglSupport()
  const screenLines = [`> whoami`, hero.firstName + ' ' + hero.lastName.replace('.', ''), `> role`, hero.roleLine]

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
              lang={lang === 'ne' ? 'ne' : undefined}
              className={`text-2xl text-plum/80 mb-2 ${lang === 'ne' ? 'font-devanagari' : 'font-hand'}`}
            >
              {translations.heroGreeting[lang]}
            </motion.p>

            {lang === 'en' ? (
              <>
                <motion.h1
                  variants={item}
                  className="font-display leading-[0.98] tracking-tight mb-5 text-plum"
                  style={{ fontSize: 'clamp(2.75rem, 9vw, 6rem)' }}
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

            <motion.div variants={item} className="relative pt-8 sm:pt-0">
              <span
                className="hidden sm:block absolute -top-7 left-[calc(100%-2rem)] font-hand text-xl text-plum/80 -rotate-2 whitespace-nowrap"
                aria-hidden="true"
              >
                {hero.handwrittenNote}
              </span>
              <CurvedArrow
                className="hidden sm:block absolute -top-1 left-[calc(100%-2.5rem)] w-20 h-10"
                delay={1.3}
              />

              <div className="flex flex-wrap items-center gap-4">
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
              </div>

              <span className="sm:hidden mt-4 block font-hand text-xl text-plum/80 -rotate-2" aria-hidden="true">
                ← {hero.handwrittenNote}
              </span>
            </motion.div>
          </div>

          {/* 3D scene column */}
          <motion.div variants={item} className="order-1 md:order-2 min-w-0 flex justify-center md:justify-end relative">
            <div
              aria-hidden="true"
              className="absolute w-[230px] h-[270px] md:w-[260px] md:h-[300px] bg-blush -z-10"
              style={{
                borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%',
                transform: 'rotate(8deg) translate(34px, 26px)',
              }}
            />
            <div className="w-[260px] h-[300px] md:w-[300px] md:h-[340px]" aria-hidden="true">
              {webglSupported ? (
                <Suspense fallback={<PolaroidPhoto />}>
                  <HeroScene reducedMotion={!!prefersReducedMotion} lines={screenLines} />
                </Suspense>
              ) : (
                <PolaroidPhoto />
              )}
            </div>
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
