const daisyuiPlugin = require("daisyui");
const tailwindFlipPlugin = require("tailwindcss-flip");
const prosePlugin = require("./prose-plugin");
const typographyPlugin = require("@tailwindcss/typography");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,njk,md}"],
  safelist: [
    'prose-sm',
    'prose-base',
    'prose-lg',
    'prose-xl',
    'prose-2xl',
  ],
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
      strokeWidth: {
        '1': '1px',
        '1.5': '1.5px',
        '2': '2px',
        '2.5': '2.5px',
        '3': '3px',
      }      
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
