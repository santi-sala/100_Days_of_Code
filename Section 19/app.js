const path = require("path");

const express = require("express");

const app = express();

app.use(express.static("public"));

app.get("/", function (request, response) {
  let indexFilePath = path.join(__dirname, "views", "index.html");
  response.sendFile(indexFilePath);
});

app.get("/restaurants", function (request, response) {
  let restaurantsFilePath = path.join(__dirname, "views", "restaurants.html");
  response.sendFile(restaurantsFilePath);
});
app.get("/about", function (request, response) {
  let aboutFilePath = path.join(__dirname, "views", "about.html");
  response.sendFile(aboutFilePath);
});
app.get("/confirm", function (request, response) {
  let confirmFilePath = path.join(__dirname, "views", "confirm.html");
  response.sendFile(confirmFilePath);
});
app.get("/recommend", function (request, response) {
  let recommendFilePath = path.join(__dirname, "views", "recommend.html");
  response.sendFile(recommendFilePath);
});

app.listen(3000);
