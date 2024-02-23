const withMT = require("@material-tailwind/react/utils/withMT"); 
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "vyaparmitra/node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "vyaparmitra/node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { inter: "Inter" } ,
      colors: {
        primaryColor: '#00873F',
      },
    },
  },
  plugins: []
});
