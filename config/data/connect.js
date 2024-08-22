const mysql = require("mysql2");
var pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'shopp'
});

pool.getConnection(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  } else {
    console.log(`connect successfully!`);
  }
});

module.exports = pool;