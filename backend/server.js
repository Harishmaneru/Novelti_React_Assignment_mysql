const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Database configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mysql@1997',
  database: 'user_details',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection error: ' + err.message);
  } else {
    console.log('Connected to the database');
  }
});


app.use(bodyParser.json());


app.post('/users', (req, res) => {
 
    const { firstName, lastName, email, mobile, address1, address2, state, country, zipCode } = req.body;
  
   
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      mobile: mobile,
      address1: address1,
      address2: address2,
      state: state,
      country: country,
      zip_code: zipCode,
    };
  
 
    db.query('INSERT INTO users SET ?', userData, (err, result) => {
      if (err) {
        console.error('Error creating user: ' + err.message);
        res.status(500).json({ error: 'Error creating user' });
      } else {
        console.log('User created with ID: ' + result.insertId);
        res.status(201).json({ message: 'User created', userId: result.insertId });
      }
    });
  });
  

// View List of Users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error retrieving users: ' + err.message);
      res.status(500).json({ error: 'Error retrieving users' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Edit and Update User
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  db.query('UPDATE users SET ? WHERE id = ?', [updatedUserData, userId], (err) => {
    if (err) {
      console.error('Error updating user: ' + err.message);
      res.status(500).json({ error: 'Error updating user' });
    } else {
      console.log('User updated');
      res.status(200).json({ message: 'User updated' });
    }
  });
});

// Delete User
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  db.query('DELETE FROM users WHERE id = ?', userId, (err) => {
    if (err) {
      console.error('Error deleting user: ' + err.message);
      res.status(500).json({ error: 'Error deleting user' });
    } else {
      console.log('User deleted');
      res.status(200).json({ message: 'User deleted' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
