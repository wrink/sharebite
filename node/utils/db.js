const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  port: process.env.MYSQL_TCP_PORT,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

module.exports = connection;
