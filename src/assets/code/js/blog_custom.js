var checkbox = document.querySelector("#checkbox");

const toggleDarkMode = function () {  
  const html = document.querySelector("html");

  checkbox.checked
    ? html.setAttribute("data-theme", "dark")
    : html.setAttribute("data-theme", "light");
};

// checkbox.addEventListener("click", toggleDarkMode);