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
          const fallbackSize = Object.values(this.textSizes)[0];
          if (fallbackSize) {
            this.selectedSizeName = fallbackSize.name;
            this.selectedSize = fallbackSize.prop;
          }
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
  const postImageElement = document.getElementById("post-image-fullscreen-section");
  const postImageFs = document.getElementById("post-image-fullscreen");

  if (postImageElement) postImageElement.classList.add("hidden");
  if (postImageFs) postImageFs.src = "";
}

function handleNormalPostImageClick(element) {
  const lgBreakpoint = window.matchMedia("(min-width: 1024px)");
  if (!lgBreakpoint.matches) return;

  let largestSrc = element.src;
  if (element.srcset) {
    const imgSrcSet = element.srcset.split(",");
    largestSrc = imgSrcSet[imgSrcSet.length - 1].trim().split(" ")[0];
  }

  const postImageFs = document.getElementById("post-image-fullscreen");
  const postImageElement = document.getElementById("post-image-fullscreen-section");

  if (postImageFs && postImageElement) {
    postImageFs.src = largestSrc;
    postImageElement.classList.remove("hidden");
  }
}