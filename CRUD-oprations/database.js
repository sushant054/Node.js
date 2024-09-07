const mysql = require('mysql');
// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: 'psw', // replace with your MySQL password
    database: 'randomDB', // replace with your database name
  });
  
  // Connect to MySQL
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database.');
  });

  module.exports = db;

  