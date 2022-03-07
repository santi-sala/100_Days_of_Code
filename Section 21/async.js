const fs = require("fs/promises");

function readFile() {
  //   fs.readFile("data.txt", function (error, fileData) {
  //     console.log("Joooooooooooooooo!!");
  //     console.log(fileData.toString());
  //   });

  fs.readFile("data.txt").then(function (fileData) {
    console.log("Joooooooooooooooo!!");
    console.log(fileData.toString());
  });

  console.log("K pasa!");
}

readFile();
