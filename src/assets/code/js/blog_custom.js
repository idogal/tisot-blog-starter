const tailwindTextSizes = {
  sizes: [
    { className: "text-xs", sizeRank: 1 },
    { className: "text-sm", sizeRank: 2 },
    { className: "text-base", sizeRank: 3 },
    { className: "text-lg", sizeRank: 4 },
    { className: "text-xl", sizeRank: 5 },
    { className: "text-2xl", sizeRank: 6 },
    { className: "text-3xl", sizeRank: 7 },
  ],
};

function increaseTailwindTextSize() {
  const sizes = tailwindTextSizes.sizes;

  const sizesClassNames = new Set();
  sizes.forEach((currentSize) => sizesClassNames.add(currentSize.className));

  const defaultBodySizeClassDefintion = "text-base";
  let currentBodySizeClassDefintion = "";
  let bodySizeClassDefintionForLogic = "";
  const currentBodyClassString = document.body.className;
  sizesClassNames.forEach((sizeClassName) => {
    if (currentBodyClassString.includes(sizeClassName)) {
      currentBodySizeClassDefintion = sizeClassName;
    }
  });

  bodySizeClassDefintionForLogic =
    currentBodySizeClassDefintion === ""
      ? defaultBodySizeClassDefintion
      : currentBodySizeClassDefintion;

  let currentBodySizeClassRank;
  let nextBodySizeClassDefintion = "";
  sizes.forEach((currentSize) => {
    if (currentSize.className == bodySizeClassDefintionForLogic)
      currentBodySizeClassRank = currentSize.sizeRank;
  });
  sizes.forEach((currentSize) => {
    if (currentSize.sizeRank == currentBodySizeClassRank + 1)
      nextBodySizeClassDefintion = currentSize.className;
  });

  if (nextBodySizeClassDefintion === "") {
    return;
  }

  if (currentBodySizeClassDefintion === "") {
    document.body.classList.add(nextBodySizeClassDefintion);
  } else {
    document.body.classList.remove(currentBodySizeClassDefintion);
    document.body.classList.add(nextBodySizeClassDefintion);
  }
}

function decreaseTailwindTextSize() {
  const sizes = tailwindTextSizes.sizes;

  const sizesClassNames = new Set();
  sizes.forEach((currentSize) => sizesClassNames.add(currentSize.className));

  const defaultBodySizeClassDefintion = "text-base";
  let currentBodySizeClassDefintion = "";
  let bodySizeClassDefintionForLogic = "";
  const currentBodyClassString = document.body.className;
  sizesClassNames.forEach((sizeClassName) => {
    if (currentBodyClassString.includes(sizeClassName)) {
      currentBodySizeClassDefintion = sizeClassName;
    }
  });

  bodySizeClassDefintionForLogic =
    currentBodySizeClassDefintion === ""
      ? defaultBodySizeClassDefintion
      : currentBodySizeClassDefintion;

  let currentBodySizeClassRank;
  let nextBodySizeClassDefintion = "";
  sizes.forEach((currentSize) => {
    if (currentSize.className == bodySizeClassDefintionForLogic)
      currentBodySizeClassRank = currentSize.sizeRank;
  });
  sizes.forEach((currentSize) => {
    if (currentSize.sizeRank == currentBodySizeClassRank - 1)
      nextBodySizeClassDefintion = currentSize.className;
  });

  if (nextBodySizeClassDefintion === "") {
    return;
  }

  if (currentBodySizeClassDefintion === "") {
    document.body.classList.add(nextBodySizeClassDefintion);
  } else {
    document.body.classList.remove(currentBodySizeClassDefintion);
    document.body.classList.add(nextBodySizeClassDefintion);
  }
}

var increaseTextSizeButton = document.getElementById("increasetextsize");
var decreaseTextSizeButton = document.getElementById("decreasetextsize");
var checkbox = document.getElementById("checkbox");

const increaseTextSize = function () {
  increaseTailwindTextSize();
};

const decreaseTextSize = function () {
  decreaseTailwindTextSize();
};

const toggleDarkMode = function () {
  const html = document.querySelector("html");
  checkbox.checked
    ? html.setAttribute("data-theme", "business")
    : html.setAttribute("data-theme", "corporate");
};

// increaseTextSizeButton.addEventListener("click", increaseTextSize);
// decreaseTextSizeButton.addEventListener("click", decreaseTextSize);
checkbox.addEventListener("click", toggleDarkMode);
