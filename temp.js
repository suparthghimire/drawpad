function mouseDownDrag(e) {
  resize = !resize;
  let selectedSide = e.target;
  let textBoxBound = document.querySelector(".text-area-container");

  let prevX = e.clientX;
  let prevY = e.clientY;

  window.addEventListener("mousemove", mouseMove);
  window.addEventListener("mouseup", mouseUp);

  function mouseMove(e) {
    if (!resize) {
      let newX = e.clientX;
      let newY = e.clientY;
      console.log("Moving");
      const rect = textBoxBound.getBoundingClientRect();

      textBoxBound.style.left = rect.left - (prevX - newX) + "px";
      textBoxBound.style.top = rect.top - (prevY - newY) + "px";

      prevX = newX;
      prevY = newY;
    }
  }

  function mouseUp() {
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("mouseup", mouseUp);
  }
}

function mouseDownResize(e) {
  resize = false;
  let selectedSide = e.target;
  let textBoxBound = document.querySelector(".text-area-container");

  let prevX = e.clientX;
  let prevY = e.clientY;

  window.addEventListener("mousemove", mouseMove);
  window.addEventListener("mouseup", mouseUp);

  function mouseMove(e) {
    let newX = e.clientX;
    let newY = e.clientY;
    console.log(textBoxBound);

    const rect = textBoxBound.getBoundingClientRect();
    if (selectedSide.classList.contains("bottom-right")) {
      textBoxBound.style.width = rect.width - (prevX - newX) + "px";
      textBoxBound.style.height = rect.height - (prevY - newY) + "px";
    } else if (selectedSide.classList.contains("bottom-left")) {
      textBoxBound.style.width = rect.width + (prevX - newX) + "px";
      textBoxBound.style.height = rect.height - (prevY - newY) + "px";
      textBoxBound.style.left = rect.left - (prevX - newX) + "px";
    } else if (selectedSide.classList.contains("top-right")) {
      textBoxBound.style.width = rect.width - (prevX - newX) + "px";
      textBoxBound.style.height = rect.height + (prevY - newY) + "px";
      textBoxBound.style.top = rect.top - (prevY - newY) + "px";
    } else if (selectedSide.classList.contains("top-left")) {
      textBoxBound.style.width = rect.width + (prevX - newX) + "px";
      textBoxBound.style.height = rect.height + (prevY - newY) + "px";
      textBoxBound.style.top = rect.top - (prevY - newY) + "px";
      textBoxBound.style.left = rect.left - (prevX - newX) + "px";
    } else if (selectedSide.classList.contains("left-side-center")) {
      textBoxBound.style.width = rect.width + (prevX - newX) + "px";
      textBoxBound.style.left = rect.left - (prevX - newX) + "px";
    } else if (selectedSide.classList.contains("right-side-center")) {
      textBoxBound.style.width = rect.width - (prevX - newX) + "px";
    } else if (selectedSide.classList.contains("top-center")) {
      textBoxBound.style.height = rect.height + (prevY - newY) + "px";
      textBoxBound.style.top = rect.top - (prevY - newY) + "px";
    } else if (selectedSide.classList.contains("bottom-center")) {
      textBoxBound.style.height = rect.height - (prevY - newY) + "px";
    }
    prevX = newX;
    prevY = newY;
  }

  function mouseUp() {
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("mouseup", mouseUp);
  }
}
this.topLeftResize = document.createElement("span");
this.topLeftResize.classList.add(
  "resizer",
  "top-left",
  "cursor-diagonal-right"
);

this.topCenterResize = document.createElement("span");
this.topCenterResize.classList.add(
  "resizer",
  "top-center",
  "cursor-horizontal"
);

this.topRightResize = document.createElement("span");
this.topRightResize.classList.add(
  "resizer",
  "top-right",
  "cursor-diagonal-left"
);

this.leftSideCenterResize = document.createElement("span");
this.leftSideCenterResize.classList.add(
  "resizer",
  "left-side-center",
  "cursor-vertical"
);

this.rightSideCenterResize = document.createElement("span");
this.rightSideCenterResize.classList.add(
  "resizer",
  "right-side-center",
  "cursor-vertical"
);

this.bottomRightResize = document.createElement("span");
this.bottomRightResize.classList.add(
  "resizer",
  "bottom-right",
  "cursor-diagonal-right"
);

this.bottomCenterResize = document.createElement("span");
this.bottomCenterResize.classList.add(
  "resizer",
  "bottom-center",
  "cursor-horizontal"
);

this.bottomLeftResize = document.createElement("span");
this.bottomLeftResize.classList.add(
  "resizer",
  "bottom-left",
  "cursor-diagonal-left"
);
