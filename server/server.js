//require("./config/config");
// const _ = require("lodash");
const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const moment = require("moment");
const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation.js");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3335;

var app = express();
var server = http.createServer(app);
var io = socketIO(server); // will ceate socket entry points and gives access to the socket JS library:
// - /socket.io/socket.io.js
// app.use(bodyParser.json());
app.use(express.static(publicPath));

io.on("connection", socket => {

  socket.on("join", (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback("Name and room name are required.");
    }
    socket.join(params.room);
    // socket.leave(params.room);
    // methods with the channels:
    // io.emit -> io.to(...).emit
    // socket.broadcast.emit -> socket.broadcast.to(...)emit
    // socket.emit
    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app!"));
    socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} has connected`));
    callback();
  });

  socket.on("createMessage", (msg, callback) => {
    console.info("createMessage:", msg);
    // emits the event to all but the current socket...
    // socket.broadcast.emit("newMessage", generateMessage(msg.from, msg.text));
    io.emit("newMessage", generateMessage(msg.from, msg.text));
    callback("THIS IS FROM THE SERVER");
  });

  socket.on("createLocationMessage", (coords, callback) => {
    console.info("createLocationMessage:", coords);
    // emits the event to all but the current socket...
    // socket.broadcast.emit(
    io.emit(
      "newLocationMessage",
      generateLocationMessage("Admin", coords.latitude, coords.longitude));
    callback("THIS IS FROM THE SERVER");
  });

  socket.on("disconnect", () => console.info("Client disconnected..."));
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
})

module.exports = {
  app
};

