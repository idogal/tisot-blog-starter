const tailwindcss = require("tailwindcss");
const { EleventyI18nPlugin } = require("@11ty/eleventy");
const i18n = require("eleventy-plugin-i18n");
const translations = require("./src/_data/translations");

// const postcss = require('postcss');
// const autoprefixer = require('autoprefixer');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "assets/img" });
  eleventyConfig.addPassthroughCopy({ "src/assets/favicon": "assets/favicon" });
  eleventyConfig.addPassthroughCopy({ "src//assets/code/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src//assets/code/css": "assets/css" });
  eleventyConfig.addPassthroughCopy({
    "src/admin/config.yml": "./admin/config.yml",
  });

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/*.md");
  });

  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      "*": "he",
    },
  });

  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: "he",
  });

  eleventyConfig.addShortcode(
    "photoCredit",
    (photoBy, subtitle) =>
      `<p class="text-xs absolute bottom-0 px-1 py-1 text-neutral-50 bg-slate-500 mix-blend-normal opacity-80 rounded-bl rounded-tr">
        ${photoBy}
        <a href="https://unsplash.com/es/@leoand1?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
        Andrii Leonov
        </a>
        ${subtitle}
        <a href="https://unsplash.com/photos/P5nZwlbTngI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
        Unsplash
        </a>
    </p>`
  );

  // eleventyConfig.addNunjucksAsyncFilter('postcss', (cssCode, done) => {
  //   postcss([tailwindcss(require('./tailwind.config.js')), autoprefixer()])
  //     .process(cssCode)
  //     .then(
  //       (r) => done(null, r.css),
  //       (e) => done(e, null)
  //     );
  // });
  eleventyConfig.addWatchTarget("styles/**/*.css");

  eleventyConfig.addFilter(
    "formattedDate",
    require("./src/assets/code/filters/formattedDate")
  );
  eleventyConfig.addFilter(
    "search",
    require("./src/assets/code/filters/searchFilter")
  );

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
