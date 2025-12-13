/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        editorial: ['"Merriweather"', 'serif'],
        comic: ['"Permanent Marker"', 'cursive'],
        hand: ['"Patrick Hand"', 'cursive'],
      },
      boxShadow: {
        'ink': '3px 3px 0px 0px #2a2a2a',
        'ink-lg': '6px 6px 0px 0px #2a2a2a',
      },
      colors: {
        'ink': '#2a2a2a',
        'paper': '#fdfbf7',
        'wash-blue': '#a8d1e7',
        'wash-red': '#e89da2',
        'wash-yellow': '#f6e5ae',
      }
    }
  },
  plugins: [],
}
