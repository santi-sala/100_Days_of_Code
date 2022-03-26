const express = require("express");
const bcrypt = require("bcryptjs");
const authControllers = require("../controllers/auth-controllers");

const db = require("../data/database");

const router = express.Router();

router.get("/signup", authControllers.getSignUp);

router.get("/login", authControllers.getLogin);

router.post("/signup", authControllers.postSignup);

router.post("/login", authControllers.postLogin);

router.post("/logout", authControllers.postLogout);

module.exports = router;
