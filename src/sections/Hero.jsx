import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { hero, site } from '../data/content'

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
              className="w-7 h-7 rounded-full object-cover object-top border border-ink-700"
            />
            <p className="font-display font-semibold text-sm text-ink-100">
              {site.name}
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
            grid md:grid-cols-[1.3fr_0.9fr] items-center gap-14 md:gap-10"
        >
          {/* Text column */}
          <div className="order-2 md:order-1">
            <motion.p
              variants={item}
              className="font-mono text-xs text-ink-500 tracking-wide mb-6"
            >
              {hero.locationLine}
            </motion.p>

            <motion.h1
              variants={item}
              className="font-display font-semibold leading-[1.05] tracking-tight mb-5"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 4.5rem)' }}
            >
              <span className="text-ink-100">{hero.firstName} </span>
              <span className="text-rust-500">{hero.lastName}</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="font-mono text-sm text-ink-400 mb-7"
            >
              {hero.roleLine}
            </motion.p>

            <motion.p
              variants={item}
              className="font-body text-[15px] text-ink-400 max-w-md leading-relaxed mb-10"
            >
              {hero.bio}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3">
              <button onClick={() => scrollTo(hero.ctaPrimary.href)} className="btn-primary">
                {hero.ctaPrimary.label}
              </button>
              <button onClick={onContactOpen} className="btn-secondary">
                {hero.ctaSecondary.label}
              </button>
            </motion.div>
          </div>

          {/* Photo column */}
          <motion.div variants={item} className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative w-[220px] h-[270px] md:w-[260px] md:h-[320px]">
              <div className="absolute -top-2.5 -left-2.5 w-6 h-6 border-t-2 border-l-2 border-rust-500" />
              <div className="absolute -bottom-2.5 -right-2.5 w-6 h-6 border-b-2 border-r-2 border-rust-500" />
              <div className="w-full h-full overflow-hidden border border-ink-700">
                <img
                  src={hero.photo}
                  alt={site.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div
          onClick={() => scrollTo('#about')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        >
          <span className="font-mono text-[10px] text-ink-500 tracking-widest uppercase group-hover:text-ink-100 transition-colors">
            Scroll
          </span>
          <ArrowDown size={14} className="text-ink-500 group-hover:text-ink-100 transition-colors" />
        </div>
      </section>
    </>
  )
}
