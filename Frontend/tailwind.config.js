/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        "orange": "#f48915",
        "grey": "#D9D9D9",
        "secondary": "#555",
      }
    },
  },
  plugins: [require("daisyui")],
}

