import React from 'react'
import Board from '../components/Board'
import Blade from '../components/Blade'
import SectionHead from '../components/SectionHead'
import { useReveal } from '../hooks/useReveal'
import { contactBoard, socials, hero } from '../data/content'

// 07 — Contact (charcoal): the "final call" board. A cream name blade
// (hinge line + pins, like the hero's), then email · LinkedIn · GitHub ·
// "say hello", and location / CV in the bottom meta row.
export default function Contact() {
  const ref = useReveal()
  const mail = `mailto:${contactBoard.email}`
  const linkedin = socials.find((s) => s.label === 'LinkedIn')
  const github = socials.find((s) => s.label === 'GitHub')
  const ext = { target: '_blank', rel: 'noopener noreferrer' }

  return (
    <section id="contact" ref={ref} aria-labelledby="contact-heading" className="reveal s-section s-section--charcoal">
      <div className="s-col">
        <SectionHead number="07" name="contact" />

        <Board
          label="Final call: contact"
          topLeft="final call"
          topRight="07 / 07"
          bottomLeft={contactBoard.location}
          bottomRight={<a href={hero.ctaDownload.href} download={hero.ctaDownload.fileName}>download cv <span aria-hidden="true">↓</span></a>}
          className="s-board"
          bodyClassName="s-gap py-[clamp(6px,0.8vw,14px)]"
        >
          <div className="relative">
            <Blade as="h2" id="contact-heading" fit variant="cream" text={contactBoard.heading} className="contact-name" />
            <span aria-hidden="true" className="room-pin room-pin--l" />
            <span aria-hidden="true" className="room-pin room-pin--r" />
          </div>

          <ul className="grid grid-cols-2 lg:grid-cols-[minmax(0,2.3fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.95fr)] s-gap s-mono">
            <li className="col-span-2 lg:col-span-1 flex">
              <Blade as="a" href={mail} fit variant="dark" text={contactBoard.email} className="s-h w-full" />
            </li>
            <li className="flex">
              <Blade as="a" href={linkedin.href} {...ext} fit center variant="dark" text={<span>LinkedIn <span aria-hidden="true">↗</span></span>} className="s-h w-full" />
            </li>
            <li className="flex">
              <Blade as="a" href={github.href} {...ext} fit center variant="dark" text={<span>GitHub <span aria-hidden="true">↗</span></span>} className="s-h w-full" />
            </li>
            <li className="col-span-2 lg:col-span-1 flex">
              <Blade as="a" href={mail} fit center variant="status" text={<span>say hello <span aria-hidden="true">→</span></span>} className="s-h w-full" />
            </li>
          </ul>
        </Board>
      </div>
    </section>
  )
}
