import React, { useState, useEffect } from 'react'
import { LanguageContext } from './languageContextObject'

const STORAGE_KEY = 'jeeni-portfolio-lang'

function readStoredLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'ne' ? 'ne' : 'en'
  } catch {
    return 'en'
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStoredLang)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // localStorage unavailable (private browsing, etc.) -- language
      // choice just won't persist across visits
    }
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}
