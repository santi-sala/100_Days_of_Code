const validationSession = require("../util/validation-session");
const validation = require("../util/validation");

const User = require("../models/user");

function getSignUp(req, res) {
  let sessionInputData = validationSession.getSessionErrorData(req, {
    email: "",
    confirmEmail: "",
    password: "",
  });

  res.render("signup", {
    inputData: sessionInputData,
  });
}

function getLogin(req, res) {
  let sessionInputData = validationSession.getSessionErrorData(req, {
    email: "",
    password: "",
  });

  res.render("login", {
    inputData: sessionInputData,
  });
}

async function postSignup(req, res) {
  const userData = req.body;
  const enteredEmail = userData.email; // userData['email']
  const enteredConfirmEmail = userData["confirm-email"];
  const enteredPassword = userData.password;

  //  Validating user input
  if (
    !validation.inputIsValid(enteredEmail, enteredPassword, enteredConfirmEmail)
  ) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Invalid input - please check your data.",
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect("/signup");
      }
    );

    return;
  }

  const newUser = new User(enteredEmail, enteredPassword);
  const existingUser = await newUser.userExists();

  // Checking if the user already exists
  if (existingUser) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "User exists already!",
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }

  await newUser.signup();

  res.redirect("/login");
}

async function postLogin(req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const user = new User(enteredEmail, enteredPassword);
  const existingUser = await user.fetchUserWithEmail();

  // Checking if the user is in the databse
  if (!existingUser) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Could not log you in - please check your credentials!",
        email: enteredEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect("/login");
      }
    );

    return;
  }

  // Checking the password
  const passwordsAreEqual = await user.checkPassword(existingUser.password);

  if (!passwordsAreEqual) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Could not log you in - please check your credentials!",
        email: enteredEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect("/login");
      }
    );

    return;
  }

  // Storing the data in the session
  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect("/admin");
  });
}

function postLogout(req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
}

function get401(req, res) {
  res.status(401).render("401");
}

module.exports = {
  getSignUp: getSignUp,
  getLogin: getLogin,
  postSignup: postSignup,
  postLogin: postLogin,
  postLogout: postLogout,
  get401: get401,
};
