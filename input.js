const BLUE_BACKGROUND = "selected";
const YELLOW_BACKGROUND = "dbSelected";
const TARGET_CLASS = ".target";

let onclickedDiv;
let dbclickedDiv;
let currentDiv = {
  div: null,
  coords: {
    X: null,
    Y: null,
  },
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
    if (event.code === "Escape" && currentDiv.div) {
      document.removeEventListener("mousemove", onMouseMove);
      currentDiv.div.style.left = currentDiv.coords.X;
      currentDiv.div.style.top = currentDiv.coords.Y;
      currentDiv.div.onmouseup = null;
      workspace.append(currentDiv.div);
      removeCoords();
      selectedTargetElement.style.backgroundColor = INITIAL_TARGET_COLOR;
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

const containerElement = document.getElementById("workspace");
const targetElements = document.querySelectorAll(".target");

const INITIAL_TARGET_COLOR = "red";
const SELECTED_TARGET_COLOR = "blue";
const MOVABLE_TARGET_COLOR = "yellow";

const EVENT_LISTENER_OPTIONS = { once: true };

const TIMEOUT_LIMIT = 250;
let timeoutId;

let selectedTargetElement;
let x, y;

let movableTargetElement;
let moveAt;

let isTouch = false;
let isDoubleClickMode;

let width;
let height;
let distance;

function targetMovement(event, targetElement) {
  updateTargetCoordinates(targetElement);
  const shiftX = event.clientX - x;
  const shiftY = event.clientY - y;

  return (pageX, pageY) => {
    targetElement.style.left = pageX - shiftX + "px";
    targetElement.style.top = pageY - shiftY + "px";
  };
}

function updateTargetCoordinates(targetElement) {
  const rect = targetElement.getBoundingClientRect();
  x = rect.left;
  y = rect.top;
}

function computeDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function onTargetClickListener(event) {
  const targetElement = event.target;
  if (!isDoubleClickMode) {
    if (targetElement !== selectedTargetElement) {
      selectedTargetElement = targetElement;
    }
  } else {
    selectedTargetElement = null;
    movableTargetElement = null;
    isDoubleClickMode = false;
  }
}

function onTargetMoveListener(event) {
  movableTargetElement = event.target;
  moveAt(event.pageX, event.pageY);
}

function onContainerTouchstartListener() {
  if (movableTargetElement) {
    containerElement.removeEventListener(
      "touchstart",
      onContainerTouchstartListener
    );
    movableTargetElement.removeEventListener(
      "touchmove",
      onTargetTouchmoveListener
    );

    movableTargetElement.style.left = x + "px";
    movableTargetElement.style.top = y + "px";

    movableTargetElement = null;
  }
}

function onTargetTouchmoveListener(event) {
  const touch = event.touches[0];
  if (!isDoubleClickMode) {
    if (event.touches.length === 2) {
      const touch0 = event.touches[0];
      const touch1 = event.touches[1];
      if (touch0.target === touch1.target) {
        const newDistance = computeDistance(
          touch0.pageX,
          touch0.pageY,
          touch1.pageX,
          touch1.pageY
        );
        const dif = newDistance - distance;

        touch0.target.style.width = width + dif / 2 + "px";
        touch0.target.style.height = height + dif / 2 + "px";
        touch0.target.style.left = x - dif / 4 + "px";
        touch0.target.style.top = y - dif / 4 + "px";
      }
    } else {
      onTargetMoveListener(touch);
    }
  } else {
    if (touch.target === selectedTargetElement) {
      onTargetMoveListener(touch);
    } else if (touch.target === event.currentTarget) {
      onTargetMoveListener({
        target: selectedTargetElement,
        pageX: touch.pageX,
        pageY: touch.pageY,
      });
    }
  }
}

function onTargetTouchstartListener(event) {
  if (event.touches.length === 2) {
    containerElement.removeEventListener(
      "touchstart",
      onTargetTouchstartListener
    );
    containerElement.removeEventListener(
      "touchmove",
      onTargetTouchmoveListener
    );

    selectedTargetElement.style.left = x + "px";
    selectedTargetElement.style.top = y + "px";
    selectedTargetElement.style.backgroundColor = INITIAL_TARGET_COLOR;

    selectedTargetElement = null;
    isDoubleClickMode = false;
  }
}

targetElements.forEach((targetElement) => {
  targetElement.addEventListener("dblclick", () => {
    if (!isDoubleClickMode) {
      clearTimeout(timeoutId);
      timeoutId = null;

      if (selectedTargetElement) {
        selectedTargetElement.style.backgroundColor = INITIAL_TARGET_COLOR;
      }
      selectedTargetElement = targetElement;
      selectedTargetElement.style.backgroundColor = MOVABLE_TARGET_COLOR;

      if (!isTouch) {
        return;
      } else {
        containerElement.addEventListener(
          "touchstart",
          onTargetTouchstartListener
        );
        containerElement.addEventListener(
          "touchmove",
          onTargetTouchmoveListener
        );
      }

      isDoubleClickMode = true;
    }
  });

  targetElement.addEventListener("touchstart", (event) => {
    event.stopPropagation();

    const startTime = new Date();

    const touch = event.touches[0];
    if (!isDoubleClickMode) {
      if (
        event.target.classList.contains("target") &&
        movableTargetElement &&
        event.target !== movableTargetElement
      ) {
        return;
      }

      moveAt = targetMovement(touch, targetElement);

      if (event.touches.length === 2) {
        const rect = targetElement.getBoundingClientRect();
        width = rect.width;
        height = rect.height;

        const touch0 = event.touches[0];
        const touch1 = event.touches[1];

        distance = computeDistance(
          touch0.pageX,
          touch0.pageY,
          touch1.pageX,
          touch1.pageY
        );
      }

      containerElement.addEventListener(
        "touchstart",
        onContainerTouchstartListener
      );
      targetElement.addEventListener("touchmove", onTargetTouchmoveListener);

      targetElement.addEventListener(
        "touchend",
        () => {
          containerElement.removeEventListener(
            "touchstart",
            onContainerTouchstartListener
          );
          targetElement.removeEventListener(
            "touchmove",
            onTargetTouchmoveListener
          );

          movableTargetElement = null;
        },
        EVENT_LISTENER_OPTIONS
      );
    } else {
      if (targetElement === selectedTargetElement) {
        moveAt = targetMovement(touch, targetElement);
      }

      targetElement.addEventListener(
        "touchend",
        (event) => {
          const endTime = new Date();
          movableTargetElement = null;

          if (endTime - startTime < 100) {
            event.preventDefault();

            const touch = event.changedTouches[0];
            if (touch.target === selectedTargetElement) {
              containerElement.removeEventListener(
                "touchstart",
                onTargetTouchstartListener
              );
              containerElement.removeEventListener(
                "touchmove",
                onTargetTouchmoveListener
              );

              selectedTargetElement.style.backgroundColor =
                INITIAL_TARGET_COLOR;

              selectedTargetElement = null;
              isDoubleClickMode = false;
            }
          }
        },
        EVENT_LISTENER_OPTIONS
      );
    }

    isTouch = true;
  });
});
