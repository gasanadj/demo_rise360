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

const scrollToBottom = () => {
  messageContainer.scrollTop = messageContainer.scrollHeight;
};

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
  scrollToBottom();
}

// fetch chats
const fetchChats = async () => {
  const response = await fetch("http://localhost:3000/chat", {
    method: "GET",
  });
  const result = await response.json();
  const allChats = result.Message;
  console.log(result);
  allChats.map((message, index) => {
    const messageElement = document.createElement("div");
    const date = message.date;
    const parts = date.split("T");
    console.log(parts[1]);
    const time_parts = parts[1].split(":");
    const time = `${parseInt(time_parts[0]) + 2}:${time_parts[1]}`;
    messageElement.innerHTML = `<p class="meta">${message.userName}</p>
    <span class = "time">${time}</span>
    <p>${message.message}</p>
    `;
    id === message.userId
      ? messageElement.classList.add("incoming")
      : messageElement.classList.add("outgoing");
    messageContainer.append(messageElement);
  });
};

document.addEventListener("DOMContentLoaded", fetchChats);
