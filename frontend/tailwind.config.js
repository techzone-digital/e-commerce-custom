/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic theme colors bound to CSS variables
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
        },
        'text-main': 'var(--color-text-main)',
        'text-secondary': 'var(--color-text-secondary)',
        border: 'var(--color-border)',
        // Retain original brand definitions for backward compatibility if needed
        brand: {
          50: '#fbf9f5',
          100: '#f5f0e6',
          200: '#eadbc4',
          300: '#dec29d',
          400: '#d1a473',
          500: '#c58b52',
          600: '#b17443',
          700: '#945b37',
          800: '#7a4b31',
          900: '#643f2c',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      borderColor: {
        DEFAULT: 'var(--color-border)',
      },
    },
  },
  plugins: [],
};
