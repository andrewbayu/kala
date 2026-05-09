/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Landing page tokens
        crimson: {
          DEFAULT: '#9B1C1C',
          rich: '#B22222',
          dark: '#6B1212',
          glow: 'rgba(155,28,28,0.15)',
          surface: 'rgba(155,28,28,0.08)',
        },
        orange: {
          kala: '#E07B39',
          dim: '#A85A28',
          glow: 'rgba(224,123,57,0.12)',
        },
        // App / whitepaper tokens
        midnight: '#0C0C14',
        ivory: '#F2EFE6',
        gold: {
          DEFAULT: '#D4A853',
          dim: '#9A7A3A',
          glow: 'rgba(212,168,83,0.15)',
        },
        cinered: '#B83A35',
        indigo: {
          kala: '#6B67D4',
          dim: '#4A47A3',
        },
        surface: '#1A1A28',
        line: '#2A2A3E',
        muted: '#B8B5AA',
        // Shared
        black: {
          1: '#050505',
          2: '#0A0A0A',
          3: '#111111',
          4: '#191919',
          5: '#212121',
          6: '#2A2A2A',
        },
      },
      fontFamily: {
        display: ['Figtree', '-apple-system', 'sans-serif'],
        body: ['Figtree', '-apple-system', 'sans-serif'],
        mono: ['DM Mono', 'JetBrains Mono', 'Courier New', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
        tight: '-0.02em',
        snug: '-0.01em',
        normal: '0em',
        wide: '0.04em',
        wider: '0.08em',
        widest: '0.12em',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
