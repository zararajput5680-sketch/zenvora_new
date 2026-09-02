/**
 * ZENVORA - Master Application UI Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initProductGrids();
  initCategoryFilters();
  initSearch();
  initDrawers();
  initQuickView();
  initSizeGuide();
  initNewsletter();
  initAccountModal();
  initEditorialHotspots();
});

// -------------------------------------------------------------
// 1. Header & Navigation Controller
// -------------------------------------------------------------
function initHeader() {
  const header = document.querySelector('.site-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-navigation-drawer');
  const mobileNavClose = document.getElementById('mobile-nav-close');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }
  });

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.add('active');
      document.body.classList.add('modal-open');
    });
  }

  if (mobileNavClose && mobileNav) {
    mobileNavClose.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      document.body.classList.remove('modal-open');
    });
  }

  // Close mobile nav when clicking on nav link
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav?.classList.remove('active');
      document.body.classList.remove('modal-open');
    });
  });
}

// -------------------------------------------------------------
// 2. Product Grids Rendering
// -------------------------------------------------------------
function initProductGrids() {
  renderNewArrivals('all');
  renderBestsellers();
  renderSaleGrid();
}

function renderProductCard(p) {
  const isWish = zenCart ? zenCart.isInWishlist(p.id) : false;
  const ratingStars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 !== 0 ? '½' : '');

  return `
    <div class="product-card" data-category="${p.category}" data-product-id="${p.id}">
      <div class="product-thumb-wrap">
        <div class="product-badges">
          ${p.badge ? `<span class="badge ${p.badge.includes('SALE') ? 'badge-sale' : 'badge-new'}">${p.badge}</span>` : ''}
        </div>
        <button class="btn-wishlist ${isWish ? 'active' : ''}" data-wishlist-btn data-product-id="${p.id}" aria-label="Save to Wishlist">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWish ? '#5B2A86' : 'none'}" stroke="${isWish ? '#5B2A86' : 'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
        <img src="${p.image}" alt="${p.name}" class="product-main-img" loading="lazy">
        <div class="product-hover-actions">
          <button class="btn btn-quickview" onclick="openQuickView('${p.id}')">Quick View</button>
          <button class="btn btn-quickadd" onclick="zenCart.addToCart('${p.id}', 'M', null, 1)">Add to Cart</button>
        </div>
      </div>
      <div class="product-card-body">
        <div class="product-meta-row">
          <span class="product-cat-name">${p.categoryName}</span>
          <div class="product-rating">
            <span class="stars">${ratingStars}</span>
            <span class="count">(${p.reviewsCount})</span>
          </div>
        </div>
        <h3 class="product-title" onclick="openQuickView('${p.id}')">${p.name}</h3>
        <div class="product-price-row">
          <span class="current-price">${formatPKR(p.price)}</span>
          ${p.originalPrice ? `<span class="original-price">${formatPKR(p.originalPrice)}</span>` : ''}
        </div>
        <div class="product-color-dots">
          ${(p.colors || []).map(c => `<span class="color-dot" style="background-color: ${c.hex}" title="${c.name}"></span>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderNewArrivals(filterCategory = 'all') {
  const container = document.getElementById('new-arrivals-grid');
  if (!container) return;

  const newProducts = ZENVORA_PRODUCTS.filter(p => p.isNewArrival);
  const filtered = filterCategory === 'all' 
    ? newProducts 
    : newProducts.filter(p => p.category === filterCategory);

  if (filtered.length === 0) {
    container.innerHTML = `<div class="no-products-msg">No products found in this category.</div>`;
    return;
  }

  container.innerHTML = filtered.map(renderProductCard).join('');
}

function renderBestsellers() {
  const container = document.getElementById('bestsellers-grid');
  if (!container) return;

  const bestsellers = ZENVORA_PRODUCTS.filter(p => p.isBestseller);
  container.innerHTML = bestsellers.map(renderProductCard).join('');
}

function renderSaleGrid() {
  const container = document.getElementById('sale-products-grid');
  if (!container) return;

  const saleProducts = ZENVORA_PRODUCTS.filter(p => p.isSale);
  container.innerHTML = saleProducts.map(renderProductCard).join('');
}

// -------------------------------------------------------------
// 3. Category Filter Tabs
// -------------------------------------------------------------
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('.category-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderNewArrivals(cat);
    });
  });
}

// -------------------------------------------------------------
// 4. Quick View Modal & Product Details Controller
// -------------------------------------------------------------
let currentQuickViewProduct = null;
let selectedSize = 'M';
let selectedColor = null;
let currentQty = 1;

function initQuickView() {
  const modal = document.getElementById('quick-view-modal');
  const closeBtn = document.getElementById('quick-view-close');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    });
  }

  // Backdrop click
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  });
}

function openQuickView(productId) {
  const product = getProductById(productId);
  if (!product) return;

  currentQuickViewProduct = product;
  selectedSize = product.sizes[0] || 'M';
  selectedColor = product.colors && product.colors[0] ? product.colors[0].name : 'Default';
  currentQty = 1;

  const modal = document.getElementById('quick-view-modal');
  const modalBody = document.getElementById('quick-view-body');
  if (!modal || !modalBody) return;

  const ratingStars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 !== 0 ? '½' : '');

  modalBody.innerHTML = `
    <div class="quickview-layout">
      <!-- Gallery Column -->
      <div class="quickview-gallery">
        <div class="qv-main-img-wrap">
          <img id="qv-active-img" src="${product.image}" alt="${product.name}">
        </div>
        <div class="qv-thumbs-row">
          ${(product.gallery || [product.image]).map((img, idx) => `
            <img src="${img}" alt="Thumbnail ${idx + 1}" class="qv-thumb ${idx === 0 ? 'active' : ''}" onclick="switchQuickViewImg('${img}', this)">
          `).join('')}
        </div>
      </div>

      <!-- Details Column -->
      <div class="quickview-details">
        <div class="qv-meta-top">
          <span class="qv-category">${product.categoryName}</span>
          <div class="qv-rating">
            <span class="stars">${ratingStars}</span>
            <span class="qv-rating-text">${product.rating} (${product.reviewsCount} reviews)</span>
          </div>
        </div>

        <h2 class="qv-title">${product.name}</h2>

        <div class="qv-price-block">
          <span class="qv-price">${formatPKR(product.price)}</span>
          ${product.originalPrice ? `<span class="qv-original-price">${formatPKR(product.originalPrice)}</span>` : ''}
          ${product.badge ? `<span class="qv-badge">${product.badge}</span>` : ''}
        </div>

        <p class="qv-description">${product.description}</p>

        <!-- Color Selection -->
        <div class="qv-option-group">
          <label class="qv-label">Color: <strong id="qv-selected-color-label">${selectedColor}</strong></label>
          <div class="qv-color-swatches">
            ${(product.colors || []).map((c, idx) => `
              <button class="qv-color-btn ${idx === 0 ? 'active' : ''}" style="background-color: ${c.hex}" title="${c.name}" onclick="selectQuickViewColor('${c.name}', this)"></button>
            `).join('')}
          </div>
        </div>

        <!-- Size Selection -->
        <div class="qv-option-group">
          <div class="qv-label-row">
            <label class="qv-label">Size: <strong id="qv-selected-size-label">${selectedSize}</strong></label>
            <button class="btn-link qv-size-guide-trigger" onclick="openSizeGuide()">Size Guide 📏</button>
          </div>
          <div class="qv-size-selector">
            ${(product.sizes || []).map((s, idx) => `
              <button class="qv-size-btn ${s === selectedSize ? 'active' : ''}" onclick="selectQuickViewSize('${s}', this)">${s}</button>
            `).join('')}
          </div>
        </div>

        <!-- Quantity & Add to Cart -->
        <div class="qv-actions-row">
          <div class="qv-qty-picker">
            <button onclick="updateQuickViewQty(-1)" aria-label="Decrease quantity">-</button>
            <span id="qv-qty-display">1</span>
            <button onclick="updateQuickViewQty(1)" aria-label="Increase quantity">+</button>
          </div>
          <button class="btn btn-primary btn-lg btn-block" onclick="executeQuickViewAddToCart()">
            Add to Shopping Bag
          </button>
        </div>

        <button class="btn btn-secondary btn-block qv-buynow-btn" onclick="executeQuickViewBuyNow()">
          Buy It Now — Fast Checkout
        </button>

        <!-- Product Extra Perks -->
        <div class="qv-perks-list">
          <div class="qv-perk-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B2A86" stroke-width="2"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"></path><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"></path><circle cx="7" cy="18" r="2"></circle><circle cx="17" cy="18" r="2"></circle></svg>
            <span><strong>Free Delivery</strong> on orders above PKR 5,000 across Pakistan</span>
          </div>
          <div class="qv-perk-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B2A86" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
            <span><strong>Easy 7-Day Hassle-Free Returns</strong> & Exchanges</span>
          </div>
          <div class="qv-perk-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B2A86" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <span><strong>100% Authentic Fabric</strong> — Fabric: ${product.fabric}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.classList.add('modal-open');
}

function switchQuickViewImg(src, thumbEl) {
  const mainImg = document.getElementById('qv-active-img');
  if (mainImg) mainImg.src = src;
  document.querySelectorAll('.qv-thumb').forEach(t => t.classList.remove('active'));
  thumbEl?.classList.add('active');
}

function selectQuickViewSize(size, btnEl) {
  selectedSize = size;
  const label = document.getElementById('qv-selected-size-label');
  if (label) label.textContent = size;
  document.querySelectorAll('.qv-size-btn').forEach(b => b.classList.remove('active'));
  btnEl?.classList.add('active');
}

function selectQuickViewColor(color, btnEl) {
  selectedColor = color;
  const label = document.getElementById('qv-selected-color-label');
  if (label) label.textContent = color;
  document.querySelectorAll('.qv-color-btn').forEach(b => b.classList.remove('active'));
  btnEl?.classList.add('active');
}

function updateQuickViewQty(delta) {
  currentQty = Math.max(1, currentQty + delta);
  const display = document.getElementById('qv-qty-display');
  if (display) display.textContent = currentQty;
}

function executeQuickViewAddToCart() {
  if (!currentQuickViewProduct) return;
  zenCart.addToCart(currentQuickViewProduct.id, selectedSize, selectedColor, currentQty);
  
  // Close quick view & open cart drawer
  const modal = document.getElementById('quick-view-modal');
  modal?.classList.remove('active');
  document.body.classList.remove('modal-open');
  openDrawer('cart-drawer');
}

function executeQuickViewBuyNow() {
  if (!currentQuickViewProduct) return;
  zenCart.addToCart(currentQuickViewProduct.id, selectedSize, selectedColor, currentQty);
  
  const modal = document.getElementById('quick-view-modal');
  modal?.classList.remove('active');
  document.body.classList.remove('modal-open');
  zenCheckout.openCheckout();
}

// -------------------------------------------------------------
// 5. Drawers Management (Cart, Wishlist, Search)
// -------------------------------------------------------------
function initDrawers() {
  // Cart triggers
  document.querySelectorAll('.trigger-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer('cart-drawer');
    });
  });

  // Wishlist triggers
  document.querySelectorAll('.trigger-wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer('wishlist-drawer');
    });
  });

  // Drawer Close buttons
  document.querySelectorAll('.drawer-close-btn, .drawer-overlay').forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllDrawers();
    });
  });

  // Cart Coupon inside Drawer
  const drawerCouponBtn = document.getElementById('cart-drawer-apply-coupon');
  if (drawerCouponBtn) {
    drawerCouponBtn.addEventListener('click', () => {
      const input = document.getElementById('cart-drawer-coupon-input');
      if (input && input.value) {
        zenCart.applyCoupon(input.value);
        input.value = '';
      }
    });
  }

  // Cart Drawer Checkout Button
  const drawerCheckoutBtn = document.getElementById('cart-drawer-checkout-btn');
  if (drawerCheckoutBtn) {
    drawerCheckoutBtn.addEventListener('click', () => {
      closeAllDrawers();
      zenCheckout.openCheckout();
    });
  }
}

function openDrawer(drawerId) {
  closeAllDrawers();
  const drawer = document.getElementById(drawerId);
  const overlay = document.querySelector('.drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('modal-open');
  }
}

function closeAllDrawers() {
  document.querySelectorAll('.side-drawer').forEach(d => d.classList.remove('active'));
  document.querySelector('.drawer-overlay')?.classList.remove('active');
  document.body.classList.remove('modal-open');
}

// -------------------------------------------------------------
// 6. Interactive Search
// -------------------------------------------------------------
function initSearch() {
  const searchTriggers = document.querySelectorAll('.trigger-search');
  const searchModal = document.getElementById('search-modal');
  const searchClose = document.getElementById('search-modal-close');
  const searchInput = document.getElementById('global-search-input');
  const resultsContainer = document.getElementById('search-results-grid');

  searchTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      searchModal?.classList.add('active');
      document.body.classList.add('modal-open');
      setTimeout(() => searchInput?.focus(), 100);
    });
  });

  searchClose?.addEventListener('click', () => {
    searchModal?.classList.remove('active');
    document.body.classList.remove('modal-open');
  });

  searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!resultsContainer) return;

    if (!query) {
      resultsContainer.innerHTML = `<div class="search-hint">Type to search for co-ord sets, dresses, shirts, trousers...</div>`;
      return;
    }

    const matches = ZENVORA_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.categoryName.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `<div class="no-search-results">No pieces found matching "${query}".</div>`;
      return;
    }

    resultsContainer.innerHTML = matches.map(p => `
      <div class="search-result-item" onclick="openQuickView('${p.id}'); document.getElementById('search-modal').classList.remove('active');">
        <img src="${p.image}" alt="${p.name}" class="search-result-thumb">
        <div class="search-result-info">
          <span class="search-result-cat">${p.categoryName}</span>
          <div class="search-result-title">${p.name}</div>
          <div class="search-result-price">${formatPKR(p.price)}</div>
        </div>
      </div>
    `).join('');
  });
}

// -------------------------------------------------------------
// 7. Size Guide Modal
// -------------------------------------------------------------
function initSizeGuide() {
  const modal = document.getElementById('size-guide-modal');
  const closeBtn = document.getElementById('size-guide-close');

  closeBtn?.addEventListener('click', () => {
    modal?.classList.remove('active');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

function openSizeGuide() {
  const modal = document.getElementById('size-guide-modal');
  modal?.classList.add('active');
}

// -------------------------------------------------------------
// 8. Newsletter Handler
// -------------------------------------------------------------
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
      const email = emailInput.value;
      form.innerHTML = `
        <div class="newsletter-success-box">
          <div class="check-icon">✓</div>
          <h3>Welcome to the Zenvora Family!</h3>
          <p>We've sent your <strong>10% OFF</strong> welcome code to <strong>${email}</strong>.</p>
          <div class="vip-code-tag">Use Code: <strong>ZENVORA10</strong> at checkout</div>
        </div>
      `;
      zenCart.showToast('Subscribed! Use code ZENVORA10 for 10% off', 'success');
    }
  });
}

// -------------------------------------------------------------
// 9. Customer Account Modal
// -------------------------------------------------------------
function initAccountModal() {
  const triggers = document.querySelectorAll('.trigger-account');
  const modal = document.getElementById('account-modal');
  const closeBtn = document.getElementById('account-modal-close');

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal?.classList.add('active');
      document.body.classList.add('modal-open');
    });
  });

  closeBtn?.addEventListener('click', () => {
    modal?.classList.remove('active');
    document.body.classList.remove('modal-open');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  });
}

// -------------------------------------------------------------
// 10. Editorial Hotspots / Interactive Shop the Look
// -------------------------------------------------------------
function initEditorialHotspots() {
  document.querySelectorAll('[data-hotspot-product]').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-hotspot-product');
      openQuickView(pid);
    });
  });
}
