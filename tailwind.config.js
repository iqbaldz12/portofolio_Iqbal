/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        theme: {
          bg: '#050B18', // bg-1
          bgSecondary: '#0A1628', // bg-2
          card: '#0A1628',
          cardHover: '#0F1E38', // bg-3
          purple: '#6C63FF', // accent
          purpleLight: '#A78BFA',
          pink: '#ec4899', // keeping for gradient fallback
          cyan: '#22d3ee', // keeping for badges
          amber: '#F5A623',
          green: '#4ADE80',
          muted: '#94A3B8', // text-2
          mutedLight: '#E8EAF0', // text-1
          text3: '#4B5563', // text-3
          border: 'rgba(108,99,255,0.22)',
          cardBorder: 'rgba(255,255,255,0.07)',
          cardBorderHover: 'rgba(108,99,255,0.38)',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6C63FF 20%, #A78BFA)',
        'gradient-dark': 'linear-gradient(180deg, #050B18 0%, #0A1628 50%, #050B18 100%)',
        'hero-grid': 'linear-gradient(rgba(108,99,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,.055) 1px, transparent 1px)',
        'hero-glow': 'radial-gradient(circle 55vw at 50% 45%, rgba(108,99,255,.09) 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'slide-up': 'slide-up 0.5s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%': { boxShadow: '0 0 20px rgba(108,99,255,0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(108,99,255,0.4)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
