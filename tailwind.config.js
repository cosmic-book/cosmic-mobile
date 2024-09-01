import { colors } from './src/styles/colors'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors,
      boxShadow: {
        custom: '0px 20px 20px 10px #00000024'
      }
    }
  },
  plugins: []
}
