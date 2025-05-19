import productList from './product.data.js';

const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get('id'));
const product = productList[productId];
const cart = JSON.parse(localStorage.getItem('cart')) || [];

const container = document.getElementById('product-detail');

if (product) {
  container.innerHTML = `
    <div class="product-detail-card">
      <img src="${product.img}" alt="${product.alt}" class="product-image-large"/>
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p class="product-price">${product.price}</p>
      <button id="add-to-cart">Add to Cart</button>
    </div>
  `;

  document.getElementById('add-to-cart').addEventListener('click', () => {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  });
} else {
  container.innerHTML = `<p>Product not found.</p>`;
}
