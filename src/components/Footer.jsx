import React from 'react'
import { ArrowUp } from 'lucide-react'
import { site, footer, socials } from '../data/content'
import CopyEmailButton from './CopyEmailButton'

const iconLink =
  'w-10 h-10 border border-ink/25 rounded-full flex items-center justify-center text-ink/80 hover:bg-wine hover:text-cream hover:border-wine transition-colors duration-200'

export default function Footer() {
  return (
    <footer className="tone-light bg-cream relative overflow-hidden">
      {/* A single nod to Nepali dhaka weave */}
      <div className="dhaka" aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-12">
        <p className="api-label mb-6">09 — Contact</p>
        <h2 className="font-display text-ink leading-[0.95] tracking-tight mb-6 max-w-3xl" style={{ fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}>
          Let&rsquo;s build something <em className="italic text-wine">reliable</em>.
        </h2>
        <p className="font-body text-ink/70 text-[16px] mb-12 max-w-md">
          {footer.tagline}
        </p>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-24">
          <CopyEmailButton />
          <a href={`mailto:${footer.email}`} className="btn-secondary">
            {footer.email}
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-ink/15">
          <p className="font-mono text-[11px] uppercase tracking-wider text-ink/50 text-center">
            © {new Date().getFullYear()} {site.name}
          </p>

          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={iconLink}
              >
                <social.icon size={15} strokeWidth={1.5} />
              </a>
            ))}

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={iconLink}
              aria-label="Back to top"
            >
              <ArrowUp size={15} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
