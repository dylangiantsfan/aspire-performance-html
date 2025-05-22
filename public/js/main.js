function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const countElement = document.getElementById('cart-count');
  if (countElement) {
    countElement.textContent = cart.length;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('header.html')
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
          localStorage.removeItem('username'); 
          window.location.href = '/';
        });
      } else {
        signInLink.style.display = 'inline-block';
        accountLink.style.display = 'none';
        logoutLink.style.display = 'none';
      }
      updateCartCount();

      const welcomeHeading = document.querySelector('.user h1');
      if (welcomeHeading) {
        const userName = localStorage.getItem('username') || 'Guest';
        welcomeHeading.textContent = `Welcome, ${userName}!`;
      }

    });
});

function showAddedToCartPopup() {
  const popup = document.getElementById('cart-popup');
  popup.classList.add('show');
  setTimeout(() => {
    popup.classList.remove('show');
  }, 2000); // hides after 2 seconds
}
