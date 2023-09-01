const lunr = require("lunr");
const siteConfig = require("../../../_data/site.json");
if (siteConfig.defaultLang === "he") {
  require("./lunr.stemmer.support")(lunr);
  require("./lunr.he")(lunr);
}

const getPagesAsJsonDocs = function(pages) {
  docs = [];

  pages.forEach((page) => {
    doc = {
      id: page.url,
      title: page.data.title,
      subtitle: page.data.subtitle,
      trip_type: page.data.trip_type,
      tags: page.data.tags.join(' '),
      // content: page.templateContent
    };

    docs.push(doc);
  });

  return docs;
}

const searchIndex = function (pages) {
  var index = lunr(function () {
    
    if (siteConfig.defaultLang === "he") {
      this.use(lunr.he);
    }

    this.ref("id");
    this.field("title");
    this.field("subtitle");
    this.field("trip_type");
    this.field("tags");
    // this.field("content");

    docs = getPagesAsJsonDocs(pages);
    docs.forEach((d) => {
      this.add(d);
    }, this);
  });

  return index.toJSON();
};

const searchData = function (pages) {
  const docs = getPagesAsJsonDocs(pages);
  let docsMap = new Map();
  for (const d of docs) {
    docsMap.set(d.id, d);
  }

  return JSON.stringify(Object.fromEntries(docsMap));
};

module.exports = {  
  searchIndex: searchIndex,
  searchData: searchData
};