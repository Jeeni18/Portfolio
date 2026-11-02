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
          600: '#4a4338',
          500: '#6b655c',
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
