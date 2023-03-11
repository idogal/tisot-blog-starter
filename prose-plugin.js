const plugin = require("tailwindcss/plugin");

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

    const cssValues = new Map();
    screenSizes.forEach((val) => {
      const vName = `[dir=rtl] .prose-${val} :where(ul):not(:where([class~=\"not-prose\"] *))`;
      cssValues.set(vName, replaceProps(typographyProps[val]));
    });

    cssValues.forEach((value, key) => {
      addUtilities({ [key]: value});
    });
  };

  return add;
});
