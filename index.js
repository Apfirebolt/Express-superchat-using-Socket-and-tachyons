const createError = require("http-errors");
const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");

const Server = require("socket.io").Server

const app = express()
const server = http.createServer(app);
const io = new Server(server)

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", async function (req, res, next) {
  res.render("index");
});

let users = []

// Socket.io connect
io.sockets.on('connection', (socket) => {  
  socket.on('setUser', (data, callback) => {
    if(users.indexOf(data) !== -1){
      callback(false);
    } else {
      callback(true);
      socket.username = data;
      users.push(socket.username);
      updateUsers();
    }
  });

  socket.on('sendMessage', function(data){
    io.sockets.emit('showMessage', {msg: data, user: socket.username});
  });

  socket.on('disconnect', function(data){
    console.log('Disconnected')
  });

  function updateUsers(){
    console.log('Updated users')
    io.sockets.emit('users', users);
  }
});

app.get("*", function (req, res) {
  res.render("notFound");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));

