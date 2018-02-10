var socket = io();

socket.on("connect", function() {
  console.log("Connected to the server");
});

socket.on("disconnect", function() {
  console.log("Disconnected from the server");
});

function fTime(msg) {
  return moment(msg.createdAt).format("h:mm a");
}

function appendMsg(msg) {
  msg.formattedTime = fTime(msg);
  var template = jQuery("#message-template").html();
  var html = Mustache.render(template, msg);
  jQuery("#messages").append(html);
}

socket.on("newMessage", appendMsg);
socket.on("newLocationMessage", appendMsg);

jQuery("#message-form").on("submit", function(e) {
  e.preventDefault();
  var msgTextbox = jQuery("[name=message]");
  var msg = {
    from: "User",
    text: msgTextbox.val()
  }
  socket.emit("createMessage", msg, function(data) {
    msgTextbox.val("");
  });
});

var locationButton = jQuery("#send-location");
locationButton.on("click", function(e) {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser.");
  }

  locationButton.attr("disabled", "disconnect").text("Sending location...");

  navigator.geolocation.getCurrentPosition(
    function(position) {
      console.log("POSITION:", position);
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, function(data) {
        // console.log("Got it", data);
        locationButton.removeAttr("disabled").text("Send location");
      });
    },
    function() {
      alert("Unable to fetch the location.").text("Send location");
      locationButton.removeAttr("disabled");
    });
});

