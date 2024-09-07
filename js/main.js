// declering variavles
var inputName = document.getElementById("name");
var inputPrice = document.getElementById("price");
var inputCat = document.getElementById("cat");
var inputDesc = document.getElementById("desc");
var inputCount = document.getElementById("count");
var addBTN = document.getElementById("add-btn");
var editIcon = document.querySelector(".fa-pen-to-square");
var deleteIcon = document.querySelector(".fa-trash");
var tbody = document.getElementById("tbody");

var arrProduct;
var currentIndex;

// add new product
const getAddData = () => {
  var product = {
    name: inputName.value,
    price: inputPrice.value,
    cat: inputCat.value,
    desc: inputDesc.value,
    count: inputCount.value,
  };
  arrProduct.push(product);
  localStorage.setItem("product", JSON.stringify(arrProduct));
  clearInputs();
  displyData(arrProduct);
};

// handle updata data
const getUpdataData = () => {
  var product = {
    name: inputName.value,
    price: inputPrice.value,
    cat: inputCat.value,
    desc: inputDesc.value,
    count: inputCount.value,
  };
  arrProduct[currentIndex] = product;
  localStorage.setItem("product", JSON.stringify(arrProduct));
  displyData(arrProduct);
  clearInputs();
  addBTN.innerHTML = "Add Product";
};

// handle get data
const getData = () => {
  if (addBTN.innerHTML.trim() == "Add Product") {
    if (
      testName() &&
      testPrice() &&
      testCount() &&
      testCategory() &&
      testDesc()
    ) {
      getAddData();
    } else {
      snackbarMessage();
    }
  } else {
    if (
      testName() &&
      testPrice() &&
      testCount() &&
      testCategory() &&
      testDesc()
    ) {
      getUpdataData();
    } else {
      snackbarMessage();
    }
  }
};

// clear all inputs after adding each product
const clearInputs = () => {
  inputName.value = "";
  inputPrice.value = "";
  inputCat.value = "";
  inputCount.value = "";
  inputDesc.value = "";
};

// handle delete all btn
const deleteAllBtn = () => {
  var deleteAllBtn = document.getElementById("delete-all");
  if (arrProduct.length > 0) {
    deleteAllBtn.style.display = "block";
  } else {
    deleteAllBtn.style.display = "none";
  }
};

// handle disply products inn table
const displyData = arrProduct => {
  var rowTableData = ``;
  for (let i = 0; i < arrProduct.length; i++) {
    rowTableData += `
        <tr>
          <td>${i + 1}</td>
          <td>${arrProduct[i].name}</td>
          <td>${arrProduct[i].price}</td>
          <td>${arrProduct[i].count}</td>
          <td>${arrProduct[i].cat}</td>
          <td>${arrProduct[i].desc}</td>
          <td>
            <i
            onclick="editBtn(${i})"
              class="fa-solid fa-pen-to-square"
              style="padding-right: 20px; color: var(--bs-warning)"
            ></i>
            <i 
            onclick="deleteData(${i});"
            class="fa-solid fa-trash" style="color: rgb(228, 35, 35)"></i>
          </td>
        </tr>`;
  }
  tbody.innerHTML = rowTableData;
  deleteAllBtn();
};

// handle all product btn
const deleteAllProducts = () => {
  arrProduct = [];
  localStorage.setItem("product", JSON.stringify(arrProduct));
  displyData(arrProduct);
  deleteAllBtn();
};

// handle local storage
if (localStorage.getItem("product") != null) {
  arrProduct = JSON.parse(localStorage.getItem("product"));
  displyData(arrProduct);
} else {
  arrProduct = [];
  deleteAllBtn();
}

// handle delete btn
const deleteData = index => {
  arrProduct.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(arrProduct));
  displyData(arrProduct);
  deleteAllBtn();
};

// handle edit btn
const editBtn = index => {
  currentIndex = index;
  inputName.value = arrProduct[index].name;
  inputPrice.value = arrProduct[index].price;
  inputCount.value = arrProduct[index].count;
  inputCat.value = arrProduct[index].cat;
  inputDesc.value = arrProduct[index].desc;

  addBTN.innerHTML = "Updata Product";
};

// handle search input
const searchInput = word => {
  var newArray = [];

  for (let i = 0; i < arrProduct.length; i++) {
    if (arrProduct[i].name.toLowerCase().includes(word.toLowerCase())) {
      newArray.push(arrProduct[i]);
    }
    displyData(newArray);
  }
};

// handle regex
// 1- product name input validation
const testName = () => {
  var nameRegEx = /^[a-zA-Z0-9\s]{3,50}$/;
  const nameValue = inputName.value.trim();
  if (nameRegEx.test(nameValue)) {
    inputName.classList.add("is-valid");
    inputName.classList.remove("is-invalid");
    return true;
  } else {
    inputName.classList.add("is-invalid");
    inputName.classList.remove("is-valid");
    return false;
  }
};
// 2- product Price input validation
const testPrice = () => {
  const priceRegEx = /^\d+(\.\d{1,2})?$/;
  const priceValue = inputPrice.value.trim();

  if (priceRegEx.test(priceValue)) {
    inputPrice.classList.add("is-valid");
    inputPrice.classList.remove("is-invalid");
    return true;
  } else {
    inputPrice.classList.add("is-invalid");
    inputPrice.classList.remove("is-valid");
    return false;
  }
};

// 3- product counts input validation
const testCount = () => {
  const countRegEx = /^[1-9]\d*$/;
  const countValue = inputCount.value.trim();

  if (countRegEx.test(countValue)) {
    inputCount.classList.add("is-valid");
    inputCount.classList.remove("is-invalid");
    return true;
  } else {
    inputCount.classList.add("is-invalid");
    inputCount.classList.remove("is-valid");
    return false;
  }
};

// 4- product category input validation
const testCategory = () => {
  const catRegEx = /^[a-zA-Z0-9\s]{3,20}$/;
  const catValue = inputCat.value.trim();

  if (catRegEx.test(catValue)) {
    inputCat.classList.add("is-valid");
    inputCat.classList.remove("is-invalid");
    return true;
  } else {
    inputCat.classList.add("is-invalid");
    inputCat.classList.remove("is-valid");
    return false;
  }
};

// 5- product description input validation
const testDesc = () => {
  const descRegEx = /^.{0,200}$/;
  const descValue = inputDesc.value.trim();

  if (descRegEx.test(descValue)) {
    inputDesc.classList.add("is-valid");
    inputDesc.classList.remove("is-invalid");
    return true;
  } else {
    inputDesc.classList.add("is-invalid");
    inputDesc.classList.remove("is-valid");
    return false;
  }
};

// showing and hidden snackbar message
const snackbarMessage = () => {
  var snackBar = document.getElementById("snackbar");
  snackBar.className = "show";

  setTimeout(() => {
    snackBar.className = snackBar.className.replace("show", "");
  }, 3000);
};

// handle light and drak mode
const toggleMode = () => {
  const body = document.body;
  const toggleIcon = document.getElementById("toggleDark");

  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    toggleIcon.classList.replace("fa-sun", "fa-moon");
    toggleIcon.style.color = "black";
    body.style.background = "#f2f2f2";
    body.style.color = "black";
    localStorage.setItem("theme", "light");
  } else {
    toggleIcon.classList.replace("fa-moon", "fa-sun");
    toggleIcon.style.color = "rgb(221, 221, 46)";
    body.style.background = "rgb(34, 34, 34)";
    body.style.color = "white";
    localStorage.setItem("theme", "dark");
  }
};

// saved theme in local storage
const applySavedTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const body = document.body;
  const toggleIcon = document.getElementById("toggleDark");

  if (savedTheme === "light") {
    body.classList.add("light-mode");
    toggleIcon.classList.replace("fa-sun", "fa-moon");
    toggleIcon.style.color = "black";
    body.style.background = "#f2f2f2";
    body.style.color = "black";
  } else {
    // Default to dark mode if no theme is saved
    body.classList.remove("light-mode");
    toggleIcon.classList.replace("fa-moon", "fa-sun");
    toggleIcon.style.color = "rgb(221, 221, 46)";
    body.style.background = "rgb(34, 34, 34)";
    body.style.color = "white";
  }
};

// Call this function on page load
applySavedTheme();
