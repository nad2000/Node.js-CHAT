//require("./config/config");
// const _ = require("lodash");
const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
// const bodyParser = require("body-parser");
// const {ObjectID} = require("mongodb");

// const {mangoose} = require("./db/mongoose");
// const {User} = require("./models/user");
// const {Todo} = require("./models/todo");
// const {authenticate} = require("./middleware/authenticate");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3335;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);  // will ceate socket entry points and gives access to the socket JS library:
// - /socket.io/socket.io.js
// app.use(bodyParser.json());
app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("new user connected.");

  socket.on("createMessage", msg => {
    console.info("createMessage:", msg);
    io.emit("newMessage", {
      from: msg.from,
      text: msg.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on("disconnect", () => console.info("Client disconnected..."));
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
})

module.exports = {
  app
};

