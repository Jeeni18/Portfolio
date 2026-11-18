import React from 'react'
import Board from '../components/Board'
import Blade from '../components/Blade'
import SectionHead from '../components/SectionHead'
import { useReveal } from '../hooks/useReveal'
import { about, hero } from '../data/content'

// 02 — About (oxblood): italic statement + short body + CV link on the
// left; a small facts board on the right (under the text below 1024px).
// One word of the statement: "real-world" never breaks at its hyphen, and
// the highlight word ("reliable") sits on a burgundy marker bar.
function renderWord(w) {
  const hl = about.highlight
  if (hl && w.startsWith(hl)) {
    return <><span className="s-highlight">{hl}</span>{w.slice(hl.length)}</>
  }
  return w.includes('-') ? <span className="whitespace-nowrap">{w}</span> : w
}

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" ref={ref} aria-labelledby="about-heading" className="reveal s-section s-section--oxblood">
      <div className="s-col">
        <SectionHead number="02" name="about" />

        <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-x-[6vw] gap-y-12 lg:items-center">
          <div>
            <h2 id="about-heading" className="about-statement">
              {about.statementLines.map((line) => (
                <span key={line} className="lg:block">
                  {/* never break "real-world" at its hyphen; the highlighted
                      word gets the marker bar behind it */}
                  {line.split(' ').map((w, i) => (
                    <React.Fragment key={i}>{renderWord(w)}{' '}</React.Fragment>
                  ))}
                </span>
              ))}
            </h2>
            <p className="about-body mt-[clamp(20px,2vw,32px)]">{about.body}</p>
            <a href={hero.ctaDownload.href} download={hero.ctaDownload.fileName} className="s-link inline-block mt-[clamp(24px,2.4vw,40px)]">
              {about.cvLabel} <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div>
            <Board label="Facts" className="s-board" bodyClassName="s-gap">
              <dl className="flex flex-col s-gap">
                {about.board.map((row) => (
                  <div key={row.label} className="grid grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] sm:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] s-gap">
                    <Blade as="dt" fit variant="dark" secondary text={row.label} className="s-h s-mono" />
                    <Blade as="dd" fit variant={row.variant} text={row.value} className="s-h s-mono" />
                  </div>
                ))}
              </dl>
            </Board>
            <p className="s-index text-right mt-4" aria-hidden="true">02 / 07</p>
          </div>
        </div>
      </div>
    </section>
  )
}
