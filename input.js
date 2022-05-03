const BLUE_BACKGROUND = "selected";
const YELLOW_BACKGROUND = "dbSelected";
const TARGET_CLASS = ".target";

const movableTargetElement = null;

let onclickedDiv;
let dbclickedDiv;
let currentDiv = {
  div: null,
  coords: {
    X: null,
    Y: null,
  }
};


const workspace = document.getElementById("workspace");

let isSingleClick = true;
let isMouseDown = true;
let temp = 0;

workspace.onmousedown = function (event) {
  setTimeout(function () {
    if (isMouseDown) {
      let target = event.target.closest(TARGET_CLASS);
      if (!target) return;
      setCoords(event.target);
      moveDiv(event);
    }
  }, 100);
};

workspace.onclick = function (event) {
  isMouseDown = false;
  setTimeout(function () {
    if (isSingleClick) {
      clickHandler(event);
      isMouseDown = true;
    }
  }, 200);
};

workspace.ondblclick = function (event) {
  dbClickHandler(event);
  isSingleClick = false;
  setTimeout(function () {
    let target = event.target.closest(TARGET_CLASS);
    if (!target) return;
    setCoords(event.target);
    moveDiv(event);
    isSingleClick = true;
    isMouseDown = true;
  }, 200);
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
    if (event.target.classList.contains(YELLOW_BACKGROUND)) {
      removeCoords();
    }
    temp = 0;
  };

  document.onkeydown = function (event) {
    if (event.code === 'Escape' && currentDiv.div) {
      document.removeEventListener("mousemove", onMouseMove);
      currentDiv.div.style.left = currentDiv.coords.X;
      currentDiv.div.style.top = currentDiv.coords.Y;
      currentDiv.div.onmouseup = null;
      workspace.append(currentDiv.div);
      removeCoords();
    }
    temp = 0;
  };
}

function clickHandler(event) {
  let target = event.target.closest(TARGET_CLASS);
  if (!target) {
    if (onclickedDiv) {
      onclickedDiv.classList.remove(BLUE_BACKGROUND);
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
  dbclickedDiv = div;
  dbclickedDiv.classList.add(YELLOW_BACKGROUND);
}

function changeColorClick(div) {
  if (onclickedDiv) {
    onclickedDiv.classList.remove(BLUE_BACKGROUND);
  }
  onclickedDiv = div;
  onclickedDiv.classList.add(BLUE_BACKGROUND);
}

function setCoords(elem) {
  currentDiv.div = elem;
  currentDiv.coords.X = elem.style.left;
  currentDiv.coords.Y = elem.style.top;
}

function removeCoords() {
  currentDiv.div.classList.remove(YELLOW_BACKGROUND);
  currentDiv.div = null;
  currentDiv.coords.X = null;
  currentDiv.coords.Y = null;
  dbclickedDiv = null;
}
