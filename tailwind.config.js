/** @type {import('tailwindcss').Config} */

// "Departure board" design system. The eight named tokens below are the
// palette; nothing else should introduce a colour. Role tokens (ink /
// paper / wine / dusty / bone / wine-*) are kept only until the remaining
// sections are restyled in round 2.
const role = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design tokens
        charcoal: '#29232A',        // page / hero wall, dark blades
        'charcoal-deep': '#1F1A20', // floor, alternate section background
        'board-black': '#121013',   // board face, hinge line on dark blades
        oxblood: '#35101E',         // board frame + legs, alternate section background
        burgundy: '#641D35',        // name text, header rule, status blades
        rose: '#8D5365',            // small mono labels, thin lines, floor line
        'dusty-pink': '#D5B7B8',    // nav links, secondary text on dark, hinge on cream blades
        cream: '#F1E8DD',           // key blades, primary button, light text on dark

        // Legacy roles -- round 2 removes these
        ink: role('ink'),
        paper: role('paper'),
        wine: role('wine'),
        dusty: role('dusty'),
        'wine-deep': '#35101E',
        'wine-rich': '#641D35',
        bone: '#F1E8DD',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['"Work Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
