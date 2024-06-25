/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#E9F0F5',
        secondary:'#F6485A',
        tertiary:'#AE324B',
        purpleRed:{
          100:'#CF3856',
          200:'#AE324B',
        },
        attrition: {
          100: "#FFE1E1",
          200: "#FF4A4A",
        },

        depart: {
          100: "#ECFBFF",
          200: "#5E9EAF",
        },

        employe: {
          100: "#FDF1EB",
          200: "#FFA87D",
        },
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
  },
  plugins: [],
}