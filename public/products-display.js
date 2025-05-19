import productList from '.product-data.js';

const container = document.getElementById('product-container');
const cart = JSON.parse(localStorage.getItem('cart')) || [];


productList.forEach((product, index) => {
  const productElement = document.createElement('div');
  productElement.className = 'product-card';
  
  productElement.innerHTML = `
    <img class="product-image" src="${product.img}" alt="${product.alt}">
    <h2 class="product-title">${product.name}</h2>
    <div class="product-price">${product.price}</div>
    <button class="add-to-cart" data-index="${index}">Add to Cart</button>
  `;

  // Click on product card navigates to product detail
productElement.querySelector('.product-image').addEventListener('click', () => {
  window.location.href = `product.html?id=${index}`;
});

productElement.querySelector('.product-title').addEventListener('click', () => {
  window.location.href = `product.html?id=${index}`;
});
  // Add to cart button
  const addToCartBtn = productElement.querySelector('.add-to-cart');
  addToCartBtn.addEventListener('click', (event) => {
  event.stopPropagation(); // Prevent parent click
  const productIndex = parseInt(event.target.dataset.index, 10);
  cart.push(productList[productIndex]); 
  console.log(`Added to cart:`, productList[productIndex]);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${productList[productIndex].name} added to cart!`);
});


// Call after adding to cart

  container.appendChild(productElement);
});
