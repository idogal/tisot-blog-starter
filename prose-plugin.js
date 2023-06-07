const plugin = require("tailwindcss/plugin");

module.exports = plugin.withOptions(() => {
  let replacePropsForUl = function (ulProps) {
    const typographyCssArray = ulProps.css;
    const typographyCss = typographyCssArray[0];
    let ulPropsForRtl = typographyCss.ul;
    ulPropsForRtl.paddingRight = ulPropsForRtl.paddingLeft;
    ulPropsForRtl.paddingLeft = "unset";

    return ulPropsForRtl;
  };

  let replacePropsForQuote = function (typographyProps) {
    const DEFAULT_CSS = typographyProps.DEFAULT.css;
    const typographyCss = DEFAULT_CSS[0];
    let blockquotePropsForRtl = typographyCss.blockquote;
    blockquotePropsForRtl.borderRightColor = blockquotePropsForRtl.borderLeftColor;
    blockquotePropsForRtl.borderRightWidth = blockquotePropsForRtl.borderLeftWidth;
    blockquotePropsForRtl.borderLeftColor = "unset";
    blockquotePropsForRtl.borderLeftWidth = 0;
    return blockquotePropsForRtl;
  };

  let replacePropsForQuoteBySize = function (ulProps) {
    const typographyCssArray = ulProps.css;
    let blockquoteCssForRtl = typographyCssArray[0].blockquote;
    blockquoteCssForRtl.paddingRight = blockquoteCssForRtl.paddingLeft;
    blockquoteCssForRtl.paddingLeft = "unset";
    return blockquoteCssForRtl;
  };    

  let add = function ({ addUtilities, config, variants, theme }) {
    const typographyProps = theme("typography");
    const screenSizes = ["sm", "base", "lg", "xl", "2xl"];

    // Fix UL
    const cssValuesOfUl = new Map();
    screenSizes.forEach((val) => {
      const vName = `[dir=rtl] .prose-${val} :where(ul):not(:where([class~=\"not-prose\"] *))`;
      cssValuesOfUl.set(vName, replacePropsForUl(typographyProps[val]));
    });

    cssValuesOfUl.forEach((value, key) => {
      addUtilities({ [key]: value});
    });

    // Fix blockquote
    const cssValuesOfQuote = new Map();
    const vName = `[dir=rtl] .prose :where(blockquote):not(:where([class~="not-prose"] *))`;
    cssValuesOfQuote.set(vName, replacePropsForQuote(typographyProps));
    cssValuesOfQuote.forEach((value, key) => {
      addUtilities({ [key]: value});
    });

    //
    const cssValuesOfQuoteBySize = new Map();
    screenSizes.forEach((val) => {
      const vName = `[dir=rtl] .${val}\:prose-${val} :where(blockquote):not(:where([class~="not-prose"] *))`;
      cssValuesOfQuoteBySize.set(vName, replacePropsForQuoteBySize(typographyProps[val]));
    });

    cssValuesOfQuoteBySize.forEach((value, key) => {
      addUtilities({ [key]: value});
    });

  };

  return add;
});
