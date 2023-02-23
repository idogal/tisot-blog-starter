/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,njk,md}"],
  theme: {
    fontFamily: {
      //sans: ['Helvetica', 'Arial', 'sans-serif'],
      alef: ['Alef', 'sans'],
      poppins: ['Poppins', 'sans-serif']
    },
    extend: {},
  },
  daisyui: {
    themes: ["business", "corporate"],
    rtl: true,
    darkTheme: "business",
  },
  plugins: [require("daisyui"), require("tailwindcss-flip")],
};
