// const postcss = require('postcss');
const tailwindcss = require("tailwindcss");
// const autoprefixer = require('autoprefixer');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "assets/img" });
  eleventyConfig.addPassthroughCopy({ "src/assets/favicon": "assets/favicon" });

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi    
    .getFilteredByGlob('./src/posts/*.njk');
  });

  // eleventyConfig.addNunjucksAsyncFilter('postcss', (cssCode, done) => {
  //   postcss([tailwindcss(require('./tailwind.config.js')), autoprefixer()])
  //     .process(cssCode)
  //     .then(
  //       (r) => done(null, r.css),
  //       (e) => done(e, null)
  //     );
  // });
  eleventyConfig.addWatchTarget("styles/**/*.css");

  return {
    passthroughFileCopy: true,
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html", "liquid"],
    pathPrefix: "",
    dir: {
      input: "src",
      output: "dist",
      data: "_data",
    },
  };
};
