let mysql      = require('mysql');
let env = process.env

let connection = mysql.createConnection({
  host     : env.HOST,
  user     : env.LOGIN,
  password : env.PASS,
  database : env.DBNAME
});

connection.connect();

module.exports = connection