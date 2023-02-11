# IdoG's Blog Template

## Introduction

This is a template for a blog website. It is meant to server as a base for my future work, and as small gesture to the development community.

This template partially adheres to the [JAMStack](https://jamstack.org/) web development architecture pattern. As development goes, I plan to improve the architectural structure,  to improve the decoupling of data, structure, and logic.

Generally speaking - this is not just a simple HTML boilerplate. This code is meant to serve as a basis for a "real" website that easily serves editable content. As I said - this is a work-on-progress. 

You are encoureged to contact me if you wish the improve the functionality or UI usability or visibility (or to use GitLab's issue tracker).

### Demo

https://ido.g.gitlab.io/idog-blog-daisyui/

## Technologies
- [11ty](https://www.11ty.dev/) (Eleventy) as the [static site generator](https://jamstack.org/generators/).
- [Netlify CMS](https://www.netlifycms.org/) as a GIT based, [headless CMS](https://jamstack.org/headless-cms/).
- [Tailwind CSS](https://tailwindcss.com/) as the UI framework. Tailwind is a 'utility-first CSS framework'. I find this methodology easy to work with, as I get build things in a 'botton-up' approach. The exessive HTML verbosity or complexity is reduced by using a UI kit. 
- [daisyUI](https://daisyui.com/) is a free plugin for Tailwind CSS, Used for cleaner HTML.
- [CSS Theme Change](https://github.com/saadeghi/theme-change). Used for easier CSS theme switching.
- [eleventy-plugin-i18n](https://github.com/adamduncan/eleventy-plugin-i18n). An Eleventy plugin to assist with internationalization and dictionary translations. (Only basically implemented.)

## License

This template is licesed with the [MIT License](https://en.wikipedia.org/wiki/MIT_License). It means that you can just freely use this code, but I do not hold ANY LIABILITY.

Please read the details of the license yourself.

## How to use

### Install Node.js
You should have [Node.js](https://nodejs.org/en/) installed on your own development machine.

### Setup the repo
Clone this repository to your machine.

```
git clone https://github.com/danurbanowicz/eleventy-netlify-boilerplate.git my-ownblog-name
```

Inside the repo's directory, configure the website's details in the following files: 
- `.eleventy.js`
- `\src\_data\site.json`

Install the project's node depedencies. 

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
