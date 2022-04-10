// Stripe
const secret = require("../data/secret");
const stripe = require("stripe")(secret.secretKey);

const Order = require("../models/order.model");
const User = require("../models/user.model");

async function addOrder(req, res, next) {
  const cart = res.locals.cart;

  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    next(error);
  }

  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: "eur",
          product_data: {
            name: "K lo k",
          },
          unit_amount_decimal: 10.99,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `localhost:3000/orders/success`,
    cancel_url: `localhost:3000/ordewrs/failure`,
  });

  res.redirect(303, session.url);
}

async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render("customer/orders/all-orders", { orders: orders });
  } catch (error) {
    next(error);
  }
}

function getSuccess(req, res) {
  res.render("customer/orders/success");
}

function getFailure(req, res) {
  res.render("customer/orders/failure");
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
  getSuccess: getSuccess,
  getFailure: getFailure,
};
