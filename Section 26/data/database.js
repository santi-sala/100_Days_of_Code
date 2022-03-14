const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connect() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  database = client.db("blog");
}

function getDB() {
  if (!database) {
    throw { message: "Dude the connection to the database has failed...." };
  }
  return database;
}

module.exports = {
  connectToDatabase: connect,
  getDb: getDB,
};
