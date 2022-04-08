const express = require("express");

const cartController = require("../controllers/cart.controller");

const router = express.Router();

// All this routes start with /cart
router.get("/", cartController.getCart); // --> /cart/

router.post("/items", cartController.addCartItem);

// Updating parts of an existing data therefore .patch
router.patch("/items", cartController.updateCartItem);

module.exports = router;
