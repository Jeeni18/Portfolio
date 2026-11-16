import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, hero } from '../data/content'

export default function Navbar({ onContactOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-oxblood/95 backdrop-blur-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="font-display text-[1.65rem] text-ink leading-none tracking-tight"
          >
            Jeeni<span className="italic text-wine">.</span>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="nav-link font-body font-light text-[12.5px] tracking-[0.02em] text-pink-dusty hover:text-bone focus-visible:text-bone transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
            <a
              href={hero.ctaDownload.href}
              download
              className="nav-link font-body font-light text-[12.5px] tracking-[0.02em] text-pink-dusty hover:text-bone focus-visible:text-bone transition-colors duration-200"
            >
              CV <span aria-hidden="true">↓</span>
            </a>
            <button
              onClick={onContactOpen}
              className="font-body font-light text-[12.5px] tracking-[0.02em] text-bone border border-pink-dusty px-4 py-1.5 hover:bg-bone hover:text-oxblood hover:border-bone transition-colors duration-200"
            >
              Contact
            </button>
          </nav>

          <button
            className="lg:hidden text-pink-dusty"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Header rule -- a 1px "ceiling line" from the logo's left edge to the
            Contact button's right edge. The projector screen hangs from it. */}
        <div className="max-w-5xl mx-auto px-6" aria-hidden="true">
          <div id="header-rule" className="h-px bg-burgundy" />
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[57px] left-0 right-0 z-40 bg-oxblood border-b border-burgundy lg:hidden"
          >
            <div className="flex flex-col p-6 gap-5">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left font-body text-ink/80 hover:text-ink transition-colors py-1 border-b border-ink/20"
                >
                  {link.label}
                </button>
              ))}
              <a
                href={hero.ctaDownload.href}
                download
                className="text-left font-body text-pink-dusty hover:text-bone transition-colors py-1"
              >
                Download CV <span aria-hidden="true">↓</span>
              </a>
              <button
                onClick={() => { setMenuOpen(false); onContactOpen() }}
                className="w-full py-2.5 font-body text-sm text-bone border border-pink-dusty hover:bg-bone hover:text-oxblood transition-colors"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
