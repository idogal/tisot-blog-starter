const daisyuiPlugin = require("daisyui");
const tailwindFlipPlugin = require("tailwindcss-flip");
const typographyPlugin = require("@tailwindcss/typography");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,njk,md}"],
  theme: {
    fontFamily: {
      sans: ["Alef", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", 
             "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
    },
    extend: {},
  },
  daisyui: {
    themes: ["business", "corporate"],
    rtl: true,
    darkTheme: "business",
  },
  plugins: [
    daisyuiPlugin, 
    tailwindFlipPlugin, 
    typographyPlugin
  ],
};
