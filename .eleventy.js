const tailwindcss = require("tailwindcss");
const Image = require("@11ty/eleventy-img");
const i18n = require("eleventy-plugin-i18n");
const translations = require("./src/_data/translations");
const siteConfig = require("./src/_data/site.json");
const { EleventyI18nPlugin } = require("@11ty/eleventy");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

const debug = require("debug")("blog-idog");

const sitePath = siteConfig.sitePath;

// const postcss = require('postcss');
// const autoprefixer = require('autoprefixer');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "assets/img" });
  eleventyConfig.addPassthroughCopy({ "src/assets/favicon": "assets/favicon" });
  eleventyConfig.addPassthroughCopy({ "src/assets/code/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
  eleventyConfig.addPassthroughCopy({ "src/assets/code/css": "assets/css" });
  eleventyConfig.addPassthroughCopy({ "src/admin/config.yml": "./admin/config.yml" });
  eleventyConfig.addWatchTarget("styles/**/*.css");

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/*.md");
  });

  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      "*": "en",
    },
  });

  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: "en",
  });

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
    // The base URL: defaults to Path Prefix
    baseHref: sitePath,
    // But you could use a full URL here too:
    // baseHref: "http://example.com/"

    // Comma separated list of output file extensions to apply
    // our transform to. Use `false` to opt-out of the transform.
    extensions: "html",

    // // Rename the filters
    // filters: {
    //   base: "htmlBaseUrl",
    //   html: "transformWithHtmlBase",
    //   pathPrefix: "addPathPrefixToUrl",
    // },    
  });

  eleventyConfig.addShortcode("photoCredit", require("./src/_includes/components/photoCredit.js"));
  eleventyConfig.addShortcode("photoCaption", require("./src/_includes/components/photoCaption.js"));

  // eleventyConfig.addNunjucksAsyncFilter('postcss', (cssCode, done) => {
  //   postcss([tailwindcss(require('./tailwind.config.js')), autoprefixer()])
  //     .process(cssCode)
  //     .then(
  //       (r) => done(null, r.css),
  //       (e) => done(e, null)
  //     );
  // });

  eleventyConfig.addFilter(
    "formattedDate",
    require("./src/assets/code/filters/formattedDate")
  );

  eleventyConfig.addFilter(
    "search",
    require("./src/assets/code/filters/searchFilter")
  );

  async function imageShortcode(src, alt, sizes, cls) {
    let metadata = await Image(src, {
      widths: [600, 1200],
      formats: ['webp', 'jpeg'],
      outputDir: "./public/assets/img/",
      urlPath: `${sitePath}/assets/img/`,
      filenameFormat: function (id, src, width, format, options) {    
        return `${id}-${width}.${format}`;
      }
      // ,sharpOptions: {
      //   options: {
      //     quality: 1
      //   }
      // }
    });
  
    let imageAttributes = {
      alt,
      sizes,
      class: cls,
      loading: "lazy",
      decoding: "async",
    };

    console.log(metadata);
  
    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes);
  }

  eleventyConfig.addAsyncShortcode("headImage", imageShortcode);

  return {
    passthroughFileCopy: true,
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html", "liquid"],
    pathPrefix: sitePath,
    dir: {
      input: "src",
      output: "public",
      data: "_data",
    },
  };
};
