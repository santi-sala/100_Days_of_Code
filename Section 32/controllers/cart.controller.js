const Product = require("../models/product.model");

async function addCartItem(req, res, next) {
  let product;
  try {
    // req.body because its a post request
    product = await Product.findById(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }
  const cart = res.locals.cart;
  cart.addItem(product);

  //   Updating the data on the current session!!!
  req.session.cart = cart;

  res.status(201).json({
    message: "Cart updated",
    newTotalItems: cart.totalQuantity,
  });
}

module.exports = {
  addCartItem: addCartItem,
};
