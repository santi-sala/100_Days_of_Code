function getSignup(req, res) {
  // Remember that the path starts from views
  res.render("customer/auth/signup");
}

function signup(req, res) {}

function getLogin(req, res) {}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
};
