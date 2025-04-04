const translations = require("./src/_data/translations");
const siteConfig = require("./src/_data/site.json");
const envConfig = require("./src/_data/env.js");
const searchFilters = require("./src/assets/code/filters/search_filters.js");

const { EleventyI18nPlugin } = require("@11ty/eleventy");
const i18n = require("eleventy-plugin-i18n");
const pluginTOC = require('eleventy-plugin-toc')
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const Image = require("@11ty/eleventy-img");

const markdownIt = require("markdown-it");
const markdownItImgFigures = require("markdown-it-image-figures");
const markdownItLinkAttrs = require('markdown-it-link-attributes');
const htmlmin = require("html-minifier");
const slugLimax = require("limax");
const parseArgs = require('minimist');

const logger = require("log4js").getLogger();

logger.level = "debug";

const sitePath =
  !envConfig.customUrlMode || envConfig.devMode ? siteConfig.sitePath : "";

module.exports = function (eleventyConfig) {

  let outputDir = "public";
  const argv = parseArgs(process.argv.slice(2));
  if (argv.output) {
    outputDir = argv.output;
  }

  logger.info("Output directory is ", outputDir);
	
  // let subdomain = process.env;
  eleventyConfig.on("eleventy.before", async ({ dir, runMode, outputMode }) => {
		subdomain = process.env;
	});  
  
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "assets/img" });
  eleventyConfig.addPassthroughCopy({ "src/assets/favicon": "assets/favicon" });
  eleventyConfig.addPassthroughCopy({ "src/assets/code/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
  //eleventyConfig.addPassthroughCopy({ "src/assets/code/css": "assets/css" });
  eleventyConfig.addPassthroughCopy({ "build/output.css": "assets/css/output.css" });
  eleventyConfig.addPassthroughCopy({
    "src/admin/config.yml": "./admin/config.yml",
  });
  
  eleventyConfig.addWatchTarget("styles/**/*.css");

  var compareByPublishDateDesc = function compare( a, b ) {
    if ( a.data.publish_date > b.data.publish_date ){
      return -1;
    }

    if ( a.data.publish_date < b.data.publish_date ){
      return 1;
    }

    return 0;
  }

  function getAllPostsForDisplay(collectionApi) {
    return collectionApi
      .getFilteredByGlob("./src/posts/*.md")
      .filter((post) => !post.data.isDraft)
      .filter((post) => post.url);
  }

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return getAllPostsForDisplay(collectionApi).sort(compareByPublishDateDesc);
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
    if (!Array.isArray(postsArray) || postsArray.length === 0) {
      return [];
    }

    postsArray.sort(compareByPublishDateDesc);

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

  eleventyConfig.addFilter(
    "formattedDate2",
    require("./src/assets/code/filters/formattedDate2")
  );

  eleventyConfig.addFilter("stringify", (v) => JSON.stringify(v));
  eleventyConfig.addFilter("search_index", searchFilters.searchIndex);
  eleventyConfig.addFilter("search_data", searchFilters.searchData);

  function removeDuplicateForwardSlashes(val) {
    const parts = val.split("://");
    
    let urlPart = "";
    if (parts.length == 0) {
      return val;
    } else if (parts.length == 1) {
      urlPart = parts[0];
    } else if (parts.length == 2) {
      urlPart = parts[1];
    } else {
      return val;
    }

    let removed = urlPart;
    let found = removed.match("\//");
    while (found) {
      removed = removed.replaceAll("\//", "/");
      found = removed.match("\//");
    }

    if (parts.length == 1) {
      return removed;
    } else if (parts.length == 2) {
      return parts[0] + "://" + removed;
    }
  }

  function removeLastUrlPart(val) {    
    let url = "";
    const isEndsWith = val.endsWith("/");
    if (isEndsWith) {
      url = val.substring(0, val.lastIndexOf('/'));
      url = url.substring(0, url.lastIndexOf('/'));
    } else {
      url = val.substring(0, val.lastIndexOf('/'));
    }

    if (isEndsWith) {
      return url + "/";
    } else {
      return url;
    }
  }

  eleventyConfig.addFilter("removeDuplicateForwardSlashes", removeDuplicateForwardSlashes);
  eleventyConfig.addFilter("removeLastUrlPart", removeLastUrlPart);

  async function imageShortcode(src, alt, sizes, cls) {
    if (src == undefined) {
      src = "/assets/img/posts/tangerine-chan-cjcD8rFvGHc-unsplash_resized.jpg";
    }

    let imgUrl = "./src" + src;
    if (sizes == undefined ) {
      sizes = '(max-width: 768) 100vw, (min-width: 768px) and (max-width: 1278px) 320px, (min-width: 1278px) 640px, 100vw';
    }

    let metadata = await Image(imgUrl, {
      widths: [320, 640, 960, 1280, 1600, 1920],
      formats: ["webp", "jpeg"],
      outputDir: "./" + outputDir + "/assets/img/",
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

  const markdownItProps = {  
  }

  const markdownItImgFiguresProps = { 
    figcaption: true, 
    async: true, 
    lazy: true,
    classes: 'lg:cursor-zoom-in  lg:clickable',
    tabindex: true,
    link: false,
  }

  const mdLib = 
    markdownIt(markdownItProps)
    .use(markdownItImgFigures, markdownItImgFiguresProps)
    .use(markdownItLinkAttrs, { attrs: { target: "_blank", } })
    .use(require('markdown-it-anchor'), {});

  const defaultImageRender = mdLib.renderer.rules.image;

  mdLib.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const imgSrc = "./src" + token.attrGet('src');
    const imgAlt = token.content
    const imgTitle = token.attrGet('title')

    const imgOpts = {
      widths: [320, 640, 1280, 1920],
      formats: ['webp', 'jpeg'],
      outputDir: "./" + outputDir + "/assets/img/posts/",
      urlPath: `/assets/img/`,
    }
  
    const v = Image(imgSrc, imgOpts);
    const metadata = Image.statsSync(imgSrc, imgOpts);
    let generated = Image.generateHTML(metadata, {
      sizes: '(max-width: 960px) 100vw, 1280px',
      alt: imgAlt,
      loading: 'lazy',
      decoding: 'async',
      title: imgTitle,
    });

    generated = 
      generated.replace('<img', `<img onclick="handleNormalPostImageClick(this)"`);

    return generated;
  };  

  eleventyConfig.setLibrary("md", mdLib);

  eleventyConfig.addTransform("htmlmin", function (content) {
    if (this.page.outputPath && (this.page.outputPath.endsWith(".html"))) {
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
      output: outputDir,
      data: "_data",
    },
  };
};
