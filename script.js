const sketchArea = document.querySelector("#sketchArea");
const gridItem = document.querySelectorAll(".grid-item");
let color = document.querySelector("#colorWheel").value;

gridItem.forEach((item) => {
  item.addEventListener("click", () => {
    item.setAttribute("style", "#3f3f3f");
  });
});
