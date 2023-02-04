/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,njk,md}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "light",
      "dark"
    ],
  },
  plugins: [require("daisyui"), require("tailwindcss-flip")],
};
