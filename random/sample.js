const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const app = express();

app.use(bodyParser.json());

// API endpoint to insert first_name and last_name
app.post('/add-user', (req, res) => {
  const { first_name, last_name } = req.body;

  if (!first_name || !last_name) {
    return res.status(400).json({ error: 'First name and last name are required' });
  }

  const query = 'INSERT INTO users (first_name, last_name) VALUES (?, ?)';
  db.query(query, [first_name, last_name], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'User added successfully', userId: result.insertId });
  });
});

// API endpoint to fetch all user information
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users where user_id >=2 ';
  //SELECT * FROM users where user_id between 2 and 4
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json(results);
    });
  });


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
