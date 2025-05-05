const express = require('express');
const app = express();
const productRoutes = require('./routes/products');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('pages'));

app.use('/products', productRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
