// taking reference

const customer = document.getElementById("customer");
const logout = document.getElementById("logout");
const display_products_div = document.getElementById("display_products_div");
const myModal = document.getElementById("myModal");
const img_in_modal = document.getElementById("img_in_modal");
const description_in_modal = document.getElementById("description_in_modal");
const gotocart = document.getElementById("gotocart");

// if gotocart button is clicked

gotocart.addEventListener("click", function () {
  window.open("./cart.html", "_self");
});

// display welcome message

let loged_in = localStorage.getItem("user");
loged_in = JSON.parse(loged_in);

customer.innerText = `Welcome ${loged_in}....!`;

// if no user is sined in hide the go to cart button and logout button

let user = localStorage.getItem("user");
user = JSON.parse(user);
if (user) {
  logout.style.display = "block";
  gotocart.style.display = "block";
  console.log("user loged in");
} else {
  console.log("no user loged in");
  logout.style.display = "none";
  gotocart.style.display = "none";
}

// when we click on logout button

logout.addEventListener("click", function () {
  window.open("./index.html", "_self");
  deleteuser();
});

function deleteuser() {
  localStorage.setItem("user", JSON.stringify(""));
}

function display_products() {
  let products = getfromstorage();
  if (products) {
    products.forEach((element) => {
      display_products_from_storage(
        element.image_url,
        element.product_name,
        element.price
      );
    });
  }
}
display_products();

function getfromstorage() {
  let products = localStorage.getItem("product_details");
  return products ? JSON.parse(products) : null;
}

function display_products_from_storage(image_url, product_name, price) {
  let div = document.createElement("div");
  div.setAttribute("class", "col-lg-4");
  div.setAttribute("id", "product_box");

  let image_div = document.createElement("div");

  let image = document.createElement("img");
  image.setAttribute("src", image_url);
  image.setAttribute("class", "img");

  let product_div = document.createElement("div");

  let product_name_display = document.createElement("h3");
  product_name_display.innerText = product_name;

  let price_div = document.createElement("div");
  price_div.setAttribute("class", "price_div");

  let price_heading = document.createElement("h3");
  price_heading.innerText = "Price:";

  let price_of_products = document.createElement("h3");
  price_of_products.innerText = price;

  let button_div = document.createElement("div");
  button_div.setAttribute("id", "button_div");

  let add_to_cart = document.createElement("button");
  add_to_cart.innerText = "Add to cart";
  add_to_cart.setAttribute("class", "btn btn-primary");
  add_to_cart.setAttribute("id", "btnSize");

  // if add to cart button is clicked

  add_to_cart.addEventListener("click", function () {
    if (!JSON.parse(localStorage.getItem("user"))) {
      alert("login first to add to cart");
      window.open("./index.html", "_self");
    } else alert(`"${product_name}" Successfully added to cart`);
    let result = getinfoofaddtocartuser();
    if (result) {
      let add_to_cart = {
        user: getlogedinuserfromstorage(),
        product_name,
        price,
        image_url,
      };
      result.push(add_to_cart);
      localStorage.setItem("add_to_cart_user", JSON.stringify(result));
    }
  });

  let view_description = document.createElement("button");
  view_description.innerText = "View Desc";
  view_description.setAttribute("class", "btn btn-danger");
  view_description.setAttribute("id", "btnSize");
  view_description.setAttribute("data-toggle", "modal");
  view_description.setAttribute("data-target", "#myModal");

  // if view_description button is clicked

  view_description.addEventListener("click", function () {
    let product = getfromstorage();

    arr = product.filter((element) => {
      if (product_name === element.product_name) return true;
    });

    // making a modal

    img_in_modal.setAttribute("src", arr[0].image_url);
    description_in_modal.innerText = arr[0].description;

    console.log("Description: " + arr[0].description);
    console.log("Image Url: " + arr[0].image_url);
  });

  price_div.appendChild(price_heading);
  price_div.appendChild(price_of_products);

  button_div.appendChild(add_to_cart);
  button_div.appendChild(view_description);

  product_div.appendChild(product_name_display);
  product_div.appendChild(price_div);
  product_div.appendChild(button_div);

  image_div.appendChild(image);

  div.appendChild(image_div);
  div.appendChild(product_div);

  display_products_div.appendChild(div);
}

function getlogedinuserfromstorage() {
  let loged_in_user = localStorage.getItem("user");
  return JSON.parse(loged_in_user);
}

function getinfoofaddtocartuser() {
  let result = localStorage.getItem("add_to_cart_user");
  return result ? JSON.parse(result) : [];
}
