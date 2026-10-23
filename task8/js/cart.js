let cart = loadCart();

// Cache DOM elements
const cartDOM = {
  counts: document.querySelectorAll('.cart-count'),
  drawer: document.getElementById('cart-drawer'),
  overlay: document.getElementById('cart-overlay'),
  items: document.getElementById('cart-items'),
  subtotal: document.getElementById('cart-subtotal'),
  closeBtn: document.getElementById('cart-close'),
  toast: null
};

const initCart = () => {
  setupCartDrawer();
  setupCartDelegation();
  updateCartUI();
};

const setupCartDrawer = () => {
  if (!cartDOM.drawer) return;

  const toggleCart = (force) => {
    const isOpen = typeof force === 'boolean' ? force : !cartDOM.drawer.classList.contains('open');
    cartDOM.drawer.classList.toggle('open', isOpen);
    cartDOM.overlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  document.querySelectorAll('.cart-toggle').forEach(btn => 
    btn.addEventListener('click', e => { e.preventDefault(); toggleCart(true); })
  );
  
  cartDOM.closeBtn?.addEventListener('click', () => toggleCart(false));
  cartDOM.overlay?.addEventListener('click', () => toggleCart(false));
  
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && cartDOM.drawer.classList.contains('open')) toggleCart(false);
  });
};

const setupCartDelegation = () => {
  if (!cartDOM.items) return;
  // Use Event Delegation for all cart item interactions (max efficiency)
  cartDOM.items.addEventListener('click', e => {
    const id = e.target.dataset.id;
    if (!id) return;
    
    if (e.target.classList.contains('plus')) updateQuantity(id, 1);
    else if (e.target.classList.contains('minus')) updateQuantity(id, -1);
    else if (e.target.classList.contains('cart-item-remove')) removeFromCart(id);
  });
};

const addToCart = (id, quantity = 1) => {
  const item = cart.find(i => i.id === id);
  item ? item.quantity += quantity : cart.push({ id, quantity });
  
  saveCart(cart);
  updateCartUI();
  showToast();
};

const removeFromCart = id => {
  cart = cart.filter(i => i.id !== id);
  saveCart(cart);
  updateCartUI();
};

const updateQuantity = (id, delta) => {
  const item = cart.find(i => i.id === id);
  if (item && item.quantity + delta > 0) {
    item.quantity += delta;
    saveCart(cart);
    updateCartUI();
  }
};

const updateCartUI = () => {
  if (!cartDOM.items) return; // Fail fast if no UI

  // 1. Update Counts
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  cartDOM.counts.forEach(el => el.textContent = totalItems);

  // 2. Render HTML
  if (!cart.length) {
    cartDOM.items.innerHTML = `
      <div class="cart-empty-state">
        <p>Your cart is empty.</p>
        <button class="btn btn-secondary" onclick="document.getElementById('cart-close').click()">Continue Shopping</button>
      </div>`;
    if (cartDOM.subtotal) cartDOM.subtotal.textContent = '₹0';
    return;
  }

  let subtotal = 0;
  cartDOM.items.innerHTML = cart.reduce((html, cartItem) => {
    const p = products.find(prod => prod.id === cartItem.id);
    if (!p) return html;
    
    subtotal += p.price * cartItem.quantity;
    return html + `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}" class="cart-item-image" loading="lazy">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${p.name}</h4>
          <p class="cart-item-price">₹${p.price.toLocaleString('en-IN')}</p>
          <div class="cart-item-actions">
            <div class="quantity-selector">
              <button class="qty-btn minus" data-id="${p.id}" aria-label="Decrease">-</button>
              <span class="qty-display">${cartItem.quantity}</span>
              <button class="qty-btn plus" data-id="${p.id}" aria-label="Increase">+</button>
            </div>
            <button class="cart-item-remove" data-id="${p.id}">Remove</button>
          </div>
        </div>
      </div>`;
  }, '');

  // 3. Update Subtotal
  if (cartDOM.subtotal) cartDOM.subtotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
};

const showToast = () => {
  if (!cartDOM.toast) {
    cartDOM.toast = document.createElement('div');
    cartDOM.toast.className = 'toast-notification';
    cartDOM.toast.textContent = 'Added to cart';
    document.body.appendChild(cartDOM.toast);
  }
  
  cartDOM.toast.classList.add('show');
  clearTimeout(cartDOM.toast.timeoutId); // Prevent overlapping timers
  cartDOM.toast.timeoutId = setTimeout(() => cartDOM.toast.classList.remove('show'), 3000);
};

document.addEventListener('DOMContentLoaded', initCart);
