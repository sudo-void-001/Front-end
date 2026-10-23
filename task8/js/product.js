const initProductDetail = () => {
  const container = document.getElementById('product-detail-container');
  if (!container) return;

  const productId = new URLSearchParams(window.location.search).get('id');
  const product = products.find(p => p.id === productId);

  product ? renderProductDetail(container, product) : showErrorState(container);
};

const renderProductDetail = (container, p) => {
  document.title = `${p.name} | KAIRO`;

  const specsHTML = p.specifications 
    ? Object.entries(p.specifications).reduce((acc, [key, val]) => acc + `
        <div class="spec-item">
          <dt>${key}</dt>
          <dd>${val}</dd>
        </div>`, '') 
    : '';

  container.innerHTML = `
    <div class="product-detail-grid">
      <div class="product-detail-image-col">
        <img src="${p.image}" alt="${p.name}" class="product-detail-img">
      </div>
      <div class="product-detail-info-col">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="index.html">Catalog</a> &rarr; <span>${p.category}</span>
        </nav>
        <h1 class="detail-title">${p.name}</h1>
        <p class="detail-price">₹${p.price.toLocaleString('en-IN')}</p>
        <p class="detail-description">${p.description}</p>
        <div class="detail-actions">
          <div class="quantity-selector large">
            <button class="qty-btn" id="detail-qty-minus" aria-label="Decrease">-</button>
            <input type="number" id="detail-qty-input" class="qty-input" value="1" min="1" max="99" aria-label="Quantity">
            <button class="qty-btn" id="detail-qty-plus" aria-label="Increase">+</button>
          </div>
          <button class="btn btn-primary detail-add-btn" id="detail-add-btn">Add to cart</button>
        </div>
        ${specsHTML ? `
        <div class="detail-specifications">
          <h3>Specifications</h3>
          <dl class="spec-list">${specsHTML}</dl>
        </div>` : ''}
      </div>
    </div>`;

  setupDetailInteractions(p.id);
};

const setupDetailInteractions = (id) => {
  const input = document.getElementById('detail-qty-input');
  
  document.getElementById('detail-qty-minus')?.addEventListener('click', () => {
    input.value = Math.max(1, parseInt(input.value || 1) - 1);
  });
  
  document.getElementById('detail-qty-plus')?.addEventListener('click', () => {
    input.value = Math.min(99, parseInt(input.value || 1) + 1);
  });
  
  input?.addEventListener('change', () => {
    input.value = Math.max(1, Math.min(99, parseInt(input.value || 1)));
  });

  document.getElementById('detail-add-btn')?.addEventListener('click', () => {
    addToCart(id, parseInt(input.value || 1));
  });
};

const showErrorState = container => {
  container.innerHTML = `
    <div class="error-state">
      <h2>Product not found.</h2>
      <p>The product you are looking for doesn't exist or has been removed.</p>
      <a href="index.html" class="btn btn-primary mt-4">Back to catalog</a>
    </div>`;
};

document.addEventListener('DOMContentLoaded', initProductDetail);
