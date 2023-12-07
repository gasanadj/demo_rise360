const registerButton = document.getElementById("btn");
const loginButton = document.getElementById("btn-login");
registerButton.addEventListener("click", async () => {
  registerButton.disabled = true;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const fname = document.getElementById("fname").value;
  const phone = document.getElementById("phone").value;
  const role = document.getElementById("role").value;
  const location = document.getElementById("location").value;

  Swal.fire({
    title: "Confirm",
    text: "Is the data provided accurate?",
    confirmButtonText: "Yes",
    preConfirm: async () => {
      try {
        const result = await fetch(
          "https://risefarmer360.onrender.com/user/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
              name: fname,
              role: role,
              phone: phone,
              location: location,
            }),
          }
        );
        const response = await result.json();
        if (result.status == 201) {
          Swal.fire({
            title: "Success",
            text: response.Message,
            confirmButtonText: "OK",
            preConfirm: () => {
              login();
            },
            icon: "success",
          });
          registerButton.disabled = false;
        } else {
          Swal.fire({
            title: "Error",
            text: response.Message,
            icon: "error",
          });
        }
        registerButton.disabled = false;
      } catch (error) {
        alert(error);
        registerButton.disabled = false;
      }
    },
    icon: "info",
  });
});

loginButton.addEventListener("click", async () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  loginButton.disabled = true;

  try {
    const result = await fetch(
      "https://risefarmer360.onrender.com/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const response = await result.json();
    localStorage.setItem("userData", JSON.stringify(response.user));
    console.log(response.user);
    if (result.status == 200) {
      const token = response.token;
      const parts = token.split(".");
      const payload = JSON.parse(atob(parts[1]));
      const user = payload.user.user;
      const role = payload.user.role;
      localStorage.setItem("auth-token", token);
      localStorage.setItem("user", user);
      localStorage.setItem("role", role);
      console.log(response.user.role == "seller");
      if (response.user.role == "seller") {
        window.location.href = "./farmers.html";
      }
    } else {
      Swal.fire({
        title: "Error",
        text: response.Message,
        icon: "error",
      });
      loginButton.disabled = false;
    }
  } catch (error) {
    loginButton.disabled = false;
  }
});

var a = document.getElementById("loginBtn");
var b = document.getElementById("registerBtn");
var x = document.getElementById("login");
var y = document.getElementById("register");

function login() {
  x.style.left = "4px";
  y.style.right = "-520px";
  a.className += " white-btn";
  b.className = "btn";
  x.style.opacity = 1;
  y.style.opacity = 0;
}

function register() {
  x.style.left = "-510px";
  y.style.right = "5px";
  a.className = "btn";
  b.className += " white-btn";
  x.style.opacity = 0;
  y.style.opacity = 1;
}
