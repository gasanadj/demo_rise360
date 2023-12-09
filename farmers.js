// ----------Declaring constants-----------------
const table = document.getElementById("product-table");
const number = document.getElementById("number");
const token = localStorage.getItem("auth-token");
const pname = document.getElementById("name");
const desc = document.getElementById("description");
const price = document.getElementById("amount");
const category = document.getElementById("category");
const images = document.getElementById("file");
const submitButton = document.getElementById("submit-btn");
const logoutBtn = document.getElementById("logout");
const user = localStorage.getItem("user");
const person = document.getElementById("person-name");

// Check for token
if (!token) {
  alert("Please Login First");
  window.location.href = "./form.html";
}

// --------------Displaying products-------------------
document.addEventListener("DOMContentLoaded", async () => {
  person.innerText = user;
  await fetch("https://risefarmer360.onrender.com/products", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      const products = response.Message;
      const ownedProducts = products.filter((product) => {
        return product.seller == user;
      });
      console.log(ownedProducts);
      number.innerText = ownedProducts.length;
      ownedProducts.map((product, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${product.name}</td>
      <td>${product.description}</td>
      <td>${product.price}</td>
      <td>${product.category}</td>
      <td>
          <button id="edit" class="btn-edit" data-id="${product._id}">Edit</button>
          <button id="delete" class="btn-delete" data-id="${product._id}">Delete</button>
      </td>
      `;
        table.append(tr);
      });
    })
    .then(() => deleteProducts());
});

const deleteProducts = () => {
  const deleteButtons = [...document.getElementsByClassName("btn-delete")];
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const dataId = button.dataset.id;
      Swal.fire({
        title: "Confirm",
        text: "Are you sure you want to delete the product",
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        preConfirm: () => {
          deleteProduct(dataId);
        },
        icon: "info",
      });
    });
  });
};

// ---------Deleting a product
const deleteProduct = async (id) => {
  try {
    const result = await fetch(
      `https://risefarmer360.onrender.com/products/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        mode: "cors",
      }
    );
    const response = await result.json();
    console.log(response);
    if (result.status == 200) {
      Swal.fire({
        title: "Success",
        text: response.Message,
        icon: "success",
        confirmButtonText: "OK",
        preConfirm: () => {
          window.location.reload();
        },
      });
    } else {
      Swal.fire({
        title: "Error",
        text: response.Message,
        icon: "error",
      });
    }
  } catch (error) {
    alert(error.message);
  }
};

// ----------Add Product Modal open

const openModal = () => {
  document.getElementById("addProductModal").style.display = "block";
};

function closeModal() {
  document.getElementById("addProductModal").style.display = "none";
}

const addButton = document.querySelector("button");
addButton.addEventListener("click", openModal);

// ---------------Adding a product------------------
const formData = new FormData();
submitButton.addEventListener("click", async (e) => {
  e.preventDefault();
  Swal.fire({
    title: "Confirm",
    text: "Is the data provided accurate?",
    confirmButtonText: "Yes",
    preConfirm: async () => {
      formData.append("name", pname.value);
      formData.append("description", desc.value);
      formData.append("category", category.value);
      formData.append("price", price.value);
      for (let i = 0; i < images.files.length; i++) {
        formData.append("image", images.files[i]);
      }
      try {
        const result = await fetch(
          "https://risefarmer360.onrender.com/products/add",
          {
            method: "POST",
            headers: {
              "auth-token": token,
            },
            body: formData,
          }
        );
        const response = await result.json();
        if (result.status == 201) {
          Swal.fire({
            title: "Success",
            text: response.Message,
            icon: "success",
            confirmButtonText: "OK",
            preConfirm: () => {
              window.location.reload();
            },
          });
        } else {
          Swal.fire({
            title: "Error",
            text: response.Message,
            icon: "error",
          });
        }
      } catch (error) {
        alert(error);
      }
    },
    icon: "info",
  });
});

// logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("auth-token");
  window.location.href = "./form.html";
});
