const elasticlunr = require("elasticlunr");

module.exports = function (collection) {
  // what fields we'd like our index to consist of
  var index = elasticlunr(function () {
    this.addField("title");
    this.addField("subtitle");
    this.addField("trip_type");
    this.addField("tags");
    // this.addField("content");
    this.setRef("id");
  });

  collection.forEach((page) => {
    index.addDoc({
      id: page.url,
      title: page.data.title,
      subtitle: page.data.subtitle,
      trip_type: page.data.trip_type,
      tags: page.data.tags
      // ,content: page.templateContent
    });
  });

  return index.toJSON();
};