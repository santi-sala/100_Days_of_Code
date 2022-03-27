const User = require("../models/user.model");

function getSignup(req, res) {
  // Remember that the path starts from views
  res.render("customer/auth/signup");
}

async function signup(req, res) {
  // req.body is available thanks to express.urlencoded middleware
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  await user.signup();

  res.redirect("/login");
}

function getLogin(req, res) {
  res.render("customer/auth/login");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
};
