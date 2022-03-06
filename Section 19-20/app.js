const fs = require("fs");
const path = require("path");

const express = require("express");
const uuid = require("uuid");

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

  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  for (const currentRestaurant of storedRestaurants) {
    if (currentRestaurant.id === restaurantID) {
      return response.render("restaurant-detail", {
        restaurant: currentRestaurant,
      });
    }
  }

  response.status(404).render("404");
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
  restaurant.id = uuid.v4();
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  response.redirect("/confirm");
});

// Handling errors
app.use(function (request, response) {
  response.status(404).render("404");
});

app.use(function (error, request, response, next) {
  response.status(500).render("500");
});

app.listen(3000);
