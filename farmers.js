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

// Check for token
if (!token) {
  alert("Please Login First");
  window.location.href = "./form.html";
}

// --------------Displaying products-------------------
document.addEventListener("DOMContentLoaded", async () => {
  await fetch("http://localhost:3000/products", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      const products = response.Message;
      number.innerText = products.length;
      products.map((product, index) => {
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
      deleteProduct(dataId);
    });
  });
};

// ---------Deleting a product
const deleteProduct = async (id) => {
  try {
    const result = await fetch(`http://localhost:3000/products/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      mode: "cors",
    });
    const response = await result.json();
    console.log(response);
    if (result.status == 200) {
      alert(response.Message);
      window.location.reload();
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
  formData.append("name", pname.value);
  formData.append("description", desc.value);
  formData.append("category", category.value);
  formData.append("price", price.value);
  for (let i = 0; i < images.files.length; i++) {
    formData.append("image", images.files[i]);
  }
  try {
    const result = await fetch("http://localhost:3000/products/add", {
      method: "POST",
      headers: {
        "auth-token": token,
      },
      body: formData,
    });
    const response = await result.json();
    if (result.status == 201) {
      alert(response.Message);
      window.location.reload();
    }
  } catch (error) {
    alert(error.message);
  }
});

// logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("auth-token");
  window.location.reload();
});
