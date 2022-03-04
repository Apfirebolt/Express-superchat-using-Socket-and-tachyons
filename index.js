const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");


const app = express();

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


app.get("*", function (req, res) {
  res.render("notFound");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});

module.exports = app;
