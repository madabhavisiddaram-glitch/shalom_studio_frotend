/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F5F0',
        champagne: '#E8DFD2',
        charcoal: '#242424',
        gold: { DEFAULT: '#B49A72', dark: '#8C744F', light: '#D7C6AB' },
        forest: '#183229',
        stone: { 500: '#6B6560', 400: '#8A847D' },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { eyebrow: '0.28em' },
      maxWidth: { site: '88rem' },
      transitionTimingFunction: { lux: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      keyframes: { blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } } },
    },
  },
  plugins: [],
}
