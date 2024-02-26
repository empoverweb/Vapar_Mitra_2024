/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { inter: "Inter" } ,
      colors: {
        primaryColor: '#00873F',
        secondaryColor: '#E46722',
      },
    },
  },
  plugins: [],
});
