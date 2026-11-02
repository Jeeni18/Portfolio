import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import TechStack from './sections/TechStack'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Achievements from './sections/Achievements'
import Certifications from './sections/Certifications'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import CertModal from './components/CertModal'
import ContactModal from './components/ContactModal'

function App() {
  const [selectedCert, setSelectedCert] = useState(null)
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-[#121110] overflow-x-hidden noise-bg">
      <div className="relative z-10">
        <Navbar onContactOpen={() => setContactOpen(true)} />
        <Hero onContactOpen={() => setContactOpen(true)} />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <Achievements />
        <Certifications onCertClick={setSelectedCert} />
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
  )
}

export default App
