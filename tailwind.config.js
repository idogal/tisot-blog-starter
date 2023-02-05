/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,njk,md}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "business",
      "corporate"
    ],
  },
  plugins: [require("daisyui"), require("tailwindcss-flip")],
};
