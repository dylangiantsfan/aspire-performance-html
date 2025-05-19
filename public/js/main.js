function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const countElement = document.getElementById('cart-count');
  if (countElement) {
    countElement.textContent = cart.length;
  }
}

// Automatically update cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);
