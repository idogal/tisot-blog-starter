const plugin = require("tailwindcss/plugin");
const flatMap = require("lodash.flatmap");

module.exports = plugin.withOptions(() => {
  let replaceProps = function (ulProps) {
    const typographyCssArray = ulProps.css;
    const typographyCss = typographyCssArray[0];
    let ulPropsForRtl = typographyCss.ul;
    ulPropsForRtl.paddingRight = ulPropsForRtl.paddingLeft;
    ulPropsForRtl.paddingLeft = "unset";

    return ulPropsForRtl;
  };

  let add = function ({ addUtilities, config, variants, theme }) {
    const typographyProps = theme("typography");
    const screenSizes = ["sm", "base", "lg", "xl", "2xl"];

    // const cssValues = new Array();
    // screenSizes.forEach((val) => {
    //   const vName = `[dir=rtl] .prose-${val} :where(ul):not(:where([class~=\"not-prose\"] *))`;
    //   v = {
    //     [vName]: replaceProps(typographyProps[val]),
    //   };

    //   cssValues.push(v);
    // });

    const cssValues = new Map();
    screenSizes.forEach((val) => {
      const vName = `[dir=rtl] .prose-${val} :where(ul):not(:where([class~=\"not-prose\"] *))`;
      cssValues.set(vName, replaceProps(typographyProps[val]));
    });

    cssValues.forEach((value, key) => {
      addUtilities({ [key]: value});
    });


    // const generators = [
    //   (size, modifier) => ({
    //     [`[dir=rtl] .mr-${modifier}`]: {
    //       "margin-left": `${size}`,
    //       "margin-right": "unset",
    //     },
    //     [`[dir=rtl] .ml-${modifier}`]: {
    //       "margin-left": "unset",
    //       "margin-right": `${size}`,
    //     },
    //   }),
    // ];

    // const utilities = flatMap(generators, (generator) => {
    //   return flatMap(theme("margin"), generator);
    // });

    // console.log(utilities[1]);
    // addUtilities(utilities, variants("margin"));
  };

  return add;
});
