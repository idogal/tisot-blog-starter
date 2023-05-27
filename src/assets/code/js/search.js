fetch("/idog-blog-daisyui/search-index.json").then((response) =>
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

            var li = document.createElement("li");
            li.appendChild(document.createTextNode(element.doc.title + " - " + element.doc.subtitle));
            ul.appendChild(li);
          }
        } else {
          
        }

      }

      //   const filterItems = this.sourceData.filter((item) => {
      //     return item.employee_name
      //       .toLowerCase()
      //       .startsWith(this.search.toLowerCase());
      //     //return item.employee_name.toLowerCase().includes(this.search.toLowerCase())
      //   });

      //   if (
      //     filterItems.length < this.sourceData.length &&
      //     filterItems.length > 0
      //   ) {
      //     this.isOpen = true;
      //     return filterItems;
      //   } else {
      //     this.isOpen = false;
      //   }
    },
  }));
});
