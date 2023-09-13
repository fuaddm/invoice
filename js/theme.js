let sun = document.querySelector(".sunSvg");
let moon = document.querySelector(".moonSvg");
let svg = document.querySelector(".theme__svg");

let theme = localStorage.getItem("theme");

if (theme == null) {
  moon.classList.add("show");
  sun.classList.remove("show");
} else if (theme == "dark") {
  sun.classList.add("show");
  moon.classList.remove("show");
  document.body.classList.add("dark-theme");
} else {
  moon.classList.add("show");
  sun.classList.remove("show");
  document.body.classList.remove("dark-theme");
}

sun.addEventListener("click", () => {
  localStorage.setItem("theme", "white");
  moon.classList.add("show");
  sun.classList.remove("show");
  document.body.classList.remove("dark-theme");
});
moon.addEventListener("click", () => {
  localStorage.setItem("theme", "dark");
  sun.classList.add("show");
  moon.classList.remove("show");
  document.body.classList.add("dark-theme");
});
