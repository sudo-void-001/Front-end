const CART_KEY = 'kairoCart';

const loadCart = () => {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
};

const saveCart = cart => {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
  catch (e) { console.error('Storage full/unavailable', e); }
};
