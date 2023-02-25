const tailwindTextSizes = {
  sizes: [
    { className: "text-xs", sizeRank: 1 },
    { className: "text-sm", sizeRank: 2 },
    { className: "text-base", sizeRank: 3 },
    { className: "text-lg", sizeRank: 4 },
  ],
};

function getTailwindTextSizes() {
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

var increaseTextSizeButton = document.getElementById("increasetextsize");

const increaseTextSize = function () {
  getTailwindTextSizes();
};

increaseTextSizeButton.addEventListener("click", increaseTextSize);


// var checkbox = document.querySelector("#checkbox");
// const toggleDarkMode = function () {
//   const html = document.querySelector("html");
//   checkbox.checked
//     ? html.setAttribute("data-theme", "dark")
//     : html.setAttribute("data-theme", "light");
// };
// checkbox.addEventListener("click", toggleDarkMode);