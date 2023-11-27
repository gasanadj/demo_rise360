// Get auth token
const token = localStorage.getItem("auth-token");
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

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = message;
  messageContainer.append(messageElement);
}

// const socket = io("http://localhost:4000");
// socket.on("chat-message", (data) => {
//   appendMessage(`${data.name}: ${data.message}`);
// });

// const name = prompt("What is your name");
// appendMessage("You Joined");
// socket.emit("new-user", name);

// socket.on("user-connected", (name) => {
//   appendMessage(`${name} Joined`);
// });

// socket.on("user-disconnect", (name) => {
//   appendMessage(`${name} left`);
// });
