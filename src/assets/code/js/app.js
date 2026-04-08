document.addEventListener("alpine:init", () => {
  Alpine.data("theme", function () {
    return {
      themeName: this.$persist("corporate").as("theme-name"),

      init() {
      },

      toggleTheme() {
        this.themeName = (this.themeName === "dim" ? "corporate" : "dim");
      },
    };
  });

  Alpine.data("textConfiguration", function () {
    return {
      textSizes: {},

      selectedSize: this.$persist("lg").as("text-size-prop"),
      selectedSizeName: this.$persist("Large").as("text-size-name"),

      getSizesAsArray() {
        return Object.values(this.textSizes).map(size => size.name);
      },

      getFontClass() {
        return "prose-" + this.selectedSize.toLowerCase();
      },

      setSizes(v) {
        this.textSizes = JSON.parse(v);

        let isValidSize = Object.values(this.textSizes).some(size => size.name === this.selectedSizeName);

        if (!isValidSize) {
          this.selectedSizeName = this.textSizes[2]["name"];
          this.selectedSize = this.textSizes[2]["prop"];
        }
      },

      setSize(selectedBtnSize) {
        const selectedSizeContainer = Object.values(this.textSizes).find(size => size.name === selectedBtnSize);
        if (selectedSizeContainer) {
          this.selectedSize = selectedSizeContainer.prop;
          this.selectedSizeName = selectedSizeContainer.name;
        }
      },
    };
  });
});

function closeFullscreenPostImage() {
  let postImageElement = document.getElementById("post-image-fullscreen-section");
  postImageElement.classList.add("hidden");

  let postImageFs = document.getElementById("post-image-fullscreen");
  postImageFs.src = "";
}

function handleNormalPostImageClick(element) {
  const lgBreakpoint = window.matchMedia("(min-width: 1024px)");
  if (!lgBreakpoint.matches) {
    return;
  }

  const imgSrcSet = element.srcset.split(",");
  const largestSrc = imgSrcSet[imgSrcSet.length - 1].trim().split(" ")[0];

  let postImageFs = document.getElementById("post-image-fullscreen");
  postImageFs.src = largestSrc;

  let postImageElement = document.getElementById("post-image-fullscreen-section");
  postImageElement.classList.remove("hidden");
}