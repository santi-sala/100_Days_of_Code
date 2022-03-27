// Build in in node, no extra package
const path = require("path");

const express = require("express");

const db = require("./data/database");
const authRoutes = require("./routes/auth.routes");

const app = express();

//  Setting up ejs
app.set("view engine", "ejs");
// Constructing an absolute path to views folder
app.set("views", path.join(__dirname, "views"));

// Making the public folder availble to the final user
app.use(express.static("public"));

// Extracting values from the incomming request
app.use(express.urlencoded({ extended: false }));

// Listening to auth.routes.js
app.use(authRoutes);

// Connecting to database
db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to the database!!");
    console.log(error);
  });
