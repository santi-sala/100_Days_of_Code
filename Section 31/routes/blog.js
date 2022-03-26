const express = require("express");

const postControllers = require("../controllers/post-controllers");

const router = express.Router();

// CSRF is used here even though theres no form because the header uses csrf!! Logout has a form which sits in a header
router.get("/", postControllers.getHome);

router.get("/admin", postControllers.getAdmin);

router.post("/posts", postControllers.createPost);

router.get("/posts/:id/edit", postControllers.getSinglePost);

router.post("/posts/:id/edit", postControllers.updatePost);

router.post("/posts/:id/delete", postControllers.deletePost);

module.exports = router;
