// import jwtDecode from "./node_modules/jwt-decode/build/esm/index.ts";
// Get auth token
const token = localStorage.getItem("auth-token");
const user = localStorage.getItem("user");
const parts = token.split(".");
const payload = JSON.parse(atob(parts[1]));
console.log(payload.user.id);
const id = payload.user.id;
// Socket codes

const socket = io("http://localhost:3000", {
  query: { token },
  transports: ["websocket"],
});
// get messages
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("sent-chat", message);
  messageInput.value = "";
});

// Display messages

socket.on("chat-message", (data) => {
  appendMessage(data);
});

function appendMessage(data) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = `<p class="meta">${data.userName}</p>
  <span class="time">${data.time}</span>
  <p>${data.msg}</p>
  `;
  user === data.userName
    ? messageElement.classList.add("incoming")
    : messageElement.classList.add("outgoing");
  messageContainer.append(messageElement);
}

// fetch chats
const fetchChats = async () => {
  const response = await fetch("http://localhost:3000/chat", {
    method: "GET",
  });
  const result = await response.json();
  const allChats = result.Message;
  allChats.map((message, index) => {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `<p class="meta">${message.userName}</p>
    <p>${message.message}</p>
    `;
    id === message.user
      ? messageElement.classList.add("incoming")
      : messageElement.classList.add("outgoing");
    messageContainer.append(messageElement);
  });
};

document.addEventListener("DOMContentLoaded", fetchChats);
