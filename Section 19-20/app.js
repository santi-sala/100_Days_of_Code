const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (request, response) {
  response.render("index");
});

app.get("/restaurants", function (request, response) {
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  response.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

// Dynamic route
app.get("/restaurants/:id", function (request, response) {
  const restaurantID = request.params.id;
  response.render("restaurant-detail", { restaurantId: restaurantID });
});

app.get("/about", function (request, response) {
  response.render("about");
});

app.get("/confirm", function (request, response) {
  response.render("confirm");
});

app.get("/recommend", function (request, response) {
  response.render("recommend");
});

app.post("/recommend", function (request, response) {
  const restaurant = request.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  response.redirect("/confirm");
});

app.listen(3000);