const tailwindcss = require("tailwindcss");
const i18n = require("eleventy-plugin-i18n");
const translations = require("./src/_data/translations");

// const postcss = require('postcss');
// const autoprefixer = require('autoprefixer');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "assets/img" });
  eleventyConfig.addPassthroughCopy({ "src/assets/favicon": "assets/favicon" });
  eleventyConfig.addPassthroughCopy({ "src//assets/code/public": "assets/js" });

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/*.njk");
  });

  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      "*": "en-GB",
    },
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

  eleventyConfig.addFilter("formattedDate", require("./src/assets/code/filters/formattedDate"));
  eleventyConfig.addFilter("search", require("./src/assets/code/filters/searchFilter"));

  return {
    passthroughFileCopy: true,
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html", "liquid"],
    pathPrefix: "/idog-blog-daisyui/",
    dir: {
      input: "src",
      output: "public",
      data: "_data",
    },
  };
};
