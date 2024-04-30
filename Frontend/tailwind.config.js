/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "lightgray": "#D9D9D9",
        "gray": "#9c9c9c",
        "orange": "#f48915",
        "darkGray": "#464D53",
        "caloryCard": "#656565",
        "planCard": "linear-gradient(210.41deg, #fa5042 1.14%, #ffa739 100.75%)",
        "appColor": "#3c3f45"
      }
    },
  },
  
  plugins: [require("daisyui")],
}

