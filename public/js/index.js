var socket = io();

socket.on("connect", function() {

  console.log("Connected to the server");

  // socket.emit("createEmail", {
  //   to: "jen@example.com",
  //   text: "Hey. This is ...",
  //   subject: "Hey"
  // });

  socket.emit("createMessage", {
    from: "jen",
    text: "Hey. This is ...",
  });

});

socket.on("disconnect", function() {
  console.log("Disconnected from the server");
});

// socket.on("newEmail", function(email) {
//   console.log("New Email:", email);
// });

socket.on("newMessage", function(msg) {
  console.log("New Message:", msg);
});

