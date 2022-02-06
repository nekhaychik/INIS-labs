// NOTE: The variable "shirts" is defined in the shirts.js file as the full list of shirt offerings
//       You can access this variable here, and should use this variable here to build your webpages

let initProducts = () => {
  shirts.forEach((shirt) => {
    let obj = document.getElementById("app");
    let newDiv = document.createElement("div");
    newDiv.className = "product__card";
    let inDiv = obj.appendChild(newDiv);
    inDiv.innerHTML = `
      <a href="./details.html">
        <img src="${shirt.default.front}" alt="Shirt Image" class="card__image">
      </a>
      <p class="card__name">${shirt.name}</p>
      <p class="card__colors-num">Available in ${
        Object.keys(shirt.colors).length
      } colors</p>
      <div class="card__buttons-container">
        <button class="card__button">Quick View</button>
        <a href="./details.html">
          <button class="card__button">See Page</button>
        </a>
      </div>
    `;
  });
};

let initDetails = () => {
  // To see the shirts object, run:
  // console.log(shirts);
  // Your Code Here
};
