const mongodb = require("mongodb");

const db = require("../data/database");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    // The + here forces the conversion to a number string to int
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image; // name of the image file
    this.updateImageData();

    // Wrapped in a if statements so in thwe case there is a product wiyh no id it doesnt crash
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  // Static lets us call this methos without having to instantiate the class
  static async findById(productId) {
    let prodId;
    try {
      prodId = new mongodb.ObjectId(productId);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: prodId });

    if (!product) {
      const error = new Error("Product not found!!");
      error.code = 404;
      throw error;
    }

    return new Product(product);
  }

  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();

    return products.map(function (product) {
      return new Product(product);
    });
  }

  static async findMultiple(ids) {
    const productIds = ids.map(function (id) {
      return new mongodb.ObjectId(id);
    });

    const products = await db
      .getDb()
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  updateImageData() {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    if (this.id) {
      const productId = mongodb.ObjectId(this.id);

      // Making sure we do not override the image path in the database with undefined if there is no new image
      if (!this.image) {
        delete productData.image;
      }

      await db
        .getDb()
        .collection("products")
        .updateOne({ _id: productId }, { $set: productData });
    } else {
      await db.getDb().collection("products").insertOne(productData);
    }
  }

  replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }

  remove() {
    const productId = new mongodb.ObjectId(this.id);
    db.getDb().collection("products").deleteOne({ _id: productId });
  }
}

module.exports = Product;
