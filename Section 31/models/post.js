const db = require("../data/database");

class Post {
  constructor(title, content, id) {
    this.title = title;
    this.content = content;
    this.id = id;
  }

  async save() {
    const result = await db.getDb().collection("posts").insertOne({
      title: this.title,
      content: this.content,
    });

    return result;
  }

  async update() {
    const result = await db
      .getDb()
      .collection("posts")
      .updateOne(
        { _id: this.id },
        { $set: { title: this.title, content: this.content } }
      );

    return result;
  }

  async delete() {
    const result = await db
      .getDb()
      .collection("posts")
      .deleteOne({ _id: this.id });

    return result;
  }
}

module.exports = Post;
