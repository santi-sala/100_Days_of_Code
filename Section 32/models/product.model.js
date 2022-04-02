const db = require("../data/database");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    // The + here forces the conversion to a number string to int
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image; // name of the image file
    this.imagePath = `product-data/images/${productData.image}`;
    this.imageUrl = `/products/assets/images/${productData.image}`;

    // Wrapped in a if statements so in thwe case there is a product wiyh no id it doesnt crash
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  // Static lets us call this methos without having to instantiate the class
  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();

    return products.map(function (product) {
      return new Product(product);
    });
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };
    const result = await db
      .getDb()
      .collection("products")
      .insertOne(productData);
  }
}

module.exports = Product;
