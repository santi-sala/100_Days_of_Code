// path is a build in in node, no extra package
const path = require("path");

const express = require("express");
const csrf = require("csurf");
const expressSession = require("express-session");

const createSessionConfig = require("./config/session");
const db = require("./data/database");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes");
const baseRoutes = require("./routes/base.routes");

const app = express();

//  Setting up ejs
app.set("view engine", "ejs");
// Constructing an absolute path to views folder
app.set("views", path.join(__dirname, "views"));

// Making the public folder availble to the final user
app.use(express.static("public"));
// Extracting values from the incomming request
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));
// Registering for the csrf package (creates and validates the csrf tokens)
app.use(csrf());
// Custom middleware that distributes the csrf tokens
app.use(addCsrfTokenMiddleware);

// Listening to routes
app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);

// Error handling middleware
app.use(errorHandlerMiddleware);

// Connecting to database
db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to the database!!");
    console.log(error);
  });
