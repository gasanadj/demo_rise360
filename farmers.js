const table = document.getElementById("product-table");
const number = document.getElementById("number");
const token = localStorage.getItem("auth-token");
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
