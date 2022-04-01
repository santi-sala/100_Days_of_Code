const multer = require("multer");
const uuid = require("uuid").v4;

const upload = multer({
  storage: multer.diskStorage({
    destination: "product-data/images",
    filename: function (req, file, cb) {
      // First parameter id for potential errors that may occurand the4 second is for generating unique ids
      cb(null, uuid() + "-" + file.originalname);
    },
  }),
});

// image here is the name given in the input type="image" in new-product.ejs
const configuredMulterMiddleware = upload.single("image");

module.exports = configuredMulterMiddleware;
