const token = localStorage.getItem("auth-token");
const userData = JSON.parse(localStorage.getItem("userData"));
const previewContainer = document.querySelector(".products-preview");
const vegetables = ["p4", "p5", "p6", "p7"];
let currentPosition = 0;
function moveLeft(divSlider) {
  console.log(divSlider);
  currentPosition += 15; // Adjust the value based on the width of your product items
  if (currentPosition < 0) {
    currentPosition = 0;
  }
  document.getElementById(
    divSlider
  ).style.transform = `translateX(${-currentPosition}rem)`;
  if (currentPosition >= 60) {
    currentPosition = 0;
    document.getElementById(
      divSlider
    ).style.transform = `translateX(${-currentPosition}rem)`;
  }
}

function moveRight(divSlider) {
  console.log(divSlider);
  currentPosition -= 15; // Adjust the value based on the width of your product items
  document.getElementById(
    divSlider
  ).style.transform = `translateX(${-currentPosition}rem)`;
  if (currentPosition <= 0) {
    currentPosition = 0;
    document.getElementById(
      divSlider
    ).style.transform = `translateX(${-currentPosition}rem)`;
  }
}

function toggleDropdown() {
  const dropdownContent = document.getElementById("dropdownOptions");
  dropdownContent.classList.toggle("show");
}

function filtering(category) {
  const allTypes = ["vegetables", "fruits", "localFood"];

  allTypes.forEach((type) => {
    const elements = document.getElementsByClassName(type);

    for (let i = 0; i < elements.length; i++) {
      if (category === "all" || type === category) {
        // Show the selected category or all categories
        elements[i].style.display = "block";
      } else {
        // Hide other categories
        elements[i].style.display = "none";
      }
    }
  });

  // Close the dropdown after selecting a category
  toggleDropdown();
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// Fetch Products
const veggies = document.getElementById("vegetables");
const fruits = document.getElementById("Fruits");
const locals = document.getElementById("Local");
document.addEventListener("DOMContentLoaded", async () => {
  await fetch("https://risefarmer360.onrender.com/products", {
    method: "GET",
  })
    .then(async (res) => {
      return await res.json();
    })
    .then((data) => {
      var products = data.Message;
      let index = 1;
      console.log(products);
      products.forEach((product) => {
        if (product.category.toLowerCase() == "fruits") {
          fruits.innerHTML += `
        <div class="product" data-name="p${product._id}">
          <img src=${product.Image}>
          <h3>${product.name}</h3>
          <div class="price">$${product.price}</div>
          <button class="buy green-button">Buy now</button>
        </div> 
          `;
        } else if (product.category.toLowerCase() == "vegetables") {
          veggies.innerHTML += `
          <div class="product" data-name="p${product._id}">
          <img src=${product.Image}>
          <h3>${product.name}</h3>
          <div class="price">$${product.price}</div>
          <button class="buy green-button">Buy now</button>
        </div>
          `;
        } else {
          locals.innerHTML += `
          <div class="product" data-name="p${product._id}">
          <img src=${product.Image}>
          <h3>${product.name}</h3>
          <div class="price">$${product.price}</div>
          <button class="buy green-button">Buy now</button>
        </div>
          `;
        }

        previewContainer.innerHTML += `
        <div class="preview" data-target="p${product._id}">
        <i class="fas fa-times"></i>
        <img src=${product.Image}>
        <h3>${product.name}</h3>
        <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            
        </div>
        <p>${product.description}</p>
        <p>Owner ${product.seller}</p>
        <p>Contact ${product.phone}</p>
        <div class="price">$${product.price}</div>
        <div class="buttons">
            <a href="#" class="buy">Buy now</a>
            <a href="#" onclick="addToCart('${product._id}', '${product.name}', ${product.price})" class="add" data-product-id="${product._id}" data-product-name="${product.name}" data-product-price="${product.price}">Add to cart</a>
        </div>
    </div>
        `;
        index++;
      });
    })
    .then(() => {
      const preview = previewContainer.querySelectorAll(".preview");
      preview.forEach((close) => {
        close.querySelector(".fa-times").addEventListener("click", () => {
          close.classList.remove("active");
          previewContainer.style.display = "none";
        });
      });
      document
        .querySelectorAll(".products-container .product")
        .forEach((product) => {
          product.addEventListener("click", () => {
            const name = product.dataset.name;
            previewContainer.style.display = "flex";
            const items = Array.from(preview).filter((prev) => {
              return prev.dataset.target == name;
            });
            items.forEach((item) => {
              item.classList.add("active");
            });
          });
        });
    });
});

const shoppingCart = [];
const addToCart = (id, name, price) => {
  const existingItem = shoppingCart.find((item) => item.id === id);
  if (!token) {
    Swal.fire({
      title: "Authentication Required",
      icon: "info",
      text: "Login in first to start shopping",
    });
  } else {
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      shoppingCart.push({
        id,
        name,
        price,
        quantity: 1,
      });
    }
    alert("Product added to cart successfully!");
  }
};

const incrementItem = (index) => {
  shoppingCart[index].quantity += 1;
  formatCartForAlert(shoppingCart);
};

const decrementItem = (index) => {
  if (shoppingCart[index].quantity > 1) {
    shoppingCart[index].quantity -= 1;
  }
  formatCartForAlert(shoppingCart);
};

const myBtn = document.getElementById("btn-checkout");
myBtn.addEventListener("click", () => {
  if (shoppingCart.length > 0) {
    // Use the Swal.fire method to display a custom alert
    Swal.fire({
      title: "Shopping Cart",
      html: formatCartForAlert(shoppingCart),
      icon: "info",
      confirmButtonText: "Proceed to checkout",
      preConfirm: async () => {
        fetch("https://risefarmer360.onrender.com/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: shoppingCart,
            userEmail: userData.email,
          }),
        })
          .then((res) => {
            if (res.ok) return res.json();
            return res.json().then((json) => Promise.reject(json));
          })
          .then(({ url }) => {
            console.log(url);
            window.location = url;
          })
          .catch((e) => console.error(e.error));
      },
    });
  } else {
    Swal.fire({
      title: "Empty Cart",
      text: "Your cart is empty. Add items before checking out.",
      icon: "warning",
      confirmButtonText: "OK",
    });
  }
});
function formatCartForAlert(cart) {
  return cart
    .map(
      (item, index) =>
        `
        <div class="cart-items">
        <button onclick="decrementIndex(${index})">-</button>
        <p>${item.name} - Quantity: ${item.quantity} - Price: $${
          item.price * item.quantity
        }</p>
        <button onclick = "incrementItem(${index})">+</button>
        </div>
        `
    )
    .join("");
}
