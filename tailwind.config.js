/** @type {import('tailwindcss').Config} */

// Colours are semantic roles backed by CSS variables (see src/index.css),
// so a section wrapped in `.tone-dark` / `.tone-ink` re-maps them and every
// `text-ink`, `bg-cream`, `border-ink/15` inside it inverts automatically.
const role = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Themed roles
        ink: role('ink'),         // foreground text, lines, furniture details
        cream: role('cream'),     // page / section background
        paper: role('paper'),     // raised reading surfaces (cards, screen, modals)
        wine: role('wine'),       // primary action / strong accent
        rose: role('rose'),       // muted labels, metadata
        dusty: role('dusty'),     // highlights, hairline accents

        // Fixed palette values, for things that must not invert
        // (3D scene, projector hardware, modal overlays)
        'wine-deep': '#35101E',
        'wine-rich': '#641D35',
        bone: '#F1E8DD',
        charcoal: '#29232A',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['"Work Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        hand: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
}
