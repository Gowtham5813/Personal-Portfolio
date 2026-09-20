// applied before paint so the page never flashes the wrong theme
(function () {
  try {
    var saved = localStorage.getItem("theme");
    if (saved) document.documentElement.setAttribute("data-theme", saved);
  } catch (e) {}
})();

// the sun/moon swap is pure CSS off the data-theme attribute
function toggleTheme() {
  var light = document.documentElement.getAttribute("data-theme") === "light";
  var next = light ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
}
