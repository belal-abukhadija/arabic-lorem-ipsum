/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--wb-bg)',
        surface: 'var(--wb-surface)',
        sunk: 'var(--wb-sunk)',
        ink: 'var(--wb-ink)',
        muted: 'var(--wb-muted)',
        accent: 'var(--wb-accent)',
      },
      fontFamily: {
        sans: ['var(--wb-font)'],
        arabic: ['var(--wb-font)'],
      },
    },
  },
  plugins: [],
}
