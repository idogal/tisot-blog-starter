# "Tisot" - An 11ty Blog Template And Starter Kit With RTL Support

## Introduction

This is a template for a blog website. It adheres (mostly) to the [JAMStack](https://jamstack.org/) web development architectural pattern.

Generally speaking - this is not just a simple HTML boilerplate. This code is meant to serve as a basis for a potentially "real" (production) website, that serves editable content.

The template is adapted to support RTL and supports the Hebrew language specifically out of the box.

You are encouraged to contact me if you wish the improve the functionality or UI usability or visibility (or to use GitLab's issue tracker).

### Demo

https://ido.g.gitlab.io/idog-blog-daisyui/

You can also refer to a production website using this template at: https://www.tisot.info/

## Technologies / Dependencies

This project is based on, or using, the following list if items.

- [11ty](https://www.11ty.dev/) (Eleventy) - as the [static site generator](https://jamstack.org/generators/).
- [Netlify CMS](https://www.netlifycms.org/) as a GIT based, [headless CMS](https://jamstack.org/headless-cms/).
- [Tailwind CSS](https://tailwindcss.com/) as the UI framework. Tailwind is a 'utility-first CSS framework'. I find this methodology easy to work with, as you build things in a 'botton-up' approach.
- [daisyUI](https://daisyui.com/) - A UI kit for Tailwind CSS.
- [CSS Theme Change](https://github.com/saadeghi/theme-change). Used for easier CSS theme switching.
- [eleventy-plugin-i18n](https://github.com/adamduncan/eleventy-plugin-i18n). An Eleventy plugin to assist with internationalization and dictionary translations.
- [eleventy-plugin-toc](https://github.com/jdsteinbach/eleventy-plugin-toc). An Eleventy plugin for the generation of a Table of Contents from the content (MD) files. 
- Making use of the [markdown-it](https://github.com/markdown-it/markdown-it) & [markdown-it-anchor](https://www.npmjs.com/package/markdown-it-anchor) parser to set ID values for the TOC items, and the [markdown-it-image-figures](https://github.com/Antonio-Laguna/markdown-it-image-figures) to caption images inside posts.
- [tailwindcss-flip] for RTL support, in addition to the built in support by DaisyUI, and in addition to custom improvements and support that the library lacks.

## License

This template is licensed with the [MIT License](https://en.wikipedia.org/wiki/MIT_License). It means that you can just freely use this code, but I do not hold ANY LIABILITY.

Please read the details of the license yourself.

## How to use

### Install Node.js
You should have [Node.js](https://nodejs.org/en/), version 18, installed on your own development machine.

### Setup the repo
Clone this repository to your machine.

```
git clone https://github.com/danurbanowicz/eleventy-netlify-boilerplate.git my-ownblog-name
```

Install the project's node dependencies. 

```
npm install
```

Run 11ty on a local server by:
``` 
npm run start
```

, or alternatively only build by using:

``` 
npm run build
```

### Configure the site

#### Step 1: Set up the `site` configuration file

Go the the `\src\_data\site.json` file. Here you can set up the following things:

  - **name**. Changes the name in the navbar and, the `title` meta property, and a couple of additional places in the site.
  - **subtitle**. Changes the site's meta `description`.
  - **siteUrl**. Controls related values during the build process.
    - In dev mode, this url is the prefix, while the `sitePath` can server as a suffix.
    - For local development, leave as it is. 
    - In production mode, this is the complete and final url value.
    - If you deploy to any web hosting service, set to the url that is provided to you, or that you use with a domain registrar. 
  - **sitePath**. A suffix for local development or deployment to services such as GitLab Pages.
    - For example, if your repository sits in `c:\dev\my-blog`, set to `my-blog`.
    - If you repo is served from `http://myusername.gitlab.io/my-blog/`, set to `my-blog`.
    - If you have deployed to some hosting service, such as GitLab Pages, and your website is accessible from a registered domain such as `https://www.myblog.io`, this value is ignored.
  - **keywords**. This will be the `keywords` meta value for pages that do not override this value, such as blog post pages.
  - **disqusEnabled & disqusShortname**. Used for disqus integration.
  - **defaultLang**. The language of the website. As of now, only _English_ (`en`) and _Hebrew_ (`he`) are supoprted. Only a single language is supported at a time.
  - **productionMode**. Once set to `true`, in addition to the `env.devMode` being `false`,
    - The `robots` file in generated.
    - The `sitemap` is generated.
  - **posts**
    - **tocOpenAsDefault**. If set to `true`, the TOC is expanded as default.
  - **footer**
    - **BuiltBy**. Refers to a translated value inside the `index.js` file. Change the value `footer_built_by_i18n` inside the `index.js` to your desired footer value.
    - **allRightsReserved**. Refers to a translated value inside the `index.js` file. Change the value `footer_copyright_i18n` inside the `index.js` to your desired footer value.
    - `enableCopyrightText`. If `true`, adds the copyright value to the footer's text.
    - `repoUrl`. Refers to your git repo inside the footer. Set if wanted.
    - `repoMessage`. Refers to a translated value inside the `index.js` file. Change the value `repo_message_i18n` inside the `index.js` to your desired footer value.
  - **contact**. 
    - **enableContactForm**. If true, enabled a [FormSubmit](https://formsubmit.co/) based form. Turned off by default. If enabled, please set up the related translated values inside `index.js`.
    - **emailAddress**. Set to your E-Mail address, if you wish it to show up in the contact page.
  - **social**.
    - **useColourForIcons**. If true, social icons will be coloured. Else, in grey.
    - **showSocialIcons**. If true, social share icons are displayed on the top of a blog post.

#### Step 2: Review and adapt the translation file

Translated values for the _eleventy-plugin-i18n_ plugin are located inside the `src\_data\translations\index.js` file.

This value also contains a couple of **customised message values**, as follows:
  - footer_built_by_i18n
  - footer_copyright_i18n
  - repo_message_i18n
  - your_name_question_i18n
  - your_email_question_i18n
  - subject_question_i18n
  - subject_question_placeholder_i18n
  - msg_question_i18n
  - msg_question_placeholder_i18n
  - image_by_i18n
  - not_found_1_i18n
  - not_found_2_i18n

**It is recommended to review those values** and changing them if wished for or needed.

#### Step 3: Review the `env` file

This file contains the `customUrlMode` flag. If the site is deployed into a web host, and uses a registered domain such as `www.myblog.io`, please set as `true`.

#### Step 4: Run

Use `npm run build` to build the site, or `npm run dev` to run the site on a local dev host.

## How to add content or customise

### The Structure of The Project

#### Folder structure

General overview:

  - The `src` folder contains all development related files.
  - After running the `build` or `dev` commands, a `public` folder gets created under the root. This folder contains the built website.
  - the `node_modules` folder gets created after running `npm install`.

The `src` folder:

  - The `_data` folder contains `js` or `json` files with configuration values.
  - The `_includes` folder contains the main layout files.
  - The `admin` folder contains the Netlify CMS files. For more information, refer to their [documentation](https://decapcms.org/docs/intro/).
  - `assets`
    - `code`
      - `css`. Contains a `custom.css` file that is copied to the built site.
      - `filters`. Contains `11ty` filters. Used in build-time, not copied to the final site.
      - `js`. Contains various javascript files that are copied to the final site.
    - `img`. This folder contains the various images that the site uses. Those are copied to the final site.
  - `social`. Contains an MD for each social sharing icon.
  - `pages`. Contains a couple of general pages (that are not part of a collection), such as the _about_ page, the _home_ page, the _privacy policy_ and _terms of use_ pages, and the _contact_ page. Those are MD files, that are wired to a template in the `_includes\layouts` folder.
  - `posts`. Contains a collection of _post_ pages. Add new MD files to add posts.

#### Navigation

To add new items (or to remove existing ones) to the *main navigation* bar, customise the `src\_data\navigation.json` file.

To add new items (or to remove existing ones) to the *footer*, customise the `src\_data\navigation_footer.json` file.

#### Templating methodology

This site uses 11ty's default [Nunjucks](https://mozilla.github.io/nunjucks/getting-started.html) templating language. Structural file in the `src` folder are `njk` files that are generated into `html` files in the `public` folder.

Content is composed inside `md` (Markdown) files with a _Front Matter_ (`yaml`) header, that contains various properties.

### How to Change Translated Values of Add a New Language?

  - Go to the `src\_data\locales.js` file. Add or remove languages if desired.
  - Go to the `src\_data\translations\index.js` file. Change or add values.
  - Go to the `src\_data\site.json` file. Set the `defaultLang` property accordingly.
  - Examine the lines in the `.eleventy.js` file that use the `i18n` and the `EleventyI18nPlugin` values. 

### How to Add a new Blog Post

  - Add a new `md` file to `src\posts`.
  - Set the following properties in the Front Matter header:
    - **title**. Mandatory. This titles shows up both in the post and in the posts  grid in the blog page or in the home page. 
    - **subtitle**. Not mandatory, but recommended. Same as the title.
    - **published_by**. Not mandatory, but recommended.
    - **date**. The modification date of the article. Defaults to _Last Modified_.
    - **publish_date**. Not mandatory, but recommended. The publication date of the article. Format: `2023-01-01T00:00:00`.
    - **trip_date**. Not mandatory. The date of the actual trip itself. For example, we might want to create a post in May 2023 for a trip that we have had in December 2022. Format: `2023-01-01T00:00:00`. 
    - **trip_type**. Not mandatory. A String value. Should contain values such as "couple", "solo", "backpacking", etc. Up to you.
    - **trip_length_days**. Not mandatory.
    - *thumbnail*
      - **thumbnail**. Not mandatory, but recommended. A url of a thumbnail for the posts grid or home page. The url should point to a file inside the `src` folder (not in the `public` folder!).
      - **thumbnail_show_caption**. Not mandatory. `false` (default) if you do not want a caption of the thumbnail, `true` if you do.
      - **thumbnail_caption_text**. Not mandatory. Text for the caption of the thumbnail.
    - *head image*, works similarly to the thumbnail.
      - **head_image**
      - **head_image_show_caption**
      - **head_image_caption_text**
    - **show_toc**. Not mandatory. Controls the display of the Table of Contents in an article. Defaults to false. 
    - **tags**. A collection of tags, either as a list or as a comma-separated string. The tags are displayed in the article's header, and are also added to the `keywords` meta property of the post. Not mandatory, but recommended.
    - **keywords**. Works similarly to tags, but not displayed in the article itself. Not mandatory.