/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  // @ts-ignore
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#14F195',
        'background-light': '#F7F7F7',
        'background-dark': '#121212',
        'gray-light': '#E0E0E0',
        'gray-dark': '#2D2D2D',
        'text-light': '#121212',
        'text-dark': '#F7F7F7',
        'text-gray-light': '#6B7280',
        'text-gray-dark': '#9CA3AF'
      }
    },
    fontFamily: {
      display: ['Inter', 'sans-serif']
    },
    boxShadow: {
      'custom-light':
        '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
      'custom-dark':
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
    }
  },
  plugins: []
};
