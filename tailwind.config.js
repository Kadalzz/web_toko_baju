/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#2196F3',
          600: '#1E88E5',
          700: '#1976D2',
          800: '#1565C0',
          900: '#0D47A1',
        },
        secondary: {
          50: '#FAFBFC',
          100: '#F5F7FA',
          200: '#EEF1F6',
          300: '#E4E7EB',
          400: '#CBD2D9',
          500: '#9AA5B1',
          600: '#7B8794',
          700: '#616E7C',
          800: '#4A5568',
          900: '#323F4B',
        },
        accent: {
          DEFAULT: '#FF5252',
        },
        success: {
          DEFAULT: '#4CAF50',
        },
        warning: {
          DEFAULT: '#FFC107',
        },
        error: {
          DEFAULT: '#F44336',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};