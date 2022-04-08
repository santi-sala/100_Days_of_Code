const express = require("express");

const cartController = require("../controllers/cart.controller");

const router = express.Router();

router.get("/", cartController.getCart); // --> /cart/

// All this routes start with /cart
router.post("/items", cartController.addCartItem);

module.exports = router;
