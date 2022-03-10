const mySQL = require("mysql2/promise");

const pool = mySQL.createPool({
  host: "localhost",
  database: "blog",
  user: "root",
  password: "kpasanen!!",
});

module.exports = pool;
