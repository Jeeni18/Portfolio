import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, hero, sectionIndex } from '../data/content'

// Fixed nav. Transparent over the hero wall; charcoal once scrolled. The
// 1px burgundy header rule under it spans the full content column and
// acts as the room's ceiling line.
export default function Navbar({ onContactOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('hero') // id of the section on screen
  const navRef = useRef(null)
  const linkRefs = useRef({})
  const indicatorRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // The section on screen = the one crossing the middle of the screen. With
  // the sticky stack the pinned hero crosses it the whole time, so the
  // latest section in page order wins (later sections lie on top): the
  // hero stays active until About covers more than half the screen. The
  // footer counts as Contact.
  useEffect(() => {
    const order = [...sectionIndex.map((s) => s.href.slice(1)), 'footer']
    const els = order.map((id) => (id === 'footer' ? document.querySelector('footer') : document.getElementById(id))).filter(Boolean)
    if (!els.length || !('IntersectionObserver' in window)) return undefined
    const crossing = new Set()
    const io = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = e.target.tagName === 'FOOTER' ? 'footer' : e.target.id
          if (e.isIntersecting) crossing.add(id)
          else crossing.delete(id)
        })
        const last = order.filter((id) => crossing.has(id)).pop()
        if (last) setActive(last === 'footer' ? 'contact' : last)
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // One cream box behind the active link, sliding from link to link (and
  // fading out where no link applies: the hero, Education, Contact -- which
  // lights up the contact button instead). Reduced motion: no sliding.
  const activeHref = `#${active}`
  const linkActive = navLinks.some((l) => l.href === activeHref) ? activeHref : null
  const contactActive = active === 'contact'
  const shown = useRef(false)
  useLayoutEffect(() => {
    const ind = indicatorRef.current
    const nav = navRef.current
    if (!ind || !nav) return undefined
    const place = () => {
      const link = linkActive && linkRefs.current[linkActive]
      if (!link) { ind.style.opacity = '0'; shown.current = false; return }
      const x = link.offsetLeft - 10
      const y = link.offsetTop - 6
      const fresh = !shown.current
      // appearing (rather than moving): put it in place without sliding
      if (fresh) ind.classList.add('nav-indicator--still')
      ind.style.width = `${link.offsetWidth + 20}px`
      ind.style.height = `${link.offsetHeight + 12}px`
      ind.style.transform = `translate(${x}px, ${y}px)`
      ind.style.opacity = '1'
      shown.current = true
      if (fresh) requestAnimationFrame(() => requestAnimationFrame(() => ind.classList.remove('nav-indicator--still')))
    }
    place()
    window.addEventListener('resize', place)
    document.fonts?.ready.then(place)
    return () => window.removeEventListener('resize', place)
  }, [linkActive])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled || menuOpen ? 'room-header--solid' : 'bg-transparent'
        }`}
      >
        {/* Reference proportions: header rule at 11.45% of the viewport
            height, 94% content column, mono links at the room's size. */}
        <div className="w-[94%] mx-auto">
          <div
            className="flex items-center justify-between"
            style={{ height: 'max(56px, calc(11.45vh - 1px))', fontSize: 'clamp(14px, min(1.55vw, 2.9vh), 26px)' }}
          >
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="room-logo font-display leading-none tracking-tight"
              style={{ fontSize: 'clamp(26px, min(2.75vw, 5.2vh), 46px)' }}
            >
              Jeeni.
            </a>

            <nav ref={navRef} className="nav-desktop relative hidden md:flex items-center gap-[1.75em]" aria-label="Primary">
              <span ref={indicatorRef} className="nav-indicator" aria-hidden="true" />
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  ref={(el) => { linkRefs.current[link.href] = el }}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="nav-link"
                  aria-current={linkActive === link.href ? 'true' : undefined}
                >
                  {link.label}
                </button>
              ))}
              <a href={hero.ctaDownload.href} download={hero.ctaDownload.fileName} className="nav-link">
                cv <span aria-hidden="true">↓</span>
                <span className="sr-only">download</span>
              </a>
              <button type="button" onClick={onContactOpen} className={`btn-outline${contactActive ? ' is-active' : ''}`}>
                contact
              </button>
            </nav>

            <button
              type="button"
              className="md:hidden nav-link"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? 'close ×' : 'menu ≡'}
            </button>
          </div>

          {/* Header rule -- the ceiling line */}
          <div id="header-rule" className="room-rule" aria-hidden="true" />
        </div>
      </header>

      {/* Mobile: full-screen charcoal panel in the same mono style */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="room-header--solid fixed inset-x-0 bottom-0 z-40 md:hidden text-[15px]"
            style={{ top: 'max(57px, 11.45vh)' }}
          >
            <nav className="w-[88%] mx-auto pt-10 flex flex-col" aria-label="Primary">
              {sectionIndex.map((s) => (
                <button
                  key={s.href}
                  type="button"
                  onClick={() => handleNavClick(s.href)}
                  className="mobile-menu-item flex items-baseline gap-4 py-4 text-left"
                  aria-current={activeHref === s.href ? 'true' : undefined}
                >
                  <span className="font-mono text-[11px]" style={{ color: 'var(--rose)' }}>{s.number}</span>
                  <span className={`mobile-menu-label font-mono text-[15px]${activeHref === s.href ? ' is-active' : ''}`}>{s.label}</span>
                </button>
              ))}
              <div className="flex items-center gap-6 pt-8">
                <a href={hero.ctaDownload.href} download={hero.ctaDownload.fileName} className="nav-link">
                  cv <span aria-hidden="true">↓</span>
                </a>
                <button type="button" onClick={() => { setMenuOpen(false); onContactOpen() }} className="btn-outline">
                  contact
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
