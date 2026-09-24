/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0B3B60',
          navyDark: '#07243B',
          navyLight: '#1B4D7E',
          saffron: '#D9531E',
          saffronLight: '#FFF4ED',
          green: '#137333',
          greenLight: '#E6F4EA',
          emergency: '#B91C1C',
          emergencyLight: '#FEE2E2',
          warning: '#B45309',
          warningLight: '#FEF3C7',
          gray: {
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
