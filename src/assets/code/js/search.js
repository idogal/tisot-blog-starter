fetch("../search-index.json").then((response) =>
  response.json().then((rawIndex) => {
    window.searchIndex = elasticlunr.Index.load(rawIndex);
  })
);

document.addEventListener("alpine:init", () => {
  Alpine.data("searchInput", () => ({
    inputVal: "",

    getItems(v) {
      const ul = document.getElementById("search_results_ul");
      ul.innerHTML = "";

      const res = window.searchIndex.search(v);

      console.log(res);

      if (res != undefined && res != null) {
        if (res.length > 0) {
          for (let index = 0; index < res.length; index++) {
            const element = res[index];
            if (element.score < 1) {
              continue;
            }

            var refElement = document.createElement("a");
            refElement.setAttribute("href", ".." + element.doc.id);
            refElement.innerHTML = element.doc.title + " - " + element.doc.subtitle;

            var li = document.createElement("li");
            li.setAttribute("class", "hover:bg-secondary-focus  hover:font-bold");
            li.appendChild(refElement);//document.createTextNode();
            ul.appendChild(li);
          }
        }
      }
    },
  }));
});
