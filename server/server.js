//require("./config/config");
// const _ = require("lodash");
const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const moment = require("moment");
const {
  generateMessage,
  generateLocationMessage
} = require("./utils/message");
const {
  isRealString
} = require("./utils/validation");
const {
  Users
} = require("./utils/users");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3335;

var app = express();
var server = http.createServer(app);
var io = socketIO(server); // will ceate socket entry points and gives access to the socket JS library:
// - /socket.io/socket.io.js
var users = new Users();
app.use(express.static(publicPath));

io.on("connection", socket => {

  socket.on("join", (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback("Name and room name are required.");
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    // socket.leave(params.room);
    // methods with the channels:
    // io.emit -> io.to(...).emit
    // socket.broadcast.emit -> socket.broadcast.to(...)emit
    // socket.emit
    io.to(params.room).emit("updateUserList", users.getUserList(params.room));
    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app!"));
    socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} has connected`));
    callback();
  });

  socket.on("createMessage", (msg, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(msg.text)) {
      io.to(user.room).emit("newMessage", generateMessage(user.name, msg.text));
      callback();
    }

  });

  socket.on("createLocationMessage", (coords, callback) => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "newLocationMessage",
        generateLocationMessage(user.name, coords.latitude, coords.longitude));
      callback("THIS IS FROM THE SERVER");
    }
  });

  socket.on("disconnect", () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("updateUserList", users.getUserList(user.room));
      io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left the room "${user.room}".`));
    }
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
})

module.exports = {
  app
};

