/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
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
    },
  },
  plugins: [],
};

