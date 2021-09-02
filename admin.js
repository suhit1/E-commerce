// Taking Reference

const Product_name = document.getElementById("Product_name");
const description = document.getElementById("description");
const price = document.getElementById("price");
const quantity = document.getElementById("quantity");
const image_url = document.getElementById("image_url");
const add_product_form = document.getElementById("add_product_form");
const add_product_btn = document.getElementById("add_product_btn");
const Added_products = document.getElementById("Added_products");
const logout = document.getElementById("logout");
const add_product = document.getElementById("add_product");
const update_product = document.getElementById("update_product");
const update_product_btn = document.getElementById("update_product_btn");
const Product_name_update = document.getElementById("Product_name_update");
const description_update = document.getElementById("description_update");
const price_update = document.getElementById("price_update");
const quantity_update = document.getElementById("quantity_update");
const image_url_update = document.getElementById("image_url_update");
const update_product_form = document.getElementById("update_product_form");
const welcome = document.getElementById("welcome");

// if we click on logout button

logout.addEventListener("click", function () {
  localStorage.setItem("user", JSON.stringify(""));
});

// display welcome message

let loged_in = localStorage.getItem("user");
loged_in = JSON.parse(loged_in);

welcome.innerText = `Welcome ${loged_in}`;

// previously added products from local storage

let data = getproductsdetailsfromstorage();

if (data.lengt !== 0) {
  data.forEach((element) => {
    displayProduct(
      element.product_name,
      element.description,
      element.price,
      element.quantity,
      element.image_url
    );
  });
}
// when we click on logout button

logout.addEventListener("click", function () {
  window.open("./index.html", "_self");
});

// when we click on add product button

add_product_form.addEventListener("submit", function (event) {
  event.preventDefault();

  const product_name_value = Product_name.value;
  const description_value = description.value;
  const price_value = price.value;
  const quantity_value = quantity.value;
  const image_url_value = image_url.value;

  const check_for_values = validateform(
    product_name_value,
    description_value,
    price_value,
    quantity_value,
    image_url_value
  );

  console.log(check_for_values);

  if (check_for_values) {
    displayProduct(
      product_name_value,
      description_value,
      price_value,
      quantity_value,
      image_url_value
    );

    resetformvalues();

    saveproductdetailstostorage(
      product_name_value,
      description_value,
      price_value,
      quantity_value,
      image_url_value
    );
  }
});

// functions

function validateform(product_name, description, price, quantity) {
  if (product_name && description && price && quantity) return true;
  else return false;
}

function displayProduct(Product_name, description, price, quantity, image_url) {
  let product_div = document.createElement("div");
  product_div.setAttribute("class", "product_div");

  let image_div = document.createElement("div");

  let image = document.createElement("img");
  image.setAttribute("class", "img");
  image.setAttribute("src", `${image_url}`);

  let product_details_div = document.createElement("div");
  product_details_div.setAttribute("class", "product_details_div");

  let name_div = document.createElement("div");
  name_div.setAttribute("class", "block_div");

  let product_name = document.createElement("h4");
  product_name.innerText = "Product Name : ";

  let display_product_name = document.createElement("div");
  display_product_name.setAttribute("class", "product_name");
  display_product_name.innerText = `${Product_name}`;

  let temp = display_product_name.innerText; // for saving the previous name in case of update

  let description_div = document.createElement("div");
  description_div.setAttribute("class", "block_div");

  let product_description = document.createElement("h4");
  product_description.innerText = "Product Description : ";

  let display_product_description = document.createElement("div");
  display_product_description.setAttribute("class", "product_name");
  display_product_description.innerText = `${description}`;

  let price_div = document.createElement("div");
  price_div.setAttribute("class", "block_div");

  let product_price = document.createElement("h4");
  product_price.innerText = "Product Price : ";

  let display_product_price = document.createElement("div");
  display_product_price.setAttribute("class", "product_name");
  display_product_price.innerText = `${price}`;

  let quantity_div = document.createElement("div");
  quantity_div.setAttribute("class", "block_div");

  let product_quantity = document.createElement("h4");
  product_quantity.innerText = "Product Quantity : ";

  let display_product_quantity = document.createElement("div");
  display_product_quantity.setAttribute("class", "product_name");
  display_product_quantity.innerText = `${quantity}`;

  let button_div = document.createElement("div");

  let update = document.createElement("button");
  update.innerText = "Update";
  update.setAttribute("class", "btn btn-primary");
  update.setAttribute("id", "btnSize");

  // when we click on update button

  update.addEventListener("click", function () {
    add_product.style.display = "none";
    update_product.style.display = "block";

    Product_name_update.value = Product_name;
    description_update.value = description;
    price_update.value = price;
    quantity_update.value = quantity;
    image_url_update.value = image_url;

    update_product_form.addEventListener("submit", function (event) {
      event.preventDefault();

      const product_name_update_value = Product_name_update.value;
      const description_update_value = description_update.value;
      const price_update_value = price_update.value;
      const quantity_update_value = quantity_update.value;
      const image_url_update_value = image_url_update.value;

      const check_for_values = validateform(
        product_name_update_value,
        description_update_value,
        price_update_value,
        quantity_update_value,
        image_url_update_value
      );

      if (check_for_values) {
        display_product_name.innerText = Product_name_update.value;
        display_product_description.innerText = description_update.value;
        display_product_price.innerText = price_update.value;
        display_product_quantity.innerText = quantity_update.value;
        image.setAttribute("src", image_url_update.value);

        add_product.style.display = "block";
        update_product.style.display = "none";

        deletefromstorage(temp);
        console.log(temp);

        temp = product_name_update_value;

        saveproductdetailstostorage(
          product_name_update_value,
          description_update_value,
          price_update_value,
          quantity_update_value,
          image_url_update_value
        );
      }
    });
  });

  let delete_product = document.createElement("button");
  delete_product.setAttribute("class", "block_div");
  delete_product.innerText = "Delete";
  delete_product.setAttribute("class", "btn btn-danger");
  delete_product.setAttribute("id", "btnSize");

  // when we click on delete button

  delete_product.addEventListener("click", function () {
    Added_products.removeChild(product_div);

    deletefromstorage(temp);
  });

  image_div.appendChild(image);

  name_div.appendChild(product_name);
  name_div.appendChild(display_product_name);
  description_div.appendChild(product_description);
  description_div.appendChild(display_product_description);
  price_div.appendChild(product_price);
  price_div.appendChild(display_product_price);
  quantity_div.appendChild(product_quantity);
  quantity_div.appendChild(display_product_quantity);
  button_div.appendChild(update);
  button_div.appendChild(delete_product);

  product_details_div.appendChild(name_div);
  product_details_div.appendChild(description_div);
  product_details_div.appendChild(price_div);
  product_details_div.appendChild(quantity_div);
  product_details_div.appendChild(button_div);

  product_div.appendChild(image_div);
  product_div.appendChild(product_details_div);

  product_div.setAttribute("id", "product_box");
  product_div.setAttribute("class", "col-xl-4");

  Added_products.appendChild(product_div);
}

function resetformvalues() {
  Product_name.value = "";
  description.value = "";
  price.value = "";
  quantity.value = "";
  image_url.value = "";
  console.log("inside func");
}

function saveproductdetailstostorage(
  product_name,
  description,
  price,
  quantity,
  image_url
) {
  let product_details_arr = getproductsdetailsfromstorage();

  let product_details_obj = {
    product_name,
    description,
    price,
    quantity,
    image_url,
  };

  product_details_arr.push(product_details_obj);

  localStorage.setItem("product_details", JSON.stringify(product_details_arr));
}

function getproductsdetailsfromstorage() {
  let data = localStorage.getItem("product_details");

  return data ? JSON.parse(data) : [];
}

function deletefromstorage(product_name) {
  let data = getproductsdetailsfromstorage();

  let filtered_product = data.filter((element) => {
    if (element.product_name !== product_name) return true;
  });

  localStorage.setItem("product_details", JSON.stringify(filtered_product));
}
