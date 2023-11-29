// console.log('check')

// Steps for the categories to show in website

/* send request to API
    Adaptation datas in js

*/
const categoryList = document.querySelector("#category-list");
// console.log(categoryList)
const productsList = document.getElementById("products");
// console.log(productsList)

// for the opening bracket what we need to do?
// open button
const openButton = document.querySelector("#open-button");
// console.log(openButton)
// close button
const closeButton = document.querySelector("#close-button");
// console.log(closeButton)
// bracket modal
const modal = document.getElementById("modal");
// console.log(modal)
const modalList = document.querySelector(".modal-list");
//  console.log(modalList)
const totalPrice = document.getElementById("total-price");
// console.log(totalPrice)

function fetchCategories() {
  // console.log('check func')

  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) =>
      data.slice(0, 5).map((categoryy) => {
        const { category, image } = categoryy;

        // console.log(name);
        // console.log(image);

        const categoryDiv = document.createElement("div");

        categoryDiv.classList.add("category");
        categoryDiv.innerHTML = `
        <img src=${image}
         alt=" " />
         <span>${category} </span>
          
        // `;
        // console.log(categoryDiv)
        categoryList.appendChild(categoryDiv);
      })
    )
    .catch((error) => console.log(error));
}

fetchCategories();

function fetchProducts() {
  // console.log('working')
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) =>
      data.map((product) => {
        // console.log(product)
        const { title, price, category, image, id } = product;
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `   <img src=${image} alt="" />
      <p>${title} </p>
      <p>${category} </p>
      <div class="product-action">
        <p>${price} $</p>
        <button onclick="addToBasket({id:${id},title:'${title}',price:${price},image:'${image}',amount:1 })">Add to Basket</button>
      </div>
      `;
        productsList.appendChild(productDiv);
        // console.log(productDiv)
      })
    )
    .catch((error) => console.log(error));
}

fetchProducts();
let basket = [];
let total = 0;

//ad to basket functions

function addToBasket(product) {
  const idsiaynieleman = basket.find(
    (sepettekiEleman) => sepettekiEleman.id === product.id
  );
  // console.log(idsiaynieleman);

  // console.log("basket");
  // console.log(product);

  if (idsiaynieleman) {
    idsiaynieleman.amount++;
  } else {
    basket.push(product);
  }

  // console.log(basket);
}

// opening-closing-backet functions and listeners

function showBasketItems() {
  // console.log('sepeti listeleme')
  basket.map((basketProduct) => {
    const listItem = document.createElement("div");
    listItem.classList.add("list-item");
    const { image, title, price, amount, id } = basketProduct;

    listItem.innerHTML = `  <img src=${image} alt="">
  <h4>${title} </h4>
  <h2 class="price">${price} $</h2>
  <p>Amount:${amount} </p>
  <button class="delete-button" onclick='deleteItem({id:${id},price:${price},amount:${amount}} )'>Delete</button>`;
    modalList.appendChild(listItem);
    // console.log(listItem)

    total += price * amount;
  });
}

openButton.addEventListener("click", () => {
  // console.log('bracket button')

  showBasketItems();

  modal.classList.add("active");
  totalPrice.innerText = total;
});

closeButton.addEventListener("click", () => {
  modal.classList.remove("active");
  modalList.innerHTML='';
  total=0;
});

modal.addEventListener("click", (event) => {
  // console.log(event);

  if (event.target.classList.contains("modal-wrapper")) {
    modal.classList.remove("active");
  }
  // modal.classList.remove('active')
});

// delete progress
function deleteItem(willDeleteItem) {
  basket = basket.filter((eleman) => eleman.id !== willDeleteItem.id);
  total -= willDeleteItem.price *willDeleteItem.amount;
  totalPrice.innerText=total;
}
modalList.addEventListener("click", (tiklamaOlayiBilgileri) => {
  // console.log(tiklamaOlayiBilgileri.target.parentElement.remove());
  if (tiklamaOlayiBilgileri.target.classList.contains("delete-button")) {
    tiklamaOlayiBilgileri.target.parentElement.remove();
  }
  if (basket.length === 0) {
    modal.classList.remove("active");
  }
});
