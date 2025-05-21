function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const countElement = document.getElementById('cart-count');
  if (countElement) {
    countElement.textContent = cart.length;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('/header.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;

      const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

      const signInLink = document.getElementById('signin-link');
      const accountLink = document.getElementById('account-link');
      const logoutLink = document.getElementById('logout-link');

      if (isLoggedIn) {
        signInLink.style.display = 'none';
        accountLink.style.display = 'inline-block';
        logoutLink.style.display = 'inline-block';

        logoutLink.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.removeItem('loggedIn');
          window.location.href = '/';
        });
      } else {
        signInLink.style.display = 'inline-block';
        accountLink.style.display = 'none';
        logoutLink.style.display = 'none';
      }
      updateCartCount();
    });
});
