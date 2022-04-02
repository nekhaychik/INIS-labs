let selectedDiv;
const workspace = document.getElementById("workspace");
const divs = document.querySelectorAll(".target");

workspace.addEventListener("click", clickHandler);

divs.forEach((div) => {
  div.onmousedown = function (event) {
    let temp = 0;

    div.style.position = "absolute";
    div.style.zIndex = "1000";
    document.body.append(div);

    let shiftX = event.clientX - div.getBoundingClientRect().left;
    let shiftY = event.clientY - div.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      div.style.left = pageX - shiftX + "px";
      div.style.top = pageY - shiftY + "px";
      temp++;
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener("mousemove", onMouseMove);

    div.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      div.onmouseup = null;
      workspace.append(div);
      if (temp === 0) clickHandler(event);
    };
  };
});

function clickHandler(event) {
  let target = event.target.closest(".target");
  if (!target) {
    if (selectedDiv) {
      selectedDiv.classList.remove("selected");
    }
    return;
  }
  changeColorToBlue(target);
}

function changeColorToBlue(div) {
  if (selectedDiv) {
    selectedDiv.classList.remove("selected");
  }
  selectedDiv = div;
  selectedDiv.classList.add("selected");
}
