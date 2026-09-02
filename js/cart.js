/**
 * ZENVORA - Shopping Cart & Wishlist State Engine
 */

const FREE_SHIPPING_THRESHOLD = 5000;
const STANDARD_SHIPPING_FEE = 250;

class CartState {
  constructor() {
    this.cart = this.loadCart();
    this.wishlist = this.loadWishlist();
    this.appliedCoupon = this.loadCoupon();
    this.initEventListeners();
    this.updateUI();
  }

  loadCart() {
    try {
      const saved = localStorage.getItem('zenvora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('zenvora_cart', JSON.stringify(this.cart));
    } catch (e) {}
  }

  loadWishlist() {
    try {
      const saved = localStorage.getItem('zenvora_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveWishlist() {
    try {
      localStorage.setItem('zenvora_wishlist', JSON.stringify(this.wishlist));
    } catch (e) {}
  }

  loadCoupon() {
    try {
      const saved = localStorage.getItem('zenvora_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  saveCoupon() {
    try {
      if (this.appliedCoupon) {
        localStorage.setItem('zenvora_coupon', JSON.stringify(this.appliedCoupon));
      } else {
        localStorage.removeItem('zenvora_coupon');
      }
    } catch (e) {}
  }

  addToCart(productId, size = 'M', color = null, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return false;

    const selectedColor = color || (product.colors && product.colors[0] ? product.colors[0].name : 'Standard');
    const existingIndex = this.cart.findIndex(
      item => item.id === productId && item.size === size && item.color === selectedColor
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        categoryName: product.categoryName,
        size: size,
        color: selectedColor,
        quantity: quantity
      });
    }

    this.saveCart();
    this.updateUI();
    this.showToast(`"${product.name}" (${size}) added to your bag`, 'success');
    return true;
  }

  updateQuantity(index, newQty) {
    if (index >= 0 && index < this.cart.length) {
      if (newQty <= 0) {
        const removed = this.cart.splice(index, 1);
        this.showToast(`Removed from shopping bag`, 'info');
      } else {
        this.cart[index].quantity = newQty;
      }
      this.saveCart();
      this.updateUI();
    }
  }

  removeFromCart(index) {
    if (index >= 0 && index < this.cart.length) {
      this.cart.splice(index, 1);
      this.saveCart();
      this.updateUI();
      this.showToast('Item removed from bag', 'info');
    }
  }

  clearCart() {
    this.cart = [];
    this.appliedCoupon = null;
    this.saveCart();
    this.saveCoupon();
    this.updateUI();
  }

  toggleWishlist(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const index = this.wishlist.indexOf(productId);
    if (index > -1) {
      this.wishlist.splice(index, 1);
      this.showToast(`Removed "${product.name}" from wishlist`, 'info');
    } else {
      this.wishlist.push(productId);
      this.showToast(`Saved "${product.name}" to wishlist ❤️`, 'success');
    }
    this.saveWishlist();
    this.updateUI();
  }

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  }

  getSubtotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getDiscount() {
    if (!this.appliedCoupon) return 0;
    const subtotal = this.getSubtotal();
    if (this.appliedCoupon.type === 'percent') {
      return Math.round((subtotal * this.appliedCoupon.value) / 100);
    }
    return 0;
  }

  getShippingFee() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    if (this.appliedCoupon && this.appliedCoupon.code === 'FREESHIP') return 0;
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  }

  getTotal() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    return Math.max(0, subtotal - this.getDiscount() + this.getShippingFee());
  }

  applyCoupon(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'ZENVORA10') {
      this.appliedCoupon = { code: 'ZENVORA10', discount: '10% OFF', type: 'percent', value: 10 };
      this.saveCoupon();
      this.updateUI();
      this.showToast('Promo code ZENVORA10 applied! (10% OFF)', 'success');
      return { success: true, message: '10% discount applied!' };
    } else if (cleanCode === 'WELCOME15') {
      this.appliedCoupon = { code: 'WELCOME15', discount: '15% OFF', type: 'percent', value: 15 };
      this.saveCoupon();
      this.updateUI();
      this.showToast('Promo code WELCOME15 applied! (15% OFF)', 'success');
      return { success: true, message: '15% discount applied!' };
    } else if (cleanCode === 'FREESHIP') {
      this.appliedCoupon = { code: 'FREESHIP', discount: 'Free Shipping', type: 'shipping', value: 0 };
      this.saveCoupon();
      this.updateUI();
      this.showToast('Free Shipping unlocked!', 'success');
      return { success: true, message: 'Free Shipping applied!' };
    } else {
      this.showToast('Invalid promo code. Try "ZENVORA10"', 'error');
      return { success: false, message: 'Invalid promo code' };
    }
  }

  removeCoupon() {
    this.appliedCoupon = null;
    this.saveCoupon();
    this.updateUI();
    this.showToast('Promo code removed', 'info');
  }

  updateUI() {
    // 1. Update Cart & Wishlist Badges in Header
    const totalCartItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadgeEls = document.querySelectorAll('.cart-count-badge');
    cartBadgeEls.forEach(el => {
      el.textContent = totalCartItems;
      el.style.display = totalCartItems > 0 ? 'inline-flex' : 'none';
    });

    const totalWishlistItems = this.wishlist.length;
    const wishlistBadgeEls = document.querySelectorAll('.wishlist-count-badge');
    wishlistBadgeEls.forEach(el => {
      el.textContent = totalWishlistItems;
      el.style.display = totalWishlistItems > 0 ? 'inline-flex' : 'none';
    });

    // 2. Update Heart icons in product cards
    document.querySelectorAll('[data-wishlist-btn]').forEach(btn => {
      const pid = btn.getAttribute('data-product-id');
      if (this.isInWishlist(pid)) {
        btn.classList.add('active');
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="#5B2A86" stroke="#5B2A86" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
      } else {
        btn.classList.remove('active');
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
      }
    });

    // 3. Render Cart Drawer Content
    this.renderCartDrawer();
    this.renderWishlistDrawer();
  }

  renderCartDrawer() {
    const container = document.getElementById('cart-items-container');
    const emptyState = document.getElementById('cart-empty-state');
    const footer = document.getElementById('cart-drawer-footer');
    if (!container) return;

    if (this.cart.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
      if (footer) footer.style.display = 'none';
      this.updateShippingProgress(0);
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (footer) footer.style.display = 'block';

    const subtotal = this.getSubtotal();
    this.updateShippingProgress(subtotal);

    container.innerHTML = this.cart.map((item, idx) => `
      <div class="cart-item-row" data-cart-index="${idx}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
        <div class="cart-item-details">
          <div class="cart-item-top">
            <h4 class="cart-item-title">${item.name}</h4>
            <button class="cart-item-remove" onclick="zenCart.removeFromCart(${idx})" aria-label="Remove item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div class="cart-item-meta">
            <span class="meta-tag">Size: <strong>${item.size}</strong></span>
            <span class="meta-tag">Color: <strong>${item.color}</strong></span>
          </div>
          <div class="cart-item-bottom">
            <div class="cart-qty-control">
              <button onclick="zenCart.updateQuantity(${idx}, ${item.quantity - 1})" aria-label="Decrease quantity">-</button>
              <span>${item.quantity}</span>
              <button onclick="zenCart.updateQuantity(${idx}, ${item.quantity + 1})" aria-label="Increase quantity">+</button>
            </div>
            <div class="cart-item-price">${formatPKR(item.price * item.quantity)}</div>
          </div>
        </div>
      </div>
    `).join('');

    // Update totals in footer
    const subtotalEl = document.getElementById('cart-subtotal-val');
    const discountRow = document.getElementById('cart-discount-row');
    const discountEl = document.getElementById('cart-discount-val');
    const shippingEl = document.getElementById('cart-shipping-val');
    const grandTotalEl = document.getElementById('cart-grandtotal-val');

    if (subtotalEl) subtotalEl.textContent = formatPKR(subtotal);

    const discount = this.getDiscount();
    if (discountRow && discountEl) {
      if (discount > 0) {
        discountRow.style.display = 'flex';
        discountEl.textContent = `-${formatPKR(discount)} (${this.appliedCoupon.code})`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    const shipping = this.getShippingFee();
    if (shippingEl) {
      shippingEl.innerHTML = shipping === 0 
        ? '<span class="text-free-ship">FREE</span>' 
        : formatPKR(shipping);
    }

    if (grandTotalEl) grandTotalEl.textContent = formatPKR(this.getTotal());
  }

  updateShippingProgress(subtotal) {
    const meter = document.getElementById('shipping-meter-bar');
    const text = document.getElementById('shipping-meter-text');
    if (!meter || !text) return;

    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      meter.style.width = '100%';
      meter.classList.add('unlocked');
      text.innerHTML = '✨ <strong>Free Delivery Unlocked!</strong> (Orders above PKR 5,000)';
    } else {
      const needed = FREE_SHIPPING_THRESHOLD - subtotal;
      const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
      meter.style.width = `${pct}%`;
      meter.classList.remove('unlocked');
      text.innerHTML = `Add <strong>${formatPKR(needed)}</strong> more for <strong>FREE Delivery</strong> across Pakistan`;
    }
  }

  renderWishlistDrawer() {
    const container = document.getElementById('wishlist-items-container');
    const emptyState = document.getElementById('wishlist-empty-state');
    if (!container) return;

    if (this.wishlist.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    const items = this.wishlist.map(id => getProductById(id)).filter(Boolean);

    container.innerHTML = items.map(product => `
      <div class="wishlist-item-card">
        <img src="${product.image}" alt="${product.name}" class="wishlist-thumb">
        <div class="wishlist-info">
          <span class="wishlist-cat">${product.categoryName}</span>
          <h4 class="wishlist-title">${product.name}</h4>
          <div class="wishlist-price">${formatPKR(product.price)}</div>
          <div class="wishlist-actions">
            <button class="btn btn-sm btn-primary" onclick="zenCart.addToCart('${product.id}', 'M', null, 1); zenCart.toggleWishlist('${product.id}');">
              Move to Bag
            </button>
            <button class="btn btn-sm btn-outline-dark" onclick="zenCart.toggleWishlist('${product.id}')">
              Remove
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `zen-toast zen-toast-${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B2A86" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C53030" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    } else {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B2A86" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    }

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-text">${message}</div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  initEventListeners() {
    document.addEventListener('click', (e) => {
      const wishlistBtn = e.target.closest('[data-wishlist-btn]');
      if (wishlistBtn) {
        e.preventDefault();
        e.stopPropagation();
        const pid = wishlistBtn.getAttribute('data-product-id');
        this.toggleWishlist(pid);
      }
    });
  }
}

// Global instance
let zenCart;
document.addEventListener('DOMContentLoaded', () => {
  zenCart = new CartState();
});
