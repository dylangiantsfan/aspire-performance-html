const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false })); // To parse form data
app.use(express.static('public')); // Serve static files from the 'public' directory

// Serve the 'index.html' file when visiting the root URL
app.get('/', (req, res) => {
  console.log("Serving index.html");  // Debugging line
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Registration route (POST /register)
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already taken
  const db = new sqlite3.Database('./db/ecommerce.db');
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      console.error("Error querying user: ", err);
      return res.status(500).send('Server error');
    }

    if (user) {
      return res.status(400).send('Username already taken');
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password: ", err);
        return res.status(500).send('Server error');
      }

      // Insert the user into the database
      db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
        if (err) {
          console.error("Error inserting user: ", err.message);
          return res.status(500).send('Error registering user');
        }

        res.send('User registered successfully!');
      });

      db.close();
    });
  });
});

// Login route (POST /login)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query the database for the user
  const db = new sqlite3.Database('./db/ecommerce.db');
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err) {
      console.error("Error querying user: ", err.message);
      return res.status(500).send('Server error');
    }

    if (!user) {
      return res.status(400).send('User not found');
    }

    // Compare the password with the hashed one
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error("Error comparing passwords: ", err);
        return res.status(500).send('Server error');
      }

      if (result) {
        res.send('Login successful!');
      } else {
        res.status(400).send('Incorrect password');
      }
    });
  });

  db.close();
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
