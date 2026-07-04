/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          black: '#0a0a0a',
          white: '#ffffff',
          gray: {
            50: '#fafafa',
            100: '#f4f4f5',
            200: '#e4e4e7',
            300: '#d4d4d8',
            400: '#a1a1aa',
            500: '#71717a',
            600: '#52525b',
            700: '#3f3f46',
            800: '#27272a',
            900: '#18181b',
          },
          red: '#e11d2e',
          blue: '#1d4ed8',
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: 0.45 },
          '100%': { transform: 'scale(2.5)', opacity: 0 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease forwards',
        ripple: 'ripple 0.6s linear',
      },
    },
  },
  plugins: [],
}
