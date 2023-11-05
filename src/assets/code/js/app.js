document.addEventListener("alpine:init", () => {
  Alpine.data("textConfiguration", function () {
    return {
      textSizes: {},

      selectedSize: this.$persist("lg"),
      selectedSizeName: this.$persist("Large"),

      getSizesAsArray() {
        const vals = [];
        for (const size of Object.keys(this.textSizes)) {
          vals.push(this.textSizes[size]["name"]);
        }

        return vals;
      },

      getFontClass() {
        return "prose-" + this.selectedSize.toLowerCase();
      },

      setSizes(v) {
        this.textSizes = JSON.parse(v);
      },

      setSize(selectedBtnSize) {
        const vals = [];
        for (const size of Object.keys(this.textSizes)) {
          if (selectedBtnSize === this.textSizes[size]["name"]) {
            const selectedSizeContainer = this.textSizes[size];
            this.selectedSize = selectedSizeContainer["prop"];
            this.selectedSizeName = selectedSizeContainer["name"];
          }
        }
      },
    };
  });
});
