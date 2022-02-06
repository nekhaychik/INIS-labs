// NOTE: The variable "shirts" is defined in the shirts.js file as the full list of shirt offerings
//       You can access this variable here, and should use this variable here to build your webpages
let initProducts = () => {
  let count = 0;
  shirts.forEach((shirt) => {
    let obj = document.getElementById("app");
    let newDiv = document.createElement("div");
    newDiv.className = "product__card";
    let inDiv = obj.appendChild(newDiv);
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
        <button class="card__button" id="quickView__button-${count}">Quick View</button>
        <a href="./details.html" id="details__link-${count++}" class="button__see-page">
          <button class="card__button">See Page</button>
        </a>
      </div>
    `;
  });
};

let initDetails = () => {
  let obj = document.getElementById("app");
  let newDiv = document.createElement("div");
  newDiv.className = "details__container";
  let inDiv = obj.appendChild(newDiv);
  inDiv.innerHTML = `
    <h1 class="details__title">${shirts[0].name}</h1>
    <img src="${shirts[0].colors.white.front}" alt="T-Shirt image" class="details__image">
    <p class="details__price">${shirts[0].price}</p>
    <p class="details__description">${shirts[0].description}</p>
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
};
