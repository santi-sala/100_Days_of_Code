const express = require("express");

const adminController = require("../controllers/admin.controller");
const imageUpoadMiddleware = require("../middlewares/image-upload");

const router = express.Router();

// all these routes are using /admin first like /admin/products!!
router.get("/products", adminController.getProducts);

router.get("/products/new", adminController.getNewProduct);

// Adding the middleware, remember it executes from left --> right
router.post(
  "/products",
  imageUpoadMiddleware,
  adminController.createNewProduct
);

module.exports = router;
