const mongodb = require("mongodb");

const db = require("../data/database");

const ObjectId = mongodb.ObjectId;

class Post {
  constructor(title, content, id) {
    this.title = title;
    this.content = content;

    if (id) {
      this.id = new ObjectId(id);
    }
  }

  // Static will call the function in the class itself not in the instantiated object!!
  static async fetchAll() {
    const posts = await db.getDb().collection("posts").find().toArray();
    return posts;
  }

  async fetch() {
    if (!this.id) {
      return;
    }
    const post = await db.getDb().collection("posts").findOne({ _id: this.id });
    this.title = post.title;
    this.content = post.content;

    return post;
  }

  async save() {
    // If an id exist, that means we r not creating a new post but updating one therefore the first conditional
    let result;
    if (this.id) {
      result = await db
        .getDb()
        .collection("posts")
        .updateOne(
          { _id: this.id },
          { $set: { title: this.title, content: this.content } }
        );
    } else {
      result = await db.getDb().collection("posts").insertOne({
        title: this.title,
        content: this.content,
      });
    }

    return result;
  }

  async delete() {
    if (!this.id) {
      return;
    }
    const result = await db
      .getDb()
      .collection("posts")
      .deleteOne({ _id: this.id });

    return result;
  }

  //   async update() {
  //     const result = await db
  //       .getDb()
  //       .collection("posts")
  //       .updateOne(
  //         { _id: this.id },
  //         { $set: { title: this.title, content: this.content } }
  //       );

  //     return result;
  //   }
}

module.exports = Post;
