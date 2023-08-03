require("dotenv").config();
const mysql = require("mysql");
const con = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

con.getConnection((err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("connected to DB");
});

module.exports = { con };
