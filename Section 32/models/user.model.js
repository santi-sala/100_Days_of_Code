const bcrypt = require("bcryptjs");
const mongodb = require("mongodb");

const db = require("../data/database");

class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      postalCode: postal,
      city: city,
    };
  }

  static findById(userId) {
    const uid = new mongodb.ObjectId(userId);

    return db
      .getDb()
      .collection("users")
      .findOne({ _id: uid }, { projection: { password: 0 } }); // Projection and 0 is to not store the data as password is not needed for the orders
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }

  getUserWIthSameEmail() {
    // finOne yields a promise therefore no need to put async await
    return db.getDb().collection("users").findOne({
      email: this.email,
    });
  }

  async userExistsAlready() {
    const userExists = await this.getUserWIthSameEmail();
    if (userExists) {
      return true;
    } else {
      return false;
    }
  }

  hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;
