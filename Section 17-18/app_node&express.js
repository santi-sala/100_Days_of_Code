// const http = require("http");
const express = require("express");

// const server = http.createServer(handleRequest);
const app = express();

// function handleRequest(request, response) {
//   if (request.url === "/currenttime") {
//     response.statusCode = 200;
//     response.end("<h1>" + new Date().toISOString() + "</h1>");
//   } else if (request.url === "/") {
//     response.statusCode = 200;
//     response.end("<h1>Hello World!!</h1>");
//   }
// }

// --> localhost:300/currenttime
app.get("/currenttime", function (request, response) {
  response.send("<h1>" + new Date().toISOString() + "</h1>");
});
// --> localhost:300
app.get("/", function (request, response) {
  response.send("<h1>Hello World!!</h1>");
});
// server.listen(3000);
app.listen(3000);
