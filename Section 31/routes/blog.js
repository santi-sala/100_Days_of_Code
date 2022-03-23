const express = require("express");

const controllers = require("../controllers/post-controllers");
const { editPost } = require("../controllers/post-controllers");

const router = express.Router();

// CSRF is used here even though theres no form because the header uses csrf!! Logout has a form which sits in a header
router.get("/", controllers.getHome);

router.get("/admin", controllers.getAdmin);

router.post("/posts", controllers.createPost);

router.get("/posts/:id/edit", controllers.getSinglePost);

router.post("/posts/:id/edit", controllers.updatePost);

router.post("/posts/:id/delete", controllers.deletePost);

module.exports = router;
