/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#55ACEE',    // Primary Brand Blue
          dark: '#292F33',    // Dark Charcoal (Header, Footer, text-dark)
          gray: '#66757F',    // Slate Grey (Meta-info, icons)
          border: '#CCD6DD',  // Light Grey Border
          light: '#E1E8ED',   // Soft Grey Background / Card backgrounds
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
