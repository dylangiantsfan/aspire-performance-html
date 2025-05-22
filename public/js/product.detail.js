import productList from './product.data.js';

const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get('id'));
const product = productList[productId];
const cart = JSON.parse(localStorage.getItem('cart')) || [];

const container = document.getElementById('product-detail');

if (product) {
  container.innerHTML = `
    <div id="product-detail">
      <img src="${product.img}" alt="${product.alt}" class="product-image-large" />
      <div class="product-detail-card">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p class="product-price">${product.price}</p>
        <button id="add-to-cart">Add to Cart</button>
        <p class="back-link"><a href="/products.html">← Back to Products</a></p>
      </div>
    </div>
  `;

  document.getElementById('add-to-cart').addEventListener('click', () => {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.showAddedToCartPopup();
  });
} else {
  container.innerHTML = `<p>Product not found.</p>`;
}
