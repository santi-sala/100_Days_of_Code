const Product = require("../models/product.model");

async function addCartItem(req, res) {
  let product;
  try {
    // req.body because its a post request
    product = await Product.findById(req.body.productid);
  } catch (error) {
    next(error);
    return;
  }
  const cart = res.locals.cart;
  cart.addItem(product);

  //   Updating the data on the current session!!!
  req.session.cart = cart;

  res.status(201).jason({
    message: "Cart updated",
    newTotalItems: cart.totalQuantity,
  });
}

module.exports = {
  addCartItem: addCartItem,
};
