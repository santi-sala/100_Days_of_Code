const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));

// --> localhost:300/currenttime
app.get("/currenttime", function (request, response) {
  response.send("<h1>" + new Date().toISOString() + "</h1>");
});
// --> localhost:300
app.get("/", function (request, response) {
  response.send(
    '<form action="store-user" method="POST"><label>Your Name</label><input type="text" name="username"><button>Submit</button></form>'
  );
});

app.post("/store-user", function (request, response) {
  // Saving the user input
  const userName = request.body.username;
  // Getting the file's path to any sytem
  const filePath = path.join(__dirname, "data", "users.json");
  // Reading and storing the data from the file
  const currentFileData = fs.readFileSync(filePath);
  // Parsing the JSON data
  const existingUsers = JSON.parse(currentFileData);
  // Adding data to the file
  existingUsers.push(userName);
  // Putting the data back to JSON format and storing it back to the file
  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  response.send("<h1>Username stored</h1>");
});

app.listen(3000);
