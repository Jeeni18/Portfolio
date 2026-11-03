import React from 'react'
import { ArrowUp } from 'lucide-react'
import { site, footer, socials } from '../data/content'
import CopyEmailButton from './CopyEmailButton'

export default function Footer() {
  return (
    <footer className="relative border-t-2 border-plum bg-paper">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-display text-4xl md:text-5xl text-plum mb-3">
          Let&rsquo;s build something <em className="italic">reliable</em>.
        </h2>
        <p className="font-mono text-xs text-plum/70 mb-8">
          {footer.tagline}
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-12">
          <CopyEmailButton />
          <a href={`mailto:${footer.email}`} className="font-body text-sm text-plum/80 hover:text-plum underline underline-offset-4">
            {footer.email}
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-plum/20">
          <p className="font-mono text-xs text-plum/60 text-center">
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
                className="w-9 h-9 border-2 border-plum rounded-full flex items-center justify-center text-plum hover:bg-plum hover:text-cream transition-all duration-200"
              >
                <social.icon size={15} />
              </a>
            ))}

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-9 h-9 border-2 border-plum rounded-full flex items-center justify-center text-plum hover:bg-plum hover:text-cream transition-all duration-200"
              aria-label="Back to top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
