import React from 'react'
import { useLanguage } from '../hooks/useLanguage'

export default function LanguageToggle({ className = '' }) {
  const { lang, setLang } = useLanguage()

  return (
    <div className={className}>
      <div
        className="inline-flex items-center border-2 border-plum rounded-full p-0.5"
        role="group"
        aria-label="Language"
      >
        <button
          type="button"
          onClick={() => setLang('en')}
          aria-pressed={lang === 'en'}
          className={`px-3 py-1.5 rounded-full font-mono text-xs transition-colors ${
            lang === 'en' ? 'bg-plum text-cream' : 'text-plum hover:text-plum-dark'
          }`}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => setLang('ne')}
          aria-pressed={lang === 'ne'}
          lang="ne"
          className={`px-3 py-1.5 rounded-full font-devanagari text-xs transition-colors ${
            lang === 'ne' ? 'bg-plum text-cream' : 'text-plum hover:text-plum-dark'
          }`}
        >
          नेपाली
        </button>
      </div>
      {lang === 'ne' && (
        <span
          className="tag border-dashed mt-1.5 block w-fit"
          title="Nepali text on this page is a draft translation, not yet verified by a Nepali speaker"
        >
          [TODO: verify Nepali translation]
        </span>
      )}
    </div>
  )
}
