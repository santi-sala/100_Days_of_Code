const path = require("path");

const express = require("express");
const session = require("express-session");

const csrf = require("csurf");

const db = require("./data/database");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");
const sessionConfig = require("./config/session");
const authMiddleware = require("./middlewares/auth-middleware");
const addCsrfMiddleware = require("./middlewares/csrf-token-middleware");

const mongodbSessionStore = sessionConfig.createSessionStore(session);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(session(sessionConfig.createSessionConfig(mongodbSessionStore)));
app.use(csrf());

app.use(addCsrfMiddleware);

// Custom middleware for checking authentication
app.use(authMiddleware);

app.use(blogRoutes);
app.use(authRoutes);

app.use(function (error, req, res, next) {
  res.render("500");
});

db.connectToDatabase().then(function () {
  app.listen(3000);
});
