const path = require("path");

const express = require("express");

const userRoutes = require("./routes/users");
const db = require("./data/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
// "/images" is used as a filter for the images folder so we only request whats inside the imagesw folder
app.use("/images", express.static("images"));

app.use(userRoutes);

db.connectToDatabase().then(function () {
  app.listen(3000);
});
