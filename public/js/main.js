$(document).ready(function () {
  let socket = io().connect("http://localhost:5000");
  console.log("still works ready!", socket);

  let userForm = $("#userForm");
  let chatForm = $("#chatForm");
  let username = $("#username");
  let message = $("#chatInput");
  
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
    console.log('Chat submit called..')
    socket.emit("sendMessage", message.val());
    message.val("");
    e.preventDefault();
  });

  socket.on('showMessage', function(data){
    console.log('Data is ', data)
  });

  // Display Usernames
  socket.on("users", (users) => {
    console.log("Emitted users", users);
  });
});
