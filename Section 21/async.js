const fs = require("fs");

function readFile() {
  fs.readFile("data.txt", function (error, fileData) {
    console.log("Joooooooooooooooo!!");
    console.log(fileData.toString());
  });

  console.log("K pasa!");
}

readFile();
