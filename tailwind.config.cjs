/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { inter: "Inter" } ,
      colors: {
        primaryColor: '#4B49AC',
        secondaryColor: '#E46722',
        bodyColor:"#F2F4F9"
      },
      backgroundColor: {
         "yellow-800": '#DB710E',
         "blue-800" : '#4B49AC'
      },
    },
  },
  plugins: [],
});
