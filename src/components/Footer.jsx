import React from 'react'
import { footer, sectionIndex } from '../data/content'

// Footer (board-black): burgundy rule, credit line, quick links and
// "back to top".
export default function Footer() {
  const links = footer.links.map((href) => sectionIndex.find((s) => s.href === href)).filter(Boolean)
  const go = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="site-footer">
      <div className="s-col pt-[clamp(28px,2.6vw,44px)] pb-[clamp(40px,4vw,64px)]">
        <div className="site-footer__rule" aria-hidden="true" />
        <p className="site-footer__credit mt-[clamp(20px,2vw,32px)]">{footer.credit}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-[clamp(16px,1.8vw,30px)] gap-y-2">
              {links.map((s) => (
                <li key={s.href}>
                  <button type="button" className="site-footer__link" onClick={() => go(s.href)}>{s.label}</button>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            className="site-footer__link site-footer__top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            back to top <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
