const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  port            : '3306',
  user            : 'root',
  password        : '0000',
  database        : 'website'
});

module.exports = pool;