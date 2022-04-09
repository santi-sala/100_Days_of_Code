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

router.get("/products/:id", adminController.getUpdateProduct);

router.post(
  "/products/:id",
  imageUpoadMiddleware,
  adminController.updateProduct
);

router.delete("/products/:id", adminController.deleteProduct);

router.get("/orders", adminController.getOrders);

router.patch("/orders/:id", adminController.updateOrder);

module.exports = router;
