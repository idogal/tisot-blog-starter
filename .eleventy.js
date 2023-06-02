const translations = require("./src/_data/translations");
const siteConfig = require("./src/_data/site.json");
const envConfig = require("./src/_data/env.js");

const tailwindcss = require("tailwindcss");
const { EleventyI18nPlugin } = require("@11ty/eleventy");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const Image = require("@11ty/eleventy-img");
const i18n = require("eleventy-plugin-i18n");
const pluginTOC = require('eleventy-plugin-toc')

const markdownIt = require("markdown-it");
const markdownItImgFigures = require("markdown-it-image-figures");
const htmlmin = require("html-minifier");
const slugLimax = require("limax");

const debug = require("debug")("blog-idog");

const sitePath =
  !envConfig.customUrlMode || envConfig.devMode ? siteConfig.sitePath : "";

// const postcss = require('postcss');
// const autoprefixer = require('autoprefixer');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "assets/img" });
  eleventyConfig.addPassthroughCopy({ "src/assets/favicon": "assets/favicon" });
  eleventyConfig.addPassthroughCopy({ "src/assets/code/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
  eleventyConfig.addPassthroughCopy({ "src/assets/code/css": "assets/css" });
  eleventyConfig.addPassthroughCopy({
    "src/admin/config.yml": "./admin/config.yml",
  });
  eleventyConfig.addWatchTarget("styles/**/*.css");

  eleventyConfig.addCollection("posts", function (collectionApi) {
    const posts = collectionApi.getFilteredByGlob("./src/posts/*.md");
    var filteredPosts = posts.filter(post => !post.data.isDraft);
    return filteredPosts;
  });

  eleventyConfig.addCollection("social_icons", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/social/*.md");
  });

	// Return all the tags used in a collection
	eleventyConfig.addFilter("getAllTags", collection => {
		let tagSet = new Set();
		for(let item of collection) {
			(item.data.tags || []).forEach(tag => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
	});


  eleventyConfig.addFilter("slugifyi18n", (val) => {
    if (siteConfig.defaultLang === "he") {
      throw new Error(
        'The value "' +
          val +
          '" cannot be sluggified, "' +
          siteConfig.defaultLang +
          '" is not supported for slugs. Please provide a custom "slug_title" value for the post.'
      );
    }
    return slugLimax(val, { lang: siteConfig.defaultLang });
  });

  eleventyConfig.addFilter("getTop", (postsArray, n) => {
    function compare( a, b ) {
      if ( a.data.publish_date > b.data.publish_date ){
        return -1;
      }

      if ( a.data.publish_date < b.data.publish_date ){
        return 1;
      }
      
      return 0;
    }

    if (!Array.isArray(postsArray) || postsArray.length === 0) {
      return [];
    }

    postsArray.sort(compare);

    if (n < 0) {
      return postsArray.slice(n);
    }

    let x = postsArray.slice(0, n);

    return x;
  });

  eleventyConfig.addPlugin(pluginTOC);

  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      "*": siteConfig.defaultLang,
    },
  });

  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: siteConfig.defaultLang,
  });

  eleventyConfig.addPlugin(EleventyRenderPlugin);

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

  eleventyConfig.addShortcode(
    "photoCredit",
    require("./src/_includes/components/photoCredit.js")
  );
  eleventyConfig.addShortcode(
    "photoCaption",
    require("./src/_includes/components/photoCaption.js")
  );

  eleventyConfig.addShortcode(
    "buildShareUrl",
    require("./src/_includes/components/buildShareUrl.js")
  );

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

  eleventyConfig.addFilter("search", require("./src/assets/code/filters/search_eslunr.js"));

  async function imageShortcode(src, alt, sizes, cls) {
    if (src == undefined) {
      src = "/assets/img/posts/tangerine-chan-cjcD8rFvGHc-unsplash_resized.jpg";
    }

    let imgUrl = "./src" + src;
    if (sizes == undefined ) {
      sizes = "100vw";
    }

    let metadata = await Image(imgUrl, {
      widths: [432, 617, 712, "auto"],
      formats: ["webp", "auto"],
      outputDir: "./public/assets/img/",
      urlPath: `/assets/img/`,
      filenameFormat: function (id, imgUrl, width, format, options) {
        return `${id}-${width}.${format}`;
      },
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

    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes);
  }

  eleventyConfig.addAsyncShortcode("image", imageShortcode);

  const mdLib = markdownIt({})
    .use(markdownItImgFigures, { figcaption: true })
    .use(require('markdown-it-anchor'), {});

  eleventyConfig.setLibrary("md", mdLib);

  eleventyConfig.addTransform("htmlmin", function (content) {
    if (this.page.outputPath && (this.page.outputPath.endsWith(".html") || this.page.outputPath.endsWith(".xml"))) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

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
