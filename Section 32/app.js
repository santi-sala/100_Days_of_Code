// path is a build in in node, no extra package
const path = require("path");

// Packages
const express = require("express");
const csrf = require("csurf");
const expressSession = require("express-session");

const createSessionConfig = require("./config/session");
const db = require("./data/database");

// Middlewares
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const checkAuthStatusMiddleware = require("./middlewares/check-auth");
const protectRoutesMiddleware = require("./middlewares/protect-routes");
const cartMiddleware = require("./middlewares/cart");

// Routes
const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes");
const baseRoutes = require("./routes/base.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

//  Setting up ejs
app.set("view engine", "ejs");
// Constructing an absolute path to views folder
app.set("views", path.join(__dirname, "views"));

// Making the public and prodt-data folders available to the final user
app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"));

// Extracting values from the incomming request
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));
// Registering for the csrf package (creates and validates the csrf tokens)
app.use(csrf());

// Checking if the session contain a cart
app.use(cartMiddleware);

// Custom middleware that distributes the csrf tokens
app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

// Listening to routes
app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);

// Protecting from connecting manually to admin pages
app.use(protectRoutesMiddleware);
// Adding the /admin routes so we dont need to keep typing it in the admin.routes.js
app.use("/admin", adminRoutes);

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
