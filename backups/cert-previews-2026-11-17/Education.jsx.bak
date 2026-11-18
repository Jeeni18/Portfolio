import React from 'react'
import Board from '../components/Board'
import SectionHead from '../components/SectionHead'
import { useReveal } from '../hooks/useReveal'
import { education, training, certifications } from '../data/content'

// 06 — Education (charcoal-deep): a timetable board (years · institution ·
// programme · status; the degree row highlighted cream), then three
// training cards. A card's title opens its certificate.
const COLS = 'sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1.6fr)_minmax(0,1.3fr)_minmax(0,0.7fr)]'

export default function Education({ onCertClick }) {
  const ref = useReveal()

  return (
    <section id="education" ref={ref} aria-labelledby="education-heading" className="reveal s-section s-section--deep">
      <div className="s-col">
        <SectionHead number="06" name="education" id="education-heading" title="Education." index="06 / 07" />

        <Board label="Timetable: education" className="s-board" bodyClassName="s-gap">
          <div role="table" aria-label="Education" className="flex flex-col s-gap">
            <div role="row" className={`edu-cols hidden sm:grid ${COLS} gap-4 px-[clamp(12px,1.05vw,20px)] py-1`}>
              <span role="columnheader">years</span>
              <span role="columnheader">institution</span>
              <span role="columnheader">programme</span>
              <span role="columnheader" className="text-right">status</span>
            </div>
            {education.rows.map((r) => (
              <div key={r.institution} role="row" className={`blade blade--fit ${r.highlight ? 'blade--cream' : 'blade--dark'} edu-row s-h py-[0.55em]`}>
                <div className={`blade-layer s-grid grid-cols-2 ${COLS} gap-x-4 gap-y-1 w-full`}>
                  {/* Phones: years · status, then institution, then programme */}
                  <span role="cell" className="order-1 sm:order-none">{r.years}</span>
                  <span role="cell" className="order-3 col-span-2 sm:order-none sm:col-span-1">{r.institution}</span>
                  <span role="cell" className="order-4 col-span-2 sm:order-none sm:col-span-1">{r.programme}</span>
                  <span role="cell" className="order-2 text-right sm:order-none">{r.status}</span>
                </div>
              </div>
            ))}
          </div>
        </Board>

        <p className="s-label mt-[clamp(40px,4vw,64px)]">training and certifications</p>
        <ul className="grid md:grid-cols-3 gap-[clamp(12px,1.2vw,20px)]">
          {training.map((t) => {
            const cert = certifications.items.find((c) => c.id === t.certId)
            return (
              <li key={t.title} className="edu-card">
                <h3>
                  {cert
                    ? <button type="button" className="edu-card__title" onClick={() => onCertClick(cert)} aria-label={`${t.title}: view certificate`}>{t.title}</button>
                    : <span className="edu-card__title">{t.title}</span>}
                </h3>
                <p className="edu-card__meta mt-3">{t.meta}</p>
                <p className="edu-card__line mt-1.5">{t.line}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
