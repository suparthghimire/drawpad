const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

console.log(canvas.parentElement.clientHeight);
console.log(canvas.parentElement.clientWidth);

canvas.height = canvas.parentElement.clientHeight;
canvas.width = canvas.parentElement.clientWidth;

// selectors

const pencil = document.querySelector("#tool-pencil");
const eraser = document.querySelector("#tool-eraser");
const shapes = document.querySelector("#tool-shapes");
const line = document.querySelector("#shape-line");
const rectangle = document.querySelector("#shape-rectangle");
const circle = document.querySelector("#shape-circle");
const triangle = document.querySelector("#shape-triangle");

const clearCanvas = document.querySelector("#clear-canvas");
const canvasBg = document.querySelector("#canvas-bg");

const brush_size_5 = document.querySelector(".px15");
const brush_size_15 = document.querySelector(".px25");
const brush_size_25 = document.querySelector(".px35");
const brush_size_35 = document.querySelector(".px45");
const brush_size_45 = document.querySelector(".px55");
const brush_size_custom = document.querySelector(".size-ip");
const add_size_btn = document.querySelector(".add-size");

canvas.style.backgroundColor = "white";
console.log(canvas.style.backgroundColor);

class UI {
  constructor() {
    this.undoStack = [];
    this.undoLimit = 5;
  }

  static change_brush_size(size) {
    if (size != "*") ctx.lineWidth = size;
    else ctx.lineWidth = brush_size_custom.value;
  }
  static getCanvasCoordinates(e) {
    const x = e.clientX - 153;
    const y = e.clientY - 153;
    return { x, y };
  }
  static clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  static changeCanvasBg() {
    canvas.style.backgroundColor = document.querySelector("#canvas-bg").value;
  }
  static takeSnapshot() {
    this.currentSnap = ctx.getImageData(0, 0, canvas.width, canvas.height);
    if (this.undoStack.length >= this.undoLimit) this.undoStack.shift();
    this.undoStack.push(this.currentSnap);
  }

  static setSnapshot() {
    ctx.putImageData(this.currentSnap, 0, 0);
  }
  static startPos(e) {
    this.painting = true;
    this.startMousePos = UI.getCanvasCoordinates(e);

    UI.takeSnapshot();
  }
  static endPos(e) {
    this.painting = false;
    this.position = UI.getCanvasCoordinates(e);
    UI.draw(e);
    ctx.beginPath();
  }

  static draw(e) {
    if (!this.painting) return;

    ctx.strokeStyle = document.querySelector("#tool-palette").value;

    if (pencil.checked) {
      UI.drawPencil(e);
    } else if (eraser.checked) {
      ctx.clearRect(
        e.clientX - 153,
        e.clientY - 153,
        ctx.lineWidth,
        ctx.lineWidth
      );
    } else if (shapes.checked) {
      if (line.checked) {
        UI.setSnapshot();

        let startPosition = this.startMousePos;

        let endPosition = { x: e.clientX - 153, y: e.clientY - 153 };

        UI.drawLine(startPosition, endPosition);
      } else if (rectangle.checked) {
        console.log("Rectangle");
        UI.setSnapshot();
        let startPosition = this.startMousePos;

        let endPosition = { x: e.clientX - 153, y: e.clientY - 153 };

        UI.drawRect(startPosition, endPosition);
      } else if (circle.checked) {
        UI.setSnapshot();
        let startPosition = this.startMousePos;

        let endPosition = { x: e.clientX - 153, y: e.clientY - 153 };

        UI.drawCircle(startPosition, endPosition);
        console.log("Circle");
      } else if (triangle.checked) {
        console.log("triangle");
        UI.setSnapshot();
        let startPosition = this.startMousePos;

        let endPosition = { x: e.clientX - 153, y: e.clientY - 153 };

        UI.drawTriangle(startPosition, endPosition);
      }
    }
  }

  static drawLine(startPosition, endPosition) {
    ctx.beginPath();
    ctx.moveTo(startPosition.x, startPosition.y);
    ctx.lineTo(endPosition.x, endPosition.y);
    ctx.stroke();
  }
  static drawPencil(e) {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.lineTo(e.clientX - 153, e.clientY - 153);

    ctx.stroke();
  }
  static drawRect(startPosition, endPosition) {
    ctx.beginPath();
    ctx.rect(
      startPosition.x,
      startPosition.y,
      endPosition.x - startPosition.x,
      endPosition.y - startPosition.y
    );
    ctx.stroke();
  }
  static drawCircle(startPosition, endPosition) {
    ctx.beginPath();
    let xSq =
      (startPosition.x - endPosition.x) * (startPosition.x - endPosition.x);
    let ySq =
      (startPosition.y - endPosition.y) * (startPosition.y - endPosition.y);
    let distance = Math.sqrt(xSq + ySq);
    ctx.arc(
      startPosition.x + distance,
      startPosition.y + distance,
      distance,
      0,
      2 * Math.PI,
      false
    );
    ctx.stroke();
  }
  static drawTriangle(startPosition, endPosition) {
    ctx.beginPath();
    ctx.moveTo(
      startPosition.x + (endPosition.x - startPosition.x) / 2,
      startPosition.y
    );
    ctx.lineTo(startPosition.x, endPosition.y);
    ctx.lineTo(endPosition.x, endPosition.y);
    ctx.closePath();

    ctx.stroke();
  }
}

// function continueStroke = (newPoint) {
//   ctx.beginPath();
//   ctx.moveTo(latestPoint[0], latestPoint[1]);
//   ctx.strokeStyle = "red";
//   ctx.lineWidth = 20;
//   ctx.lineCap = "round";
//   ctx.lineJoin
// }

canvas.addEventListener("mousemove", UI.draw);
canvas.addEventListener("mousedown", UI.startPos);
canvas.addEventListener("mouseup", UI.endPos);

clearCanvas.addEventListener("click", UI.clearCanvas);
canvasBg.addEventListener("change", UI.changeCanvasBg);

brush_size_5.addEventListener("click", () => {
  brush_size_5.classList.add("size-selected");
  brush_size_15.classList.remove("size-selected");
  brush_size_25.classList.remove("size-selected");
  brush_size_35.classList.remove("size-selected");
  brush_size_45.classList.remove("size-selected");
  UI.change_brush_size(5);
});
brush_size_15.addEventListener("click", () => {
  brush_size_15.classList.add("size-selected");
  brush_size_5.classList.remove("size-selected");
  brush_size_25.classList.remove("size-selected");
  brush_size_35.classList.remove("size-selected");
  brush_size_45.classList.remove("size-selected");
  UI.change_brush_size(15);
});
brush_size_25.addEventListener("click", () => {
  brush_size_25.classList.add("size-selected");
  brush_size_15.classList.remove("size-selected");
  brush_size_5.classList.remove("size-selected");
  brush_size_35.classList.remove("size-selected");
  brush_size_45.classList.remove("size-selected");
  UI.change_brush_size(25);
});
brush_size_35.addEventListener("click", () => {
  brush_size_35.classList.add("size-selected");
  brush_size_15.classList.remove("size-selected");
  brush_size_25.classList.remove("size-selected");
  brush_size_5.classList.remove("size-selected");
  brush_size_45.classList.remove("size-selected");
  UI.change_brush_size(35);
});
brush_size_45.addEventListener("click", () => {
  brush_size_45.classList.add("size-selected");
  brush_size_15.classList.remove("size-selected");
  brush_size_25.classList.remove("size-selected");
  brush_size_35.classList.remove("size-selected");
  brush_size_5.classList.remove("size-selected");
  UI.change_brush_size(55);
});
add_size_btn.addEventListener("click", () => {
  brush_size_5.classList.remove("size-selected");
  brush_size_15.classList.remove("size-selected");
  brush_size_25.classList.remove("size-selected");
  brush_size_35.classList.remove("size-selected");
  brush_size_45.classList.remove("size-selected");

  UI.change_brush_size("*");
});
