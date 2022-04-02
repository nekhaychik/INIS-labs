let selectedDiv;
const workspace = document.getElementById("workspace");

workspace.onclick = function (event) {
  let target = event.target.closest(".target");
  if (!target) {
    if (selectedDiv) {
      selectedDiv.classList.remove("selected");
    }
    return;
  }
  changeColorToBlue(target);
};

function changeColorToBlue(div) {
  if (selectedDiv) {
    selectedDiv.classList.remove("selected");
  }
  selectedDiv = div;
  selectedDiv.classList.add("selected");
}
