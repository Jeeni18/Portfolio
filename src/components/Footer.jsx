import React from 'react'
import { ArrowUp } from 'lucide-react'
import { site, footer, socials } from '../data/content'

export default function Footer() {
  return (
    <footer className="relative border-t border-ink-800">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-display font-semibold text-base text-ink-100 mb-1">
              {site.name}
            </p>
            <p className="font-mono text-[11px] text-ink-500">
              {footer.tagline}
            </p>
          </div>

          <p className="font-mono text-[11px] text-ink-600 text-center">
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
                className="w-9 h-9 border border-ink-700 flex items-center justify-center text-ink-500 hover:text-rust-500 hover:border-rust-500 transition-all duration-200"
              >
                <social.icon size={15} />
              </a>
            ))}

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-9 h-9 border border-ink-700 flex items-center justify-center text-ink-500 hover:text-rust-500 hover:border-rust-500 transition-all duration-200"
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
