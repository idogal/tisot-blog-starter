const daisyuiPlugin = require("daisyui");
const tailwindFlipPlugin = require("tailwindcss-flip");
const prosePlugin = require("./prose-plugin");
const typographyPlugin = require("@tailwindcss/typography");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,njk,md}"],
  theme: {
    fontFamily: {
      sans: ["Alef", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", 
             "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            div: {
              "line-height": "1.5rem;"
            },
            p: {              
              "text-align": "justify;"
            }
          },
        },
      },
    },
  },
  daisyui: {
    themes: ["business", "corporate"],
    rtl: true,
    darkTheme: "business",
  },
  plugins: [
    daisyuiPlugin,
    tailwindFlipPlugin,
    prosePlugin,
    typographyPlugin
  ],
};
