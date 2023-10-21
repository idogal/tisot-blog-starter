fetch("../search-index.json").then((response) =>
  response.json().then((rawIndex) => {
    document.searchIndex = lunr.Index.load(rawIndex);
  })
);

fetch("../search-data.json").then((response) =>
  response.json().then((rawIndex) => {
    document.searchData = new Map(Object.entries(JSON.parse(rawIndex)));
  })
);

const getItems = function(inputValue) {
  const ul = document.getElementById("search_results_ul");
  ul.innerHTML = "";

  const searchResults = document.searchIndex.search(inputValue);
  if (searchResults != null && searchResults != undefined) {
    for (let index = 0; index < searchResults.length; index++) {
      const searchResult = searchResults[index];
      const key = searchResult.ref;

      if (searchResult.score < 1) {
        continue;
      }

      const resultEntryData = document.searchData.get(key);
      let refElement = document.createElement("a");
      refElement.setAttribute("href", ".." + searchResult.ref);

      let resultTextHeadDiv = document.createElement("span");
      let resultTextHead = key;
      if (resultEntryData) {
        resultTextHead = resultEntryData.title;
      }

      resultTextHeadDiv.appendChild(
        document.createTextNode(resultTextHead)
      );
      resultTextHeadDiv.setAttribute("class", "font-bold");

      refElement.appendChild(resultTextHeadDiv);

      let resultTextSub = undefined;
      if (resultEntryData) {
        resultTextSub = resultEntryData.subtitle;
      }
      if (resultEntryData) {
        refElement.appendChild(document.createTextNode(": "));
        let resultTextSubDiv = document.createElement("span");
        resultTextSubDiv.appendChild(
          document.createTextNode(resultTextSub)
        );
        refElement.appendChild(resultTextSubDiv);
      }

      let li = document.createElement("li");
      li.setAttribute("class", "hover:bg-secondary-focus hover:underline");
      li.appendChild(refElement);
      ul.appendChild(li);
    }
  }
}