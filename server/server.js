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

  socket.emit("newEmail", {
    from: "mike@example.com",
    text: "Hey! what is going on?",
    createdAt: 123
  });

  socket.on("createEmail", newEmail => console.info("createEmail:", newEmail));

  socket.on("disconnect", () => console.info("Client disconnected..."));
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
})

module.exports = {
  app
};

