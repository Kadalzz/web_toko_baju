/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FAF9F7',
          100: '#F5F3F0',
          200: '#EAE6E0',
          300: '#D5CFC5',
          400: '#B8AFA0',
          500: '#9B8F7C',
          600: '#7E7260',
          700: '#655C4F',
          800: '#4A433A',
          900: '#2D2821',
        },
        cream: {
          50: '#FDFCFB',
          100: '#FAF8F5',
          200: '#F5F1EB',
          300: '#EDE8DF',
          400: '#E4DCD0',
          500: '#D8CFC1',
        },
        taupe: {
          100: '#F0ECE6',
          200: '#E1DAD0',
          300: '#CFC5B8',
          400: '#B5A89A',
          500: '#9A8A7A',
          600: '#7D6E5F',
          700: '#615546',
          800: '#473E33',
        },
        accent: {
          DEFAULT: '#B8956A',
          light: '#D4B896',
          dark: '#9A7A52',
        },
        success: {
          DEFAULT: '#8B9D83',
        },
        warning: {
          DEFAULT: '#D4A574',
        },
        error: {
          DEFAULT: '#C17B6E',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.08)',
        soft: '0 1px 3px rgba(0, 0, 0, 0.06)',
      },
      letterSpacing: {
        luxury: '0.3em',
      },
    },
  },
  plugins: [],
};