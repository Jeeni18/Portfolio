import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, hero, sectionIndex } from '../data/content'

// Fixed nav. Transparent over the hero wall; charcoal once scrolled. The
// 1px burgundy header rule under it spans the full content column and
// acts as the room's ceiling line.
export default function Navbar({ onContactOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Highlight the nav link for the section currently on screen.
  useEffect(() => {
    const targets = sectionIndex
      .map((s) => document.querySelector(s.href))
      .filter(Boolean)
    if (!targets.length) return undefined
    const io = new window.IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive('#' + visible[0].target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.2, 0.5] }
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

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

            <nav className="hidden md:flex items-center gap-[1.75em]" aria-label="Primary">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="nav-link"
                  aria-current={active === link.href ? 'true' : undefined}
                >
                  {link.label}
                </button>
              ))}
              <a href={hero.ctaDownload.href} download={hero.ctaDownload.fileName} className="nav-link">
                cv <span aria-hidden="true">↓</span>
                <span className="sr-only">download</span>
              </a>
              <button type="button" onClick={onContactOpen} className="btn-outline">
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
                >
                  <span className="font-mono text-[11px]" style={{ color: 'var(--rose)' }}>{s.number}</span>
                  <span className="font-mono text-[15px]" style={{ color: 'var(--dusty-pink)' }}>{s.label}</span>
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
