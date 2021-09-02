// Taking refrence of login page

const username_login = document.getElementById("username_login");
const passwd_login = document.getElementById("passwd_login");

const login = document.getElementById("login");
const Login_form = document.getElementById("Login_form");
const error = document.getElementById("error");

// taking reference of sign up page

const Signup_form = document.getElementById("Signup_form");
const signup = document.getElementById("signup");
const username_signup = document.getElementById("username_signup");
const passwd_signup = document.getElementById("passwd_signup");

// admin credentials

let admin = {
  username: "admin",
  password: "admin123",
};

// when come on login page
if (Login_form) {
  Login_form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (mode.value === "customer") {
      chechforparametersofcustomer(
        username_login.value,
        passwd_login.value,
        mode.value
      );
    } else {
      checkforparametersofadmin(username_login.value, passwd_login.value);
    }
  });
}

// when we come on SignUp page

if (Signup_form) {
  Signup_form.addEventListener("submit", function (event) {
    event.preventDefault();

    const username_signup_value = username_signup.value;
    const passwd_signup_value = passwd_signup.value;
    console.log(username_signup_value, passwd_signup_value);

    let users = getuserfromstorage();
    console.log(users);

    if (users) {
      let check_availability = checkForUserFromStorage(username_signup_value);
      console.log(check_availability);
      if (check_availability)
        error.innerText = "This Username already exists!!";
      else {
        savetostorage(
          username_signup_value,
          convertToHash(passwd_signup_value)
        );
        error.innerText = `Successfully Signed Up!!
                       go to login page!`;
      }
    } else {
      error.innerText = `Successfully Signed Up!!
                       go to login page!`;
      savetostorage(username_signup_value, convertToHash(passwd_signup_value));
    }
  });
}
let users = {};
// functions

// functions of signup

function getuserfromstorage() {
  let users = localStorage.getItem("user_details");
  return users ? JSON.parse(users) : [];
}

function checkForUserFromStorage(username) {
  let users = getuserfromstorage();

  if (users[username]) return true;
  else return false;
}

function savetostorage(username, password) {
  users[username] = {
    username,
    password,
    is_customer: false,
  };
  localStorage.setItem("user_details", JSON.stringify(users));
}

// functions of login

function chechforparametersofcustomer(username, password, account_type) {
  let users = getuserfromstorage();

  console.log(users);
  console.log(account_type);

  // console.log(convertToHash(password));

  if (users[username]) {
    if (
      users[username].password === convertToHash(password) &&
      account_type === "customer"
    ) {
      saveUserName(username);
      window.open("./customer.html", "_self");
      error.innerText = `Hi, ${username} you have successfully loged in`;
    } else error.innerText = "username or password is incorrect!!";
  } else error.innerText = "This account does not exists!!";
}

function checkforparametersofadmin(username, password) {
  if (
    admin.username === username &&
    convertToHash(admin.password) === convertToHash(password)
  ) {
    console.log(convertToHash(password));
    error.innerText = "Successfully loged in as Admin";
    window.open("./admin.html", "_self");
    saveUserName("admin");
  } else error.innerText = "Wrong Admin Credentials";
}

function convertToHash(str) {
  var hash = 0,
    i = 0,
    len = str.length;
  while (i < len) {
    hash = ((hash << 5) - hash + str.charCodeAt(i++)) << 0;
  }
  return hash;
}

function saveUserName(name) {
  localStorage.setItem("user", JSON.stringify(name));
}
