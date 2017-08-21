const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'rm-wz952uk54ol0wzj43o.mysql.rds.aliyuncs.com',
  port            : '3306',
  user            : 'root',
  password        : 'Xl1101000',
  database        : 'website'
});

module.exports = pool;