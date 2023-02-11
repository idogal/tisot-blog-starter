/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,njk,md}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["business", "corporate"],
    rtl: false,
    darkTheme: "business",
  },
  plugins: [require("daisyui"), require("tailwindcss-flip")],
};
