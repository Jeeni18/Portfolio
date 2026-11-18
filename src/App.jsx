import React, { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Works from './sections/Works'
import Awards from './sections/Awards'
import Education from './sections/Education'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import CertModal from './components/CertModal'
import ContactModal from './components/ContactModal'

// 01 hero · 02 about · 03 skills · 04 works · 05 awards · 06 education ·
// 07 contact · footer
function App() {
  const [selectedCert, setSelectedCert] = useState(null)
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      <div className="app-root relative min-h-screen overflow-x-hidden">
        <div className="relative z-10">
          <Navbar onContactOpen={() => setContactOpen(true)} />
          <main>
            <Hero onContactOpen={() => setContactOpen(true)} />
            <About />
            <Skills />
            <Works />
            <Awards />
            <Education onCertClick={setSelectedCert} />
            <Contact />
          </main>
          <Footer />
          <FloatingContact onClick={() => setContactOpen(true)} />
        </div>

        {selectedCert && (
          <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}

        {contactOpen && (
          <ContactModal onClose={() => setContactOpen(false)} />
        )}
      </div>
    </MotionConfig>
  )
}

export default App
