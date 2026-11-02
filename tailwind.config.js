/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#121110',
          900: '#171615',
          800: '#1e1c1a',
          700: '#2d2a26',
          // 600/500 raised from #4a4338/#6b655c to meet ~4.5:1 contrast
          // against the #121110 background (WCAG AA for normal text)
          600: '#857e71',
          500: '#938c7f',
          400: '#a39c8f',
          100: '#ece6da',
        },
        rust: {
          600: '#a9642f',
          500: '#d9823f',
          400: '#e6a369',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
