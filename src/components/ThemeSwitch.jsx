import React from 'react'
import { useTheme, setTheme } from '../hooks/useTheme'

// "dark · light" in the nav's mono: the active mode underlined, the other
// dimmed. One button that toggles; aria-pressed is true in light mode.
// Styles: .theme-switch in theme.css.
export default function ThemeSwitch({ className = '' }) {
  const theme = useTheme()
  const light = theme === 'light'
  return (
    <button
      type="button"
      className={`theme-switch ${className}`}
      onClick={() => setTheme(light ? 'dark' : 'light')}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-pressed={light}
    >
      <span className={`theme-switch__opt ${light ? '' : 'theme-switch__opt--on'}`}>dark</span>
      <span className="theme-switch__dot" aria-hidden="true">·</span>
      <span className={`theme-switch__opt ${light ? 'theme-switch__opt--on' : ''}`}>light</span>
    </button>
  )
}
