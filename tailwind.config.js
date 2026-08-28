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
          50: '#F2F8F9',
          100: '#E4F1F3',
          200: '#C8E3E7',
          300: '#9DCED5',
          400: '#67AFC0',
          500: '#3D8B9B',
          600: '#2C6975', // Primary brand color
          700: '#245660',
          800: '#1D454D',
          900: '#16363D',
          950: '#0E2226',
        },
        sage: {
          50: '#F4FAF8',
          100: '#E7F5F1',
          200: '#CEEAE2',
          300: '#A9DACD',
          400: '#83C7B6',
          500: '#68B2A0', // Secondary / accent
          600: '#4D9684',
          700: '#3C7869',
          800: '#305F54',
          900: '#274D44',
        },
        surface: {
          light: '#F8FAF9',
          card: '#FFFFFF',
          muted: '#F1F5F4',
          border: '#E2EAE7',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 12px -2px rgba(44, 105, 117, 0.08), 0 1px 4px -1px rgba(44, 105, 117, 0.04)',
        'card': '0 4px 20px -2px rgba(44, 105, 117, 0.07), 0 2px 6px -1px rgba(44, 105, 117, 0.03)',
        'elevated': '0 10px 30px -4px rgba(44, 105, 117, 0.12), 0 4px 10px -2px rgba(44, 105, 117, 0.06)',
        'nav': '0 -4px 20px 0 rgba(44, 105, 117, 0.06)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out forwards',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 2s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      }

    },
  },
  plugins: [],
}
