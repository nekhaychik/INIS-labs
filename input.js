const BLUE_BACKGROUND = "selected";
const YELLOW_BACKGROUND = "dbSelected";
const TARGET_CLASS = ".target";

let selectedDiv;
let currentDiv;

const workspace = document.getElementById("workspace");

let isSingleClick = true;
let isMouseDown = true;
let temp = 0;

workspace.onmousedown = function (event) {
  setTimeout(function () {
    if (isMouseDown) {
      let target = event.target.closest(TARGET_CLASS);
      if (!target) return;
      moveDiv(event);
    }
  }, 300);
};

workspace.onclick = function (event) {
  isMouseDown = false;
  setTimeout(function () {
    if (isSingleClick) {
      clickHandler(event);
      isMouseDown = true;
    }
  }, 300);
};

workspace.ondblclick = function (event) {
  dbClickHandler(event);
  isSingleClick = false;
  setTimeout(function () {
    let target = event.target.closest(TARGET_CLASS);
    if (!target) return;
    followCursor(event);
    isSingleClick = true;
    isMouseDown = true;
  }, 300);
};

function moveDiv(event) {
  event.target.style.position = "absolute";
  event.target.style.zIndex = "1000";
  document.body.append(event.target);

  let shiftX = event.clientX - event.target.getBoundingClientRect().left;
  let shiftY = event.clientY - event.target.getBoundingClientRect().top;

  function moveAt(pageX, pageY) {
    event.target.style.left = pageX - shiftX + "px";
    event.target.style.top = pageY - shiftY + "px";
    temp++;
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener("mousemove", onMouseMove);

  event.target.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    event.target.onmouseup = null;
    workspace.append(event.target);
    if (temp === 0) clickHandler(event);
    temp = 0;
  };
}

function followCursor(event) {
  event.target.style.position = "absolute";
  event.target.style.zIndex = "1000";
  document.body.append(event.target);

  let shiftX = event.clientX - event.target.getBoundingClientRect().left;
  let shiftY = event.clientY - event.target.getBoundingClientRect().top;

  function moveAt(pageX, pageY) {
    event.target.style.left = pageX - shiftX + "px";
    event.target.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener("mousemove", onMouseMove);
}

function clickHandler(event) {
  let target = event.target.closest(TARGET_CLASS);
  if (!target) {
    if (selectedDiv) {
      selectedDiv.classList.remove(BLUE_BACKGROUND);
    }
    return;
  }
  changeColorClick(target);
}

function dbClickHandler(event) {
  let target = event.target.closest(TARGET_CLASS);
  if (!target) return;
  changeColorDbClick(target);
}

function changeColorDbClick(div) {
  currentDiv = div;
  currentDiv.classList.add(YELLOW_BACKGROUND);
}

function changeColorClick(div) {
  if (selectedDiv) {
    selectedDiv.classList.remove(BLUE_BACKGROUND);
  }
  selectedDiv = div;
  selectedDiv.classList.add(BLUE_BACKGROUND);
}
