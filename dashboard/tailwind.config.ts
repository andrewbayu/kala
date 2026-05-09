import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Figtree', '-apple-system', 'sans-serif'],
        mono: ['"DM Mono"', '"Courier New"', 'monospace'],
      },
      colors: {
        'black-1': '#050505',
        'black-2': '#0A0A0A',
        'black-3': '#111111',
        'black-4': '#191919',
        'black-5': '#212121',
        'black-6': '#2A2A2A',
        'white-primary': '#F5F0EB',
        'white-secondary': '#A09896',
        'white-tertiary': '#5A5655',
        crimson: '#9B1C1C',
        'crimson-rich': '#B22222',
        'crimson-dark': '#6B1212',
        orange: '#E07B39',
        'orange-dim': '#A85A28',
        green: '#4ADE80',
      },
      borderColor: {
        subtle: 'rgba(255,255,255,0.06)',
        default: 'rgba(255,255,255,0.10)',
        strong: 'rgba(255,255,255,0.18)',
      },
      borderRadius: {
        card: '12px',
        'card-sm': '8px',
        badge: '4px',
        btn: '8px',
      },
      spacing: {
        '18': '72px',
        '22': '88px',
      },
    },
  },
  plugins: [],
}
export default config
