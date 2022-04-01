const express = require("express");

const adminController = require("../controllers/admin.controller");

const router = express.Router();

// Using /admin/products!!
router.get("/products", adminController.getProducts);

router.get("/products/new", adminController.getNewProduct);

module.exports = router;
