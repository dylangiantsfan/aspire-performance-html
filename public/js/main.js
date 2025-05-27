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
  }, 2000); 
}

document.addEventListener('DOMContentLoaded', () => {
  const ordersContainer = document.getElementById('orders-container');
  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  if (orders.length === 0) {
    ordersContainer.textContent = 'You have no past orders.';
    return;
  }

  // Render orders
  ordersContainer.innerHTML = ''; 

  orders.forEach((order, index) => {
    const orderDiv = document.createElement('div');
    orderDiv.className = 'order';

    const date = new Date(order.date);
    orderDiv.innerHTML = `
      <h3>Order #${index + 1} - ${date.toLocaleString()}</h3>
      <p>Total: $${order.total.toFixed(2)}</p>
      <ul>
        ${order.items.map(item => `
          <li>
            <img src="${item.img}" alt="${item.name}" style="width:50px; height:50px; object-fit:cover; vertical-align:middle; margin-right:10px;" />
            ${item.name} — ${item.quantity} x ${item.price}
          </li>
        `).join('')}
      </ul>
      <hr/>
    `;

    ordersContainer.appendChild(orderDiv);
  });
});
