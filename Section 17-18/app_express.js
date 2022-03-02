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
  const userName = request.body.username;
  console.log(userName);
  response.send("<h1>Username stored</h1>");
});

app.listen(3000);
