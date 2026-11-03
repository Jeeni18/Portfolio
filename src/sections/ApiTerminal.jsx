import React, { useState, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import WashiTape from '../components/WashiTape'
import { apiTerminal, techStack, experience } from '../data/content'

function skillsByCategory(name) {
  return techStack.categories.find((c) => c.name === name)?.skills.map((s) => s.name) || []
}

function resolveResponse(endpoint) {
  if (endpoint.response) return endpoint.response

  if (endpoint.id === 'skills') {
    return {
      frontend: skillsByCategory('Frontend'),
      backend: skillsByCategory('Backend & APIs'),
      databases: skillsByCategory('Databases'),
      testing: skillsByCategory('Testing & Debugging'),
      ai_ml: skillsByCategory('AI/ML'),
      status: 200,
    }
  }

  if (endpoint.id === 'experience') {
    return {
      roles: experience.items.map((job) => ({ role: job.role, company: job.org })),
      status: 200,
    }
  }

  return { status: 404 }
}

export default function ApiTerminal() {
  const [activeId, setActiveId] = useState(null)
  const [displayedText, setDisplayedText] = useState('')
  const [announcedText, setAnnouncedText] = useState('')
  const frameRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const handleEndpointClick = (endpoint) => {
    setActiveId(endpoint.id)
    const fullText = JSON.stringify(resolveResponse(endpoint), null, 2)

    if (frameRef.current) cancelAnimationFrame(frameRef.current)

    if (prefersReducedMotion) {
      setDisplayedText(fullText)
      setAnnouncedText(fullText)
      return
    }

    setDisplayedText('')
    const totalFrames = Math.max(1, Math.round(800 / 16))
    const stepsPerFrame = Math.max(1, Math.ceil(fullText.length / totalFrames))
    let i = 0

    const tick = () => {
      i += stepsPerFrame
      setDisplayedText(fullText.slice(0, i))
      if (i < fullText.length) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setAnnouncedText(fullText)
      }
    }
    frameRef.current = requestAnimationFrame(tick)
  }

  return (
    <SectionWrapper id="api-terminal">
      <SectionTitle apiLabel="GET /playground" title={apiTerminal.sectionTitle} />

      <div className="relative">
        <WashiTape className="-top-3 left-6" color="lilac" rotate={-5} width={56} height={22} />
        <WashiTape className="-top-3 right-8" color="rose" rotate={4} width={56} height={22} />

        <span
          className="hidden sm:block absolute -right-2 -top-10 font-hand text-lg text-plum/80 rotate-2"
          aria-hidden="true"
        >
          go on, click one ↓
        </span>

        <div className="bg-rose/40 border-2 border-plum border-b-0 p-3 flex flex-wrap gap-2">
          {apiTerminal.endpoints.map((ep) => (
            <button
              key={ep.id}
              type="button"
              onClick={() => handleEndpointClick(ep)}
              aria-pressed={activeId === ep.id}
              className={`font-mono text-xs px-3 py-1.5 border-2 border-plum transition-colors duration-150 ${
                activeId === ep.id ? 'bg-plum text-cream' : 'bg-paper text-plum hover:bg-plum/10'
              }`}
            >
              {ep.method} {ep.path}
            </button>
          ))}
        </div>

        <div className="bg-lilac/40 border-2 border-plum p-5 min-h-[180px] overflow-x-auto">
          <pre aria-hidden="true" className="font-mono text-sm text-plum whitespace-pre-wrap break-words">
            {displayedText || apiTerminal.idleText}
          </pre>
          <span className="sr-only" role="status" aria-live="polite">
            {announcedText}
          </span>
        </div>
      </div>
    </SectionWrapper>
  )
}
