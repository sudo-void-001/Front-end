const catalogState = { query: '', category: 'All', sort: 'featured' };

const catalogDOM = {
  grid: document.getElementById('product-grid'),
  filters: document.getElementById('category-filters'),
  search: document.getElementById('search-input'),
  sort: document.getElementById('sort-select'),
  count: document.getElementById('product-count')
};

const initCatalog = () => {
  if (!catalogDOM.grid) return;
  generateFilters();
  setupCatalogDelegation();
  applyFiltersAndRender();
};

const generateFilters = () => {
  if (!catalogDOM.filters) return;
  const categories = ['All', ...new Set(products.map(p => p.category))];
  catalogDOM.filters.innerHTML = categories.map(cat => 
    `<button class="filter-btn ${cat === 'All' ? 'active' : ''}" data-category="${cat}">${cat}</button>`
  ).join('');
};

const setupCatalogDelegation = () => {
  // Event Delegation for Category Buttons
  catalogDOM.filters?.addEventListener('click', e => {
    if (!e.target.classList.contains('filter-btn')) return;
    
    // Update UI active state
    catalogDOM.filters.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b === e.target));
    
    catalogState.category = e.target.dataset.category;
    applyFiltersAndRender();
  });

  // Direct Listeners for Inputs
  catalogDOM.search?.addEventListener('input', e => {
    catalogState.query = e.target.value.toLowerCase().trim();
    applyFiltersAndRender();
  });

  catalogDOM.sort?.addEventListener('change', e => {
    catalogState.sort = e.target.value;
    applyFiltersAndRender();
  });
};

const applyFiltersAndRender = () => {
  const { query, category, sort } = catalogState;
  
  // 1 & 2: Filter by Search and Category in one pass for max efficiency
  let filtered = products.filter(p => {
    const matchCategory = category === 'All' || p.category === category;
    const matchQuery = !query || 
      p.name.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query));
    
    return matchCategory && matchQuery;
  });

  // 3: Sort
  const sortFns = {
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'name-asc': (a, b) => a.name.localeCompare(b.name),
    'name-desc': (a, b) => b.name.localeCompare(a.name),
    'featured': () => 0 // Original order
  };
  filtered.sort(sortFns[sort] || sortFns['featured']);

  renderGrid(filtered);
};

const renderGrid = (items) => {
  if (catalogDOM.count) catalogDOM.count.textContent = `Showing ${items.length} product${items.length !== 1 ? 's' : ''}`;
  
  if (!items.length) {
    catalogDOM.grid.innerHTML = `
      <div class="empty-state">
        <p>No products match your search.</p>
        <button class="btn btn-secondary" onclick="resetFilters()">Clear Filters</button>
      </div>`;
    return;
  }

  // Efficient string rendering
  catalogDOM.grid.innerHTML = items.reduce((html, p) => html + `
    <article class="product-card">
      <a href="product.html?id=${p.id}" class="product-card-link">
        <div class="product-image-wrapper">
          <img src="${p.image}" alt="${p.name}" class="product-image" loading="lazy">
        </div>
        <div class="product-info">
          <span class="product-category">${p.category}</span>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-short-desc">${p.shortDescription}</p>
          <p class="product-price">₹${p.price.toLocaleString('en-IN')}</p>
        </div>
      </a>
      <div class="product-card-actions">
        <button class="btn btn-primary" onclick="addToCart('${p.id}')" aria-label="Add ${p.name}">Add to cart</button>
      </div>
    </article>`, '');
};

const resetFilters = () => {
  if (catalogDOM.search) catalogDOM.search.value = '';
  if (catalogDOM.sort) catalogDOM.sort.value = 'featured';
  catalogDOM.filters?.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.category === 'All');
  });

  Object.assign(catalogState, { query: '', category: 'All', sort: 'featured' });
  applyFiltersAndRender();
};

document.addEventListener('DOMContentLoaded', initCatalog);
