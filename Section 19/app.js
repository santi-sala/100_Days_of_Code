const express = require("express");

const app = express();

app.get("/", function (request, response) {
  response.send("<h1>Hello world!!</h1>");
});

app.listen(3000);
