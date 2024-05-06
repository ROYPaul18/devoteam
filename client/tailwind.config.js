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
        
        purpleRed:'#AE324B',

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
      }
      
    },
  },
  plugins: [],
}