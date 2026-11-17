import React, { useState, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
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
    <SectionWrapper id="api-terminal" tone="light">
      <SectionTitle index="05" apiLabel="GET /playground" title={apiTerminal.sectionTitle} />

      <div className="border border-ink/15 rounded-[2px]">
        <div className="flex items-center gap-4 px-4 py-3 border-b border-ink/15">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-ink/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-ink/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-ink/20" />
          </div>
          <span className="font-mono text-[11px] text-ink/50 tracking-wider">jeeni@portfolio — try an endpoint</span>
        </div>

        <div className="px-4 py-4 flex flex-wrap gap-2 border-b border-ink/15">
          {apiTerminal.endpoints.map((ep) => (
            <button
              key={ep.id}
              type="button"
              onClick={() => handleEndpointClick(ep)}
              aria-pressed={activeId === ep.id}
              className={`font-mono text-xs px-3 py-1.5 border rounded-[2px] transition-colors duration-150 ${
                activeId === ep.id ? 'bg-wine text-cream border-wine' : 'border-ink/20 text-ink/80 hover:border-ink/60 hover:text-ink'
              }`}
            >
              <span className="text-rose mr-1.5">{ep.method}</span>
              {ep.path}
            </button>
          ))}
        </div>

        <div className="p-5 min-h-[200px] overflow-x-auto">
          <pre aria-hidden="true" className="font-mono text-sm text-ink/90 whitespace-pre-wrap break-words leading-relaxed">
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
