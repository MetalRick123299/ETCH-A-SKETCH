const sketchArea = document.querySelector("#sketchArea");
const colorWheel = document.querySelector("#colorWheel");
const gridLabel = document.querySelector("#gridLabel");

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

colorWheel.oninput = () =>
  colorMode.setAttribute("style", `background-color: ${colorWheel.value};`);
colorMode.onclick = () => changeMode("colorMode");
rainbowMode.onclick = () => changeMode("rainbowMode");
eraser.onclick = () => changeMode("eraserMode");
clear.onclick = () => clearGrid();
toggleGrid.onclick = () =>
  sketchArea.classList.contains("active")
    ? sketchArea.classList.remove("active")
    : sketchArea.classList.add("active");
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

const changeGrid = (value) => {
  sketchArea.innerHTML = "";
  gridLabel.textContent = `${value} x ${value}`;

  sketchArea.setAttribute(
    "style",
    `grid-template-columns: repeat(${value}, 1fr); grid-template-rows: repeat(${value}, 1fr);`
  );

  for (let i = 0; i < value ** 2; i++) {
    const gridDiv = document.createElement("div");
    gridDiv.classList.add("grid-item");
    gridDiv.addEventListener("mouseover", changeColor);
    gridDiv.addEventListener("mousedown", changeColor);
    sketchArea.appendChild(gridDiv);
  }
};

function clearGrid() {
  const gridItem = document.querySelectorAll(".grid-item");
  gridItem.forEach((item) => {
    item.removeAttribute("style");
  });
}

changeGrid(32);
