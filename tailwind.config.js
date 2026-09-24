/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        financial: {
          green: '#10b981', // keep green for positive
          red: '#ef4444', // keep red for negative
          blue: '#000000', // primary actions in black (was white)
          bg: '#ffffff', // Pure white background
          card: '#ffffff', // White cards
          cardHover: '#f4f4f5', // Zinc 100 for hover
          border: '#e4e4e7', // Zinc 200 for borders
          borderHighlight: '#d4d4d8', // Zinc 300 for hover border
          text: '#09090b', // Zinc 950 for pure text (almost black)
          textMuted: '#52525b' // Zinc 600 for muted text
        }
      },
      fontFamily: {
        sans: ['"SF Pro Display"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
