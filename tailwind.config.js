/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,njk,md}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("tailwindcss-flip")],
};
