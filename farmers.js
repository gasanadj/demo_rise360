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
    .then(() => deleteProducts())
    .then(() => updateProducts());
});

const updateProducts = () => {
  const editButtons = [...document.getElementsByClassName("btn-edit")];
  editButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const dataId = button.dataset.id;
      await fetch(`http://localhost:3000/products/${dataId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      })
        .then(async (res) => {
          if (res.ok) return res.json();
        })
        .then(({ product }) => {
          console.log(product);
          const formHTML = `
          <form id="content">
          <label><strong>Name of Product:</strong> </label><br>
          <input type="text" name="fname" id="pname" placeholder="Enter Product Name" autocomplete="off" value = ${product.name}><br><br>

          <label><strong>Description:</strong> </label><br>
          <input type="text" name="desc" id="pdescription" placeholder="Describe product" autocomplete="off" value = ${product.description}><br><br> 
              
          <label><strong>Price:</strong> </label><br>
          <input type="text" name="price" id="pamount" placeholder="Price in $" autocomplete="off" value = ${product.price}><br><br>


          <label><strong>Category of Product</strong></label><br>
          <input type="text" name="category" id="pcategory" placeholder="Enter Category" autocomplete="off" value = ${product.category}><br><br>
          <label><strong>Upload image</strong></label><br>
          <input class="product-image" type="file" id="pfile" name="file"><br><br>
        </form>

          `;
          Swal.fire({
            title: "Update product",
            html: formHTML,
            confirmButtonText: "Update",
            preConfirm: async () => {
              const ppname = document.getElementById("pname");
              const pdesc = document.getElementById("pdescription");
              const pprice = document.getElementById("pamount");
              const pcategory = document.getElementById("pcategory");
              const pimage = document.getElementById("pfile");
              const UpdateformData = new FormData();
              UpdateformData.append("name", ppname.value);
              UpdateformData.append("description", pdesc.value);
              UpdateformData.append("category", pcategory.value);
              UpdateformData.append("price", pprice.value);
              // for (let i = 0; i < images.files.length; i++) {
              //   UpdateformData.append("image", pimage.files[i]);
              // }
              await fetch(`http://localhost:3000/products/update/${dataId}`, {
                method: "PUT",
                headers: {
                  "auth-token": token,
                },
                body: UpdateformData,
              })
                .then((res) => {
                  if (res.ok) return res.json();
                })
                .then(({ Message }) => {
                  Swal.fire({
                    title: "Success",
                    icon: "success",
                    text: Message,
                  });
                });
            },
          });
        });
    });
  });
};

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

const updateProduct = async (id) => {};

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
        const result = await fetch("http://localhost:3000/products/add", {
          method: "POST",
          headers: {
            "auth-token": token,
          },
          body: formData,
        });
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
