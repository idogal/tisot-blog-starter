document.addEventListener("alpine:init", () => {
  Alpine.data("theme", function () {
    return {
      themeName: this.$persist("corporate").as("theme-name"),

      init() {
      },
  
      toggleTheme() {
        this.themeName = (this.themeName === "dim" ? "corporate" : "dim") ;
      },
    };
  });
    
  Alpine.data("textConfiguration", function () {
    return {
      textSizes: {},

      selectedSize: this.$persist("lg").as("text-size-prop"),
      selectedSizeName: this.$persist("Large").as("text-size-name"),

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

        let isValidSize = false;
        for (const size of Object.keys(this.textSizes)) {
          if (this.textSizes[size]["name"] === this.selectedSizeName) {
            isValidSize = true;
            break;
          }
        }

        if (!isValidSize) {
          this.selectedSizeName = this.textSizes[2]["name"];
          this.selectedSize = this.textSizes[2]["prop"];
        }
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
