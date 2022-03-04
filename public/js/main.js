$(document).ready(function () {
  let socket = io().connect("http://localhost:5000");

  let userForm = $("#userForm");
  let chatForm = $("#chatForm");
  let username = $("#username");
  let message = $("#chatInput");
  let error = $("#error");
  let userList = $("#userList");
  let messageList = $("#messageList");

  // User enters chat
  userForm.on("submit", function (e) {
    $("#userFormContainer").hide();
    socket.emit("setUser", username.val(), function (data) {
      if (data) {
        $("#userFormContainer").hide();
      } else {
        error.html("Username is taken");
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
      html += "<li>" + data[i] + "</li>";
    }
    userList.html(html);
  });
});
