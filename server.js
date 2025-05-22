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
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    return res.status(400).send('Username, password, and confirm password are required');
  }

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  const db = new sqlite3.Database('./db/ecommerce.db');

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      console.error("Error querying user: ", err);
      db.close();
      return res.status(500).send('Server error');
    }

    if (user) {
      db.close();
      return res.status(400).send('Username already taken');
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password: ", err);
        db.close();
        return res.status(500).send('Server error');
      }

      db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
        db.close();

        if (err) {
          console.error("Error inserting user: ", err.message);
          return res.status(500).send('Error registering user');
        }

        res.status(201).send('User registered successfully!');
      });
    });
  });
});


// Login route (POST /login)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const db = new sqlite3.Database('./db/ecommerce.db');
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err) {
      console.error("Error querying user: ", err.message);
      return res.status(500).json({ message: 'Server error' });
    }

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error("Error comparing passwords: ", err.message);
        return res.status(500).json({ message: 'Server error' });
      }

      if (!result) {
        return res.status(400).json({ message: 'Incorrect password' });
      }

      res.status(200).json({ message: 'Login successful!', username: user.username });
    });
  });
});
app.get('/user', (req, res) =>{
  if(!req.session.user) {
    return res.redirect('/login.html');
  }
  res.sendFile(__dirname, 'public', 'user.html');
  
});

// Logout function
function logout() {
  localStorage.removeItem("user"); 
  window.location.href = "login.html"; // redirect to login page
}


// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
