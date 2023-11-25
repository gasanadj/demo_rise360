const io = require("socket.io")(4000);

const users = {};
io.on("connection", function (socket) {
  socket.on("disconnect", function () {
    socket.broadcast.emit("user-disconnect", users[socket.id]);
    delete users[socket.id];
  });
  socket.on("new-user", function (name) {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  socket.on("send-chat-message", function (message) {
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
  });
});
