var socket = io();

socket.on("connect", function() {
  var params = jQuery.deparam(window.location.search);
  socket.emit("join", params, function (err) {
    if (err) {
      alert(err)
      window.location.href = "/";
    } else {
      console.log("No error");
    }
  });
});

socket.on("disconnect", function() {
  console.log("Disconnected from the server");
});

socket.on("updateUserList", function(users) {
  console.log("User list:", users);
  var ol = jQuery("<ol></ol>");
  users.forEach(function (user) {
    ol.append(jQuery("<li></li>").text(user));
  });
  jQuery("#users").html(ol);
});

function appendMsg(msg) {
  msg.formattedTime = moment(msg.createdAt).format("h:mm a");
  var template = jQuery("#message-template").html();
  var html = Mustache.render(template, msg);
  jQuery("#messages").append(html);
  scrollToBottom();
}

function scrollToBottom () {
  var messages = jQuery("#messages");
  var newMessage = messages.children("li:last-child");
  var clientHight = messages.prop("clientHeight"); // jQuery cross-broweser prop...
  var scrollTop = messages.prop("scrollTop");
  var scrollHeight = messages.prop("scrollHeight");
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  if (clientHight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
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

