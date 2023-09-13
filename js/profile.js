const profile = document.querySelector("#headerProfile");
const exit = document.querySelector(".exit");

profile.addEventListener("click", (e) => {
  e.preventDefault();
  exit.classList.toggle("show");
});

exit.addEventListener("click", () => {
  window.open("https://google.com", "_self");
});
