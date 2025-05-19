import productList from './product.data.js';

const productContainer = document.getElementById('product-container');
const searchInput = document.getElementById('searchInput');
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initial render
renderProducts(productList);

// Search functionality
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();

  const filteredProducts = productList.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query)
  );

  renderProducts(filteredProducts);
});

// Function to render products
function renderProducts(products) {
  productContainer.innerHTML = ''; // Clear container

  if (products.length === 0) {
    productContainer.innerHTML = '<p>No products found.</p>';
    return;
  }

  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.img}" alt="${product.alt}" class="product-image" />
      <h3 class="product-title">
        <a href="product.html?id=${index}" class="product-link">${product.name}</a>
      </h3>
      <p>${product.description}</p>
      <p class="product-price">${product.price}</p>
      <button class="add-to-cart" data-index="${index}">Add to Cart</button>
    `;

    // Add to cart event
    card.querySelector('.add-to-cart').addEventListener('click', (event) => {
      event.stopPropagation();
      cart.push(productList[index]);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.name} added to cart!`);
    });

    productContainer.appendChild(card);
  });
}