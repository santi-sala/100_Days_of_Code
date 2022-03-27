// Build in in node, no extra package
const path = require("path");

const express = require("express");

const authRoutes = require("./routes/auth.routes");

const app = express();

//  Setting up ejs
app.set("view engine", "ejs");
// Constructing an absolute path to views folder
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

// Listening to auth.routes.js
app.use(authRoutes);

app.listen(3000);
