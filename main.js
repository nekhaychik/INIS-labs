// NOTE: The variable "shirts" is defined in the shirts.js file as the full list of shirt offerings
//       You can access this variable here, and should use this variable here to build your webpages
let initProducts = () => {
  checkDataOfProductIsExist();
  createProductCards();
  handlerSeePageButton();
  handlerQuickViewButton();
};

function checkDataOfProductIsExist() {
  shirts.forEach((shirt) => {
    if (!shirt.colors) {
      shirt.colors = { white: { front: "shirt_images/default-w-front.png" } };
    }
    if (!shirt.colors.white) {
      shirt.colors.white = { front: "shirt_images/default-w-front.png" };
    }
    if (!shirt.colors.white.front) {
      shirt.colors.white.front = "shirt_images/default-w-front.png";
    }
    if (!shirt.name) {
      shirt.name = "No name";
    }
    if (!shirt.price) {
      shirt.price = "No price";
    }
  });
}

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
        `${button.id.replace("details__link-", "")}`
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
        `${button.id.replace("quickView__button-", "")}`
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
  checkDetailsOfProductIsExist(indexOfShirt);
  createProductDetails(indexOfShirt);
  handlerFrontButton(indexOfShirt);
  handlerBackButton(indexOfShirt);
  addColorButtons(indexOfShirt);
  handlerColorButtons(indexOfShirt);
};

function checkDetailsOfProductIsExist(indexOfShirt) {
  if (!shirts[indexOfShirt].name) {
    shirts[indexOfShirt].name = "No name";
  }
  if (!shirts[indexOfShirt].colors) {
    shirts[indexOfShirt].colors = {
      white: {
        front: "shirt_images/default-w-front.png",
        back: "shirt_images/default-w-back.png",
      },
    };
  }
  if (!shirts[indexOfShirt].colors.white) {
    shirts[indexOfShirt].colors.white = {
      front: "shirt_images/default-w-front.png",
      back: "shirt_images/default-w-back.png",
    };
  }
  if (!shirts[indexOfShirt].colors.white.front) {
    shirts[indexOfShirt].colors.white.front =
      "shirt_images/default-w-front.png";
    shirts[indexOfShirt].colors.white.back = "shirt_images/default-w-back.png";
  }
  if (!shirts[indexOfShirt].price) {
    shirts[indexOfShirt].price = "No price";
  }
  if (!shirts[indexOfShirt].description) {
    shirts[indexOfShirt].description = "No description";
  }
}

function createProductDetails(indexOfShirt) {
  const obj = document.getElementById("app");
  const newDiv = document.createElement("div");
  newDiv.className = "details__container";
  const inDiv = obj.appendChild(newDiv);
  localStorage.setItem("activeColor", "white");
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
      const currentSide = localStorage.getItem("activeSide");
      image.setAttribute(
        "src",
        `${shirts[indexOfShirt].colors[currentColor][currentSide]}`
      );
    });
  });
}

function handlerFrontButton(indexOfShirt) {
  const frontButton = document.querySelector(".details__side-front");
  const backButton = document.querySelector(".details__side-back");
  const image = document.querySelector(".details__image");
  frontButton.addEventListener("click", () => {
    localStorage.setItem("activeSide", "front");
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
    localStorage.setItem("activeSide", "back");
    backButton.id = "active-side";
    frontButton.removeAttribute("id");
    image.setAttribute(
      "src",
      `${shirts[indexOfShirt].colors[localStorage.getItem("activeColor")].back}`
    );
  });
}
