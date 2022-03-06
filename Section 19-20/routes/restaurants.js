const express = require("express");
const uuid = require("uuid");

const restaurantData = require("../utilities/restaurant-data");

const router = express.Router();

router.get("/restaurants", function (request, response) {
  let order = request.query.order;
  let nextOrder = "descending";

  if (order !== "ascending" && order !== "descending") {
    order = "ascending";
  }
  if (order === "descending") {
    nextOrder = "ascending";
  }

  const storedRestaurants = restaurantData.getStoredRestaurants();

  storedRestaurants.sort(function (restaurantA, restaurantB) {
    if (
      (order === "ascending" &&
        restaurantA.name.toLowerCase() > restaurantB.name.toLowerCase()) ||
      (order === "descending" &&
        restaurantB.name.toLowerCase() > restaurantA.name.toLowerCase())
    ) {
      return 1;
    }
    return -1;
  });

  response.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: nextOrder,
  });
});

// Dynamic route
router.get("/restaurants/:id", function (request, response) {
  const restaurantID = request.params.id;

  const storedRestaurants = restaurantData.getStoredRestaurants();

  for (const currentRestaurant of storedRestaurants) {
    if (currentRestaurant.id === restaurantID) {
      return response.render("restaurant-detail", {
        restaurant: currentRestaurant,
      });
    }
  }

  response.status(404).render("404");
});

router.get("/confirm", function (request, response) {
  response.render("confirm");
});

router.get("/recommend", function (request, response) {
  response.render("recommend");
});

router.post("/recommend", function (request, response) {
  const restaurant = request.body;
  restaurant.id = uuid.v4();

  const storedRestaurants = restaurantData.getStoredRestaurants();
  storedRestaurants.push(restaurant);

  restaurantData.storeRestaurants(storedRestaurants);

  response.redirect("/confirm");
});

module.exports = router;
