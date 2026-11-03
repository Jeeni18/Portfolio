/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F7EEDB',
        blush: '#F8DDE8',
        rose: '#EBC4D5',
        plum: {
          DEFAULT: '#493744',
          dark: '#2E222B',
        },
        lilac: '#D8DCEB',
        paper: '#FFFDF8',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['"Work Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        hand: ['Caveat', 'cursive'],
        devanagari: ['"Tiro Devanagari Hindi"', 'serif'],
      },
    },
  },
  plugins: [],
}
