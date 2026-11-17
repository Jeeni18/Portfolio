import React from 'react'
import Board from '../components/Board'
import Blade from '../components/Blade'
import SectionHead from '../components/SectionHead'
import { useReveal } from '../hooks/useReveal'
import { skills } from '../data/content'

// 03 — Skills (charcoal-deep): one board, one row per category: a
// dusty-pink category blade, then one dark blade per skill, sized to the
// word. Rows wrap on narrow screens.
export default function Skills() {
  const ref = useReveal()

  return (
    <section id="skills" ref={ref} aria-labelledby="skills-heading" className="reveal s-section s-section--deep">
      <div className="s-col">
        <SectionHead number="03" name="skills" id="skills-heading" title="Index of skills." index="03 / 07" />

        <Board label="Skills" className="s-board" bodyClassName="s-gap">
          {skills.map((row) => (
            <div key={row.category} className="flex flex-col sm:flex-row s-gap">
              <h3 className="skills-cat">
                <Blade as="span" fit variant="dark" secondary text={row.category} className="s-h s-mono w-full" />
              </h3>
              <ul className="flex flex-wrap s-gap flex-1 min-w-0">
                {row.items.map((item) => (
                  <li key={item} className="flex">
                    <Blade as="span" fit variant="dark" text={item} className="s-h s-mono" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Board>
      </div>
    </section>
  )
}
