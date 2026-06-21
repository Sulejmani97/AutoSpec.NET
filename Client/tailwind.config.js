/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require("tailwindcss/colors");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#b90000",
      },
      fontFamily: {
        rubik: "Rubik, sans-serif",
        roboto: "Roboto, sans-serif",
      },
      container: {
        padding: {},
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
});
