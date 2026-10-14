/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1D2E',
          dark: '#0D1B26',
        },
        medical: {
          DEFAULT: '#0F4C8A',
          dark: '#0D3F75',
          light: '#1D69C4',
        },
        surface: '#F4F7FA',
        line: '#DDE4EC',
        khmerGold: '#B07C2A',
      },
    },
  },
  plugins: [],
};
