const registerButton = document.getElementById("btn");
const loginButton = document.getElementById("btn-login");
registerButton.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const fname = document.getElementById("fname").value;
  const phone = document.getElementById("phone").value;
  const role = document.getElementById("role").value;
  try {
    const result = await fetch("http://localhost:3000/user/register", {
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
      }),
    });
    const response = await result.json();
    if (result.status == 201) {
      alert(response.Message);
    } else {
      alert(response.Message);
    }
  } catch (error) {
    alert(error);
  }
});

loginButton.addEventListener("click", async () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const result = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const response = await result.json();
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
      alert("User Login Successful");
      if (response.user.role == "seller") {
        window.location.href = "./farmers.html";
      }
    }
  } catch (error) {}
});
