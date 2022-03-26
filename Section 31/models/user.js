const bcrypt = require("bcryptjs");

const db = require("../data/database");

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async fetchUserWithEmail() {
    const existingUser = await db
      .getDb()
      .collection("users")
      .findOne({ email: this.email });
    return existingUser;
  }

  async userExists() {
    const user = await this.fetchUserWithEmail();
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  async signup() {
    // Hashing the password
    const hashedPassword = await bcrypt.hash(this.password, 12);

    const newUser = await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
    });

    return newUser;
  }

  async checkPassword(enteredPassword) {
    const result = await bcrypt.compare(this.password, enteredPassword);

    return result;
  }
}

module.exports = User;
