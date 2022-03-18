const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  res.render("signup");
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/signup", async function (req, res) {
  const userData = req.body;
  const enteredmail = userData.email;
  const enteredConfirmEmail = userData["confirm-email"];
  const enteredPassword = userData.password;

  const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  const user = {
    email: enteredmail,
    password: hashedPassword,
  };
  await db.getDb().collection("users").insertOne(user);

  res.redirect("/login");
});

router.post("/login", async function (req, res) {
  const userData = req.body;
  const enteredmail = userData.email;
  const enteredPassword = userData.password;

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredmail });

  if (!existingUser) {
    console.log("User does not exist");
    return res.redirect("/login");
  }

  const passwordsAreEqual = await bcrypt.compare(
    enteredPassword,
    existingUser.password
  );

  if (!passwordsAreEqual) {
    console.log("Password is incorrect");
    return res.redirect("/login");
  }

  console.log("User is authenticated");
  res.redirect("/admin");
});

router.get("/admin", function (req, res) {
  res.render("admin");
});

router.post("/logout", function (req, res) {});

module.exports = router;
