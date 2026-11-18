import React from 'react'
import Board from '../components/Board'
import Blade from '../components/Blade'
import SectionHead from '../components/SectionHead'
import { useReveal } from '../hooks/useReveal'
import { awards } from '../data/content'

// 05 — Awards (oxblood): a cream "4 hackathons won" panel and an arrivals
// board (year · event · result), then one mono line of finalist places.
// Event blades link to the certificate where one exists.
export default function Awards() {
  const ref = useReveal()

  return (
    <section id="awards" ref={ref} aria-labelledby="awards-heading" className="reveal s-section s-section--oxblood">
      <div className="s-col">
        <SectionHead number="05" name="awards" id="awards-heading" title="Awards and wins." note="arrivals" />

        <div className="grid lg:grid-cols-[minmax(0,0.3fr)_minmax(0,1fr)] gap-[clamp(14px,1.4vw,24px)]">
          {/* The big number: a cream panel with the hinge line through it */}
          <div className="awards-four blade blade--cream flex flex-col items-center justify-center">
            <span className="relative z-[2] flex flex-col items-center gap-[clamp(10px,1.4vw,24px)] pt-[0.6em]">
              <span className="awards-four__n" aria-hidden="true">{awards.hackathonsWon}</span>
              <span className="awards-four__cap">
                <span className="sr-only">{awards.hackathonsWon} </span>hackathons won
              </span>
            </span>
          </div>

          <Board label="Arrivals: awards" className="s-board justify-center" bodyClassName="s-gap justify-center">
            <ul className="flex flex-col s-gap">
              {awards.items.map((a) => (
                <li key={a.event} className="grid grid-cols-[4.2em_minmax(0,1fr)] sm:grid-cols-[clamp(64px,6vw,104px)_minmax(0,1fr)_clamp(150px,14vw,250px)] s-gap s-mono">
                  <Blade as="span" fit center variant="dark" secondary text={a.year} className="s-h" />
                  {a.link ? (
                    <Blade
                      as="a"
                      href={a.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      fit
                      variant="dark"
                      text={<>{a.event}<span className="sr-only"> (certificate, opens in a new tab)</span></>}
                      className="s-h"
                    />
                  ) : (
                    <Blade as="span" fit variant="dark" text={a.event} className="s-h" />
                  )}
                  <Blade
                    as="span"
                    fit
                    center
                    variant={a.win ? 'status' : 'dark'}
                    secondary={!a.win}
                    text={a.result}
                    className="s-h col-start-2 sm:col-start-auto"
                  />
                </li>
              ))}
            </ul>
          </Board>
        </div>

        <p className="awards-also mt-[clamp(18px,1.8vw,30px)]">
          also:{' '}
          {awards.also.map((a, i) => (
            <React.Fragment key={a.text}>
              {i > 0 && ' · '}
              {a.link ? <a href={a.link} target="_blank" rel="noopener noreferrer">{a.text}</a> : a.text}
            </React.Fragment>
          ))}
        </p>
      </div>
    </section>
  )
}
