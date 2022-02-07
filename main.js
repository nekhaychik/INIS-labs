// NOTE: The variable "shirts" is defined in the shirts.js file as the full list of shirt offerings
//       You can access this variable here, and should use this variable here to build your webpages
let initProducts = () => {
  createProductCards();
  handlerSeePageButton();
  handlerQuickViewButton();
};

function createProductCards() {
  let count = 0;
  shirts.forEach((shirt) => {
    const obj = document.getElementById("app");
    const newDiv = document.createElement("div");
    newDiv.className = "product__card";
    const inDiv = obj.appendChild(newDiv);
    inDiv.innerHTML = `
      <a href="./details.html">
        <img src="${
          shirt.colors.white.front
        }" alt="Shirt Image" class="card__image">
      </a>
      <p class="card__name">${shirt.name}</p>
      <p class="card__colors-num">Available in ${
        Object.keys(shirt.colors).length
      } colors</p>
      <div class="card__buttons-container">
        <button class="card__button button__quick-view" id="quickView__button-${count}">Quick View</button>
        <a href="./details.html" id="details__link-${count++}" class="button__see-page">
          <button class="card__button">See Page</button>
        </a>
      </div>
    `;
  });
}

function handlerSeePageButton() {
  const seePageButtons = document.querySelectorAll(".button__see-page");
  seePageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      localStorage.setItem(
        "indexOfShirt",
        `${button.id[button.id.length - 1]}`
      );
    });
  });
}

function handlerQuickViewButton() {
  const quickViewButtons = document.querySelectorAll(".button__quick-view");
  quickViewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      localStorage.setItem(
        "indexOfShirt",
        `${button.id[button.id.length - 1]}`
      );
      createModalWindow();
    });
  });
}

function createModalWindow() {
  const indexOfShirt = localStorage.getItem("indexOfShirt");
  const obj = document.getElementById("main");
  const newDiv = document.createElement("div");
  newDiv.className = "modal-window";
  const inDiv = obj.appendChild(newDiv);
  inDiv.innerHTML = `
    <button id="modal-window__close" class="close">x</button>
    <img src="${shirts[indexOfShirt].colors.white.front}" alt="T-Shirt image" id="modal-window__image">
    <p id="modal-window__name">${shirts[indexOfShirt].name}</p>
    <p id="modal-window__price">${shirts[indexOfShirt].price}</p>
    <button id="modal-window__button-close" class="close">Close</button>
    <a href="./details.html" id="modal-window__button-see">See Page</a>
  `;
  handlerCloseButton();
}

function handlerCloseButton() {
  const closeButtons = document.querySelectorAll(".close");
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalWindowContainer = document.querySelector(".modal-window");
      modalWindowContainer.remove();
    });
  });
}

let initDetails = () => {
  const indexOfShirt = localStorage.getItem("indexOfShirt");
  createProductDetails(indexOfShirt);
  handlerFrontButton(indexOfShirt);
  handlerBackButton(indexOfShirt);
  addColorButtons(indexOfShirt);
  handlerColorButtons(indexOfShirt);
};

function createProductDetails(indexOfShirt) {
  const obj = document.getElementById("app");
  const newDiv = document.createElement("div");
  newDiv.className = "details__container";
  const inDiv = obj.appendChild(newDiv);
  localStorage.setItem('activeColor', 'white');
  inDiv.innerHTML = `
    <h1 class="details__title">${shirts[indexOfShirt].name}</h1>
    <img src="${shirts[indexOfShirt].colors.white.front}" alt="T-Shirt image" class="details__image">
    <p class="details__price">${shirts[indexOfShirt].price}</p>
    <p class="details__description">${shirts[indexOfShirt].description}</p>
    <div class="details__side">
      <p class="details__side-title">Side: </p>
      <button class="details__side-front" id="active-side">Front</button>
      <button class="details__side-back">Back</button>
    </div>
    <div class="details__color">
      <p class="details__color-title">Color: </p>
      <button class="details__color-white">White</button>
      <button class="details__color-blue">Blue</button>
      <button class="details__color-pink">Pink</button>
      <button class="details__color-red">Red</button>
      <button class="details__color-green">Green</button>
      <button class="details__color-yellow">Yellow</button>
    </div>
  `;
}

function addColorButtons(indexOfShirt) {
  const colors = Object.keys(shirts[indexOfShirt].colors);
  colors.forEach((color) => {
    const colorButton = document.querySelector(`.details__color-${color}`);
    colorButton.id = "active-color";
  });
}

function handlerColorButtons(indexOfShirt) {
  const activeColors = document.querySelectorAll("#active-color");
  const image = document.querySelector(".details__image");
  activeColors.forEach((color) => {
    color.addEventListener("click", () => {
      localStorage.setItem(
        "activeColor",
        `${color.getAttribute("class").replace("details__color-", "")}`
      );
      const currentColor = localStorage.getItem("activeColor");
      image.setAttribute(
        "src",
        `${shirts[indexOfShirt].colors[currentColor].front}`
      );
    });
  });
}

function handlerFrontButton(indexOfShirt) {
  const frontButton = document.querySelector(".details__side-front");
  const backButton = document.querySelector(".details__side-back");
  const image = document.querySelector(".details__image");
  frontButton.addEventListener("click", () => {
    frontButton.id = "active-side";
    backButton.removeAttribute("id");
    image.setAttribute(
      "src",
      `${
        shirts[indexOfShirt].colors[localStorage.getItem("activeColor")].front
      }`
    );
  });
}

function handlerBackButton(indexOfShirt) {
  const frontButton = document.querySelector(".details__side-front");
  const backButton = document.querySelector(".details__side-back");
  const image = document.querySelector(".details__image");
  backButton.addEventListener("click", () => {
    backButton.id = "active-side";
    frontButton.removeAttribute("id");
    image.setAttribute(
      "src",
      `${shirts[indexOfShirt].colors[localStorage.getItem("activeColor")].back}`
    );
  });
}
