import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sand: {
          purple: 'var(--sand-purple)',
          deepPurple: 'var(--sand-deep-purple)',
          orange: 'var(--sand-orange)',
          softOrange: 'var(--sand-soft-orange)',
          bg: 'var(--sand-bg)',
          cardPurple: 'var(--sand-card-purple)',
          cardOrange: 'var(--sand-card-orange)',
          border: 'var(--sand-border)',
          textPrimary: 'var(--sand-text-primary)',
          textSecondary: 'var(--sand-text-secondary)',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        inter: ['var(--font-inter)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
