const express = require('express');
const app = express();

// === USERS DATA ===
const users = [];

// === PRODUCTS DATA ===
const products = [
  { id: 1, name: 'Tires' },
  { id: 2, name: 'Engine' },
  { id: 3, name: 'Rims' },
  { id: 4, name: 'Turbocharger' },
  { id: 5, name: 'Durlast Alternator' },
  { id: 6, name: 'Spark Plug' }
];

const reviews = {
  1: ['Great motor!', 'Nice roar', 'Would buy again'],
  2: ['Fast', 'Lightweight', 'Engine runs smooth'],
  3: ['Clean rims', 'Smooth ride', 'Cheap'],
  4: ['Stylish', 'Suits my car', 'Good sound'],
  5: ['Optimal', 'Trendy', 'Durable'],
  6: ['Functions well', 'Good usage', 'Nice design']
};

// === USERS ROUTES ===
app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:username', (req, res) => {
  const user = users.find(u => u.toLowerCase() === req.params.username.toLowerCase());
  if (user) {
    res.json({ username: user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// === PRODUCTS ROUTES ===
app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:productId', (req, res) => {
  const product = products.find(p => p.id == req.params.productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.get('/products/:productId/reviews', (req, res) => {
  const productReviews = reviews[req.params.productId];
  if (productReviews) {
    res.json(productReviews);
  } else {
    res.status(404).json({ error: 'Reviews not found for product' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

