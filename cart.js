// taking reference

const display_products_div = document.getElementById("display_products_div");
const gobacktoproductpage = document.getElementById("gobacktoproductpage");
const empty_cart = document.getElementById("empty_cart");
const myModal = document.getElementById("myModal");
const img_in_modal = document.getElementById("img_in_modal");
const description_in_modal = document.getElementById("description_in_modal");
const checkout = document.getElementById("checkout");

// Get product array from local storage to check quantity

let product_arr = localStorage.getItem("product_details");
product_arr = JSON.parse(product_arr);
console.log(typeof product_arr);

// if we click on checkout button

checkout.addEventListener("click", function () {
  console.log("che");
  let users_add_to_cart_details = getuseradtocartdetailsfromstorage();
  console.log(users_add_to_cart_details);
  let loged_in_user = getfromstoragelogedinuser();
  console.log(loged_in_user);
  let add_to_cart_arr = users_add_to_cart_details.filter((element) => {
    if (loged_in_user === element.user) return true;
  });
  console.log(add_to_cart_arr);
  if (add_to_cart_arr.length === 0) alert("your cart is empty");
  else
    alert(`Items Successfully Purchased!
  will reach at your address soon...
  Thanks For Shopping With Us`);
});

// if gobacktoproductpage is cliked

gobacktoproductpage.addEventListener("click", function () {
  window.open("./customer.html", "_self");
});

let loged_in_user = getfromstoragelogedinuser();
console.log(`logedinuser: ${loged_in_user}`);

let users_add_to_cart_details = getuseradtocartdetailsfromstorage();
console.log(users_add_to_cart_details);

if (users_add_to_cart_details.length === 0)
  empty_cart.innerText = "your cart is empty";
else empty_cart.innerText = "";

function getfromstoragelogedinuser() {
  let user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

function getuseradtocartdetailsfromstorage() {
  let users = localStorage.getItem("add_to_cart_user");
  return users ? JSON.parse(users) : [];
}

let arr = users_add_to_cart_details.filter((element) => {
  if (loged_in_user === element.user) return true;
});

console.log(arr);

if (arr) {
  arr.forEach((element) => {
    display_products_from_storage(
      element.image_url,
      element.product_name,
      element.price
    );
  });
} else empty_cart.innerText = "Your cart is empty";

// function

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

  let quantity_div = document.createElement("div");
  quantity_div.setAttribute("class", "block");

  let quantity_div_heading = document.createElement("h3");
  quantity_div_heading.innerText = "Quantity : ";

  let quantity_value = 0;

  let quantity_div_value = document.createElement("h3");
  quantity_div_value.innerText = quantity_value;

  let quantity_minus = document.createElement("button");
  quantity_minus.innerText = "-";
  quantity_minus.setAttribute("class", "btn btn-primary plus_minus");

  // when we click to decrease the quantity

  quantity_minus.addEventListener("click", function () {
    if (quantity_value > 0) {
      quantity_value--;
      quantity_div_value.innerText = quantity_value;
    } else alert(`Quantity cant be equal to or lest than zero`);
  });

  let quantity_plus = document.createElement("button");
  quantity_plus.innerText = "+";
  quantity_plus.setAttribute("class", "btn btn-primary plus_minus");

  // when we click to increase the quantity

  quantity_plus.addEventListener("click", function () {
    quantity_value++;
    quantity_div_value.innerText = quantity_value;

    let filtered_product = product_arr.filter((element) => {
      if (product_name === element.product_name) return true;
    });
    console.log(filtered_product);
    console.log(quantity_value);
    console.log(Number(filtered_product[0].quantity));

    if (quantity_value > Number(filtered_product[0].quantity)) {
      alert(
        `You can select maximum upto of ${Number(
          filtered_product[0].quantity
        )} quantity`
      );
      quantity_value = Number(filtered_product[0].quantity);
      quantity_div_value.innerText = Number(filtered_product[0].quantity);
    }
  });

  let button_div = document.createElement("div");
  button_div.setAttribute("id", "button_div");

  let delete_from_cart = document.createElement("button");
  delete_from_cart.innerText = "Delete";
  delete_from_cart.setAttribute("class", "btn btn-dark");
  delete_from_cart.setAttribute("id", "btnSize");

  // if delete button is clicked

  delete_from_cart.addEventListener("click", function () {
    display_products_div.removeChild(div);

    deletefromstorage(product_name);
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
    console.log(arr);
    // making a modal

    img_in_modal.setAttribute("src", arr[0].image_url);
    description_in_modal.innerText = arr[0].description;

    console.log("Description: " + arr[0].description);
    console.log("Image Url: " + arr[0].image_url);
  });

  price_div.appendChild(price_heading);
  price_div.appendChild(price_of_products);

  quantity_div.appendChild(quantity_div_heading);
  quantity_div.appendChild(quantity_div_value);
  quantity_div.appendChild(quantity_minus);
  quantity_div.appendChild(quantity_plus);

  button_div.appendChild(delete_from_cart);
  button_div.appendChild(view_description);

  product_div.appendChild(product_name_display);
  product_div.appendChild(price_div);
  product_div.appendChild(quantity_div);
  product_div.appendChild(button_div);

  image_div.appendChild(image);

  div.appendChild(image_div);
  div.appendChild(product_div);

  display_products_div.appendChild(div);
}

function deletefromstorage(product_name) {
  let result = getuseradtocartdetailsfromstorage();

  let filtered_array = result.filter((element) => {
    if (element.product_name !== product_name) return true;
  });

  localStorage.setItem("add_to_cart_user", JSON.stringify(filtered_array));
}

function getfromstorage() {
  let products = localStorage.getItem("product_details");
  return products ? JSON.parse(products) : null;
}
