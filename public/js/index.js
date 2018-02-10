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
  var li = jQuery("<li></li>");
  li.text(`${msg.from} ${fTime(msg)}: ${msg.text}`);
  jQuery("#messages").append(li);
}

socket.on("newMessage", appendMsg);

socket.on("newLocationMessage", function(msg) {
  console.log("New Message:", msg);
  var li = jQuery("<li></li>");
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${msg.from} ${fTime(msg)}: `);
  a.attr("href", msg.url);
  li.append(a);

  jQuery("#messages").append(li);
});

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

