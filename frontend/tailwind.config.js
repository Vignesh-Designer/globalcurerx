/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#002b5c',
          navyDark: '#001e40',
          blue: '#004b93',
          blueHover: '#003a73',
          lightBlue: '#eef6fc',
          accentTeal: '#00b4d8',
          accentCyan: '#48cae4',
          badgeBlue: '#005bb5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
