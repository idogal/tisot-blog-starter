const MIN_SEARCH_SCORE = 0.5;

let searchIndex = null;
let searchData = null;
let isDataLoadingFinished = false;
let isIndexLoadingFinished = false;

fetch("../search-index.json")
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then((rawIndex) => {
    searchIndex = lunr.Index.load(rawIndex);
    console.debug("Loaded search index");
    isIndexLoadingFinished = true;
    toggleSearchLoadingState();
  })
  .catch((err) => {
    console.error("Failed to load search index:", err);
    showSearchError();
  });

fetch("../search-data.json")
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then((rawData) => {
    searchData = new Map(Object.entries(rawData));
    console.debug("Loaded search data");
    isDataLoadingFinished = true;
    toggleSearchLoadingState();
  })
  .catch((err) => {
    console.error("Failed to load search data:", err);
    showSearchError();
  });

function getItems(inputValue) {
  const ul = document.getElementById("search_results_ul");
  ul.replaceChildren();

  const searchResults = searchIndex.search(inputValue);
  if (!searchResults || searchResults.length === 0) {
    showNoResults(ul);
    return;
  }

  let hasVisibleResults = false;
  for (const searchResult of searchResults) {
    if (searchResult.score < MIN_SEARCH_SCORE) {
      continue;
    }

    hasVisibleResults = true;
    const key = searchResult.ref;
    const resultEntryData = searchData.get(key);
    const title = resultEntryData?.title ?? key;
    const subtitle = resultEntryData?.subtitle;

    const refElement = document.createElement("a");
    refElement.setAttribute("href", ".." + searchResult.ref);

    const titleSpan = document.createElement("span");
    titleSpan.appendChild(document.createTextNode(title));
    titleSpan.setAttribute("class", "font-bold");
    refElement.appendChild(titleSpan);

    if (subtitle) {
      refElement.appendChild(document.createTextNode(": "));
      const subtitleSpan = document.createElement("span");
      subtitleSpan.appendChild(document.createTextNode(subtitle));
      refElement.appendChild(subtitleSpan);
    }

    const li = document.createElement("li");
    li.setAttribute("class", "hover:bg-secondary-focus hover:underline");
    li.appendChild(refElement);
    ul.appendChild(li);
  }

  if (!hasVisibleResults) {
    showNoResults(ul);
  }
}

function showNoResults(ul) {
  const message = ul.dataset.noResults || "No results found.";
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(message));
  li.setAttribute("class", "text-base-content/60 italic");
  if (document.documentElement.dir === "rtl") {
    li.style.textAlign = "right";
  }
  ul.appendChild(li);
}

function showSearchError() {
  const searchInputLoadingSpinner = document.getElementById("searchInputLoadingSpinner");
  if (searchInputLoadingSpinner) {
    searchInputLoadingSpinner.classList.add("hidden");
  }

  const searchResults = document.getElementById("search_results_ul");
  if (searchResults) {
    const message = searchResults.dataset.searchError || "Search is unavailable. Please try again later.";
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(message));
    li.setAttribute("class", "text-error italic");
    searchResults.appendChild(li);
  }
}

function toggleSearchLoadingState() {
  if (isIndexLoadingFinished && isDataLoadingFinished) {
    console.debug("Search loading finished, activating search input");
    const searchInputTextBox = document.getElementById("searchInputTextBox");
    const searchInputLoadingSpinner = document.getElementById("searchInputLoadingSpinner");

    searchInputLoadingSpinner.classList.add("hidden");
    searchInputTextBox.classList.remove("hidden");
  } else {
    console.debug("Search loading not finished");
  }
}