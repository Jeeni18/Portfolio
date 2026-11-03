import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { navLinks, hero } from '../data/content'
import LanguageToggle from './LanguageToggle'

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
            ? 'bg-cream/95 border-b-2 border-plum'
            : 'bg-transparent border-b-2 border-transparent'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="font-hand text-3xl text-plum"
          >
            jeeni.
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-body text-sm text-plum/80 hover:text-plum transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
            <LanguageToggle />
            <a
              href={hero.ctaDownload.href}
              download
              className="btn-secondary text-xs py-2 px-4"
            >
              <Download size={13} />
              CV
            </a>
            <button
              onClick={onContactOpen}
              className="btn-primary text-xs py-2 px-4"
            >
              Contact
            </button>
          </nav>

          <button
            className="lg:hidden text-plum"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[57px] left-0 right-0 z-40 bg-cream border-b-2 border-plum lg:hidden"
          >
            <div className="flex flex-col p-6 gap-5">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left font-body text-plum/80 hover:text-plum transition-colors py-1 border-b border-plum/20"
                >
                  {link.label}
                </button>
              ))}
              <LanguageToggle floating={false} />
              <a
                href={hero.ctaDownload.href}
                download
                className="btn-secondary text-sm w-full justify-center"
              >
                <Download size={14} />
                Download CV
              </a>
              <button
                onClick={() => { setMenuOpen(false); onContactOpen() }}
                className="btn-primary text-sm w-full justify-center"
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
