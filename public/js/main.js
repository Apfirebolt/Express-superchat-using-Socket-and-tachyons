$(document).ready(function () {
  let socket = io().connect("http://localhost:5000");

  let userForm = $("#userForm");
  let chatForm = $("#chatForm");
  let username = $("#username");
  let message = $("#chatInput");
  let error = $("#error");
  let userList = $("#userList");
  let messageList = $("#messageList");
  let chatContainer = $('#chatContainer');
  let welcomeMessage = $("#welcomeMessage");

  chatContainer.hide()

  // User enters chat
  userForm.on("submit", function (e) {
    $("#userFormContainer").hide();
    socket.emit("setUser", username.val(), function (data) {
      if (data) {
        $("#userFormContainer").hide();
        chatContainer.fadeIn();
        welcomeMessage.html("Welcome to the chatroom, " + username.val())
      } else {
        alert('That username is already taken')
      }
    });
    e.preventDefault();
  });

  // Submit Chat Form
  chatForm.on("submit", function (e) {
    socket.emit("sendMessage", message.val());
    message.val("");
    e.preventDefault();
  });

  socket.on("showMessage", function (data) {
    messageList.append(
      "<strong>" + data.user + "</strong>: " + data.msg + "<br>"
    );
  });

  // Display Usernames
  socket.on("users", (data) => {
    let html = "";
    for (let i = 0; i < data.length; i++) {
      html += "<li class='pa2 bg-light-green'>" + data[i] + "</li>";
    }
    userList.html(html);
  });
});
