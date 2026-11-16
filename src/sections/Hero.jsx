import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { hero, site } from '../data/content'
import { useWebglSupport } from '../hooks/useWebglSupport'
import { STEP, timeline, useIntro } from '../hooks/introTimeline'
import PolaroidPhoto from '../components/PolaroidPhoto'
import ProjectorScreen from '../components/ProjectorScreen'
import ProjectorBeam from '../components/ProjectorBeam'

const HeroScene = lazy(() => import('../three/HeroScene'))

export default function Hero({ onContactOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const webglSupported = useWebglSupport()
  const { status, step, instant } = useIntro()
  const containerRef = useRef(null)
  const canvasBoxRef = useRef(null)
  const surfaceRef = useRef(null)
  const screenLines = [`> whoami`, hero.firstName + ' ' + hero.lastName.replace('.', ''), `> role`, hero.roleLine]

  // Decide once -- before the first paint, so returning visitors never see
  // the rolled-up screen flash -- whether to play the intro or land on the
  // finished state. Playing itself is kicked off by the 3D scene's first
  // frame (so the walk never runs behind a loading canvas), or right away
  // when there's no WebGL and the Polaroid fallback is shown instead.
  useState(() => {
    if (prefersReducedMotion || timeline.hasPlayedThisSession()) timeline.finish()
    return null
  })

  useEffect(() => {
    if (!webglSupported) timeline.start()
  }, [webglSupported])

  // Any interaction while the intro is running jumps to the end.
  useEffect(() => {
    if (status !== 'playing') return undefined
    const skip = () => timeline.skip()
    const opts = { passive: true }
    const events = ['pointerdown', 'keydown', 'wheel', 'touchmove', 'scroll']
    events.forEach((e) => window.addEventListener(e, skip, opts))
    return () => events.forEach((e) => window.removeEventListener(e, skip, opts))
  }, [status])

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
            className="fixed top-4 left-6 z-[60] hidden xl:flex items-center gap-2.5 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src={hero.photo}
              alt={site.name}
              className="w-7 h-7 rounded-full object-cover object-top border border-ink/15"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div
          ref={containerRef}
          className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-24 pb-12 md:pt-0 md:pb-0
            grid grid-cols-1 md:grid-cols-[minmax(0,600px)_256px] md:justify-center items-center md:items-end gap-8 md:gap-x-20"
        >
          <ProjectorBeam
            containerRef={containerRef}
            canvasBoxRef={canvasBoxRef}
            surfaceRef={surfaceRef}
            visible={step >= STEP.BEAM}
            instant={instant}
            idle={status === 'done'}
          />

          {/* Projector screen (DOM) */}
          <div className="relative z-10 order-1 min-w-0 md:mb-6">
            <ProjectorScreen
              surfaceRef={surfaceRef}
              onPrimary={() => scrollTo(hero.ctaPrimary.href)}
              onSecondary={onContactOpen}
            />
          </div>

          {/* 3D scene */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-0 order-2 min-w-0 flex justify-center md:justify-end"
          >
            {/* Architectural alcove: rich burgundy arch with a deep floor plinth */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 md:left-auto md:right-[19px] -translate-x-1/2 md:translate-x-0 w-[208px] md:w-[224px] h-[256px] md:h-[282px] -z-10 bg-wine-rich"
              style={{
                borderRadius: '999px 999px 2px 2px',
                boxShadow: 'inset 0 -40px 60px -30px rgba(53,16,30,0.55)',
              }}
            >
              <span className="absolute inset-x-0 bottom-0 h-[18%] bg-wine-deep/70" />
            </div>
            <div ref={canvasBoxRef} className="w-[230px] h-[265px] md:w-[256px] md:h-[290px]" aria-hidden="true">
              {webglSupported ? (
                <Suspense fallback={<PolaroidPhoto />}>
                  <HeroScene reducedMotion={!!prefersReducedMotion} lines={screenLines} />
                </Suspense>
              ) : (
                <PolaroidPhoto />
              )}
            </div>
          </motion.div>
        </div>

        <div
          onClick={() => scrollTo('#about')}
          className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 cursor-pointer group"
        >
          <span className="font-mono text-xs text-ink/60 tracking-widest uppercase group-hover:text-ink transition-colors">
            Scroll
          </span>
          <ArrowDown size={14} className="text-ink/60 group-hover:text-ink transition-colors" />
        </div>
      </section>
    </>
  )
}
