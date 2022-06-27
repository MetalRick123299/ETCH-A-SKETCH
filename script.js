const sketchArea = document.querySelector("#sketchArea");
const gridItem = document.querySelectorAll(".grid-item");
const colorWheel = document.querySelector("#colorWheel");

const colorMode = document.querySelector("#colorMode");
const rainbowMode = document.querySelector("#rainbowMode");
const eraser = document.querySelector("#eraserMode");
const clear = document.querySelector("#clear");
const toggleGrid = document.querySelector("#toggleGrid");
const gridSlider = document.querySelector("#gridSlider");

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

let currentMode = "colorMode";
function changeMode(newMode) {
  activeButton(newMode);
  currentMode = newMode;
}

function activeButton(mode) {
  const newButton = document.querySelector(`#${mode}`);
  const buttons = document.querySelectorAll(
    "button:not(#clear):not(#toggleGrid)"
  );
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
  newButton.classList.add("active");
}

colorWheel.oninput = () => {
  colorMode.setAttribute("style", `background-color: ${colorWheel.value};`);
};
colorMode.onclick = () => changeMode("colorMode");
rainbowMode.onclick = () => changeMode("rainbowMode");
eraser.onclick = () => changeMode("eraserMode");
clear.onclick = () => clearGrid();
gridSlider.onchange = (e) => changeGrid(e.target.value);

const changeColor = (e) => {
  if (e.type === "mouseover" && !mouseDown) return;
  let color = "";
  if (currentMode == "colorMode") {
    color = document.querySelector("#colorWheel").value;
  } else if (currentMode == "rainbowMode") {
    const radomColor = Math.floor(Math.random() * 16777215).toString(16);
    color = `#${radomColor}`;
  } else if (currentMode == "eraserMode") {
    color = "#ffffff";
  }
  e.target.setAttribute("style", `background-color: ${color};`);
  console.log(color);
};

gridItem.forEach((item) => {
  item.addEventListener("mouseover", changeColor);
  item.addEventListener("mousedown", changeColor);
});

const changeGrid = (value) => {
  sketchArea.innerHTML = "";
};
