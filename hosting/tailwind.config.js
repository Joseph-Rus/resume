/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary blue palette
        'primary': {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        // Accent purple/lavender for the blob
        'accent': {
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
        }
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'blob': 'blob-move 25s infinite alternate ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'blob-move': {
          '0%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
          '33%': { transform: 'translate(2%, 2%) scale(1.05) rotate(5deg)' },
          '66%': { transform: 'translate(-2%, -1%) scale(0.95) rotate(-5deg)' },
          '100%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
        },
      },
      backgroundImage: {
        'gradient-soft': 'linear-gradient(135deg, rgb(var(--color-primary-50)) 0%, rgb(var(--color-bg-primary)) 100%)',
        'gradient-blue': 'linear-gradient(135deg, rgb(var(--color-primary-100)) 0%, rgb(var(--color-primary-50)) 100%)',
      }
    },
  },
  plugins: [],
}