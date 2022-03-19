const path = require("path");

const express = require("express");
const session = require("express-session");
const mongodbStorePackage = require("connect-mongodb-session");

const db = require("./data/database");
const demoRoutes = require("./routes/demo");

const mongodbStore = mongodbStorePackage(session);

const sessionStore = new mongodbStore({
  uri: "mongodb://localhost:27017",
  databaseName: "auth-demo",
  collection: "sessions",
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    // cookie: {
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    // },
  })
);

app.use(demoRoutes);

app.use(function (error, req, res, next) {
  res.render("500");
});

db.connectToDatabase().then(function () {
  app.listen(3000);
});
