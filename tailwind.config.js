const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Delicious Handrawn"],
      },
      colors: {
        primary: colors.blue[700],
        "primary-hovered": colors.blue[800],
      },
      screens: {
        "3xl": "1792px",
        "4xl": "2048px",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        spin: "spin 1s linear infinite",
      },
    },
  },
  plugins: [],
};
