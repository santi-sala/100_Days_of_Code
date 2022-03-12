const express = require("express");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (request, response) {
  response.redirect("/posts");
});

// router.get("/posts", function (request, response) {
//   response.render("posts-list");
// });

router.get("/posts", async function (request, response) {
  const [posts] = await db.query(
    "SELECT posts.*, authors.name AS author_name FROM posts INNER JOIN authors ON posts.author_id = authors.id"
  );
  response.render("posts-list", { posts: posts });
});

router.get("/new-post", async function (request, response) {
  const [authors] = await db.query("SELECT * FROM authors");
  response.render("create-post", { authors: authors });
});

router.post("/posts", async function (request, response) {
  const data = [
    request.body.title,
    request.body.summary,
    request.body.content,
    request.body.author,
  ];
  await db.query(
    "INSERT INTO posts (title, summary, body, author_id) VALUES (?)",
    [data]
  );
  response.redirect("/posts");
});

router.get("/posts/:id", async function (request, response) {
  const query = `
    SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts 
    INNER JOIN authors ON posts.author_id = authors.id 
    WHERE posts.id = ?
  `;

  const [posts] = await db.query(query, [request.params.id]);

  if (!posts || posts.length === 0) {
    return response.status(404).render("404");
  }

  const postData = {
    ...posts[0],
    date: posts[0].date.toISOString(),
    humanReadableDate: posts[0].date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
  response.render("post-detail", { post: postData });
});

module.exports = router;
