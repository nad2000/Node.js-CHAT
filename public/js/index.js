var socket = io();

socket.on("connect", function() {
  console.log("Connected to the server");
});

socket.on("disconnect", function() {
  console.log("Disconnected from the server");
});

socket.on("newEmail", function(email) {
  console.log("New Email:", email);
});

