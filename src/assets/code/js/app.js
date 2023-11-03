document.addEventListener("alpine:init", () => {
  Alpine.data("textConfiguration", () => ({
    textSizes: {
      sm: {
        name: "Small",
        prop: "sm",
      },
      md: {
        name: "Medium",
        prop: "base",
      },
      lg: {
        name: "Large",
        prop: "lg",
      },
      xl: {
        name: "XL",
        prop: "xl",
      },
      "2xl": {
        name: "2XL",
        prop: "2xl",
      },
    },

    selectedSize: "lg",

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

    setSize(selectedBtnSize) {
      const vals = [];
      for (const size of Object.keys(this.textSizes)) {
        if (selectedBtnSize === this.textSizes[size]["name"]) {
          this.selectedSize = this.textSizes[size]["prop"];
        }
      }
    },
  }));
});
