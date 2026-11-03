import React, { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { LanguageProvider } from './context/LanguageContext'
import { Dhaka } from './components/SectionWrapper'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import TechStack from './sections/TechStack'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import ApiTerminal from './sections/ApiTerminal'
import Achievements from './sections/Achievements'
import Leadership from './sections/Leadership'
import Education from './sections/Education'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import CertModal from './components/CertModal'
import ContactModal from './components/ContactModal'

function App() {
  const [selectedCert, setSelectedCert] = useState(null)
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen bg-cream overflow-x-hidden">
          <div className="relative z-10">
            <Navbar onContactOpen={() => setContactOpen(true)} />
            <Hero onContactOpen={() => setContactOpen(true)} />
            <Dhaka />
            <About />
            <TechStack />
            <Dhaka />
            <Experience />
            <Projects />
            <ApiTerminal />
            <Dhaka />
            <Achievements />
            <Leadership />
            <Dhaka />
            <Education onCertClick={setSelectedCert} />
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
    </LanguageProvider>
  )
}

export default App
