/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        "Aorange": "#f48915",
        "Agrey": "#D9D9D9",
        "Asecondary": "#555",
      }
    },
  },
  plugins: [require("daisyui")],
}

