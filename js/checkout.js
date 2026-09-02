/**
 * ZENVORA - Pakistani E-Commerce Checkout Engine
 */

class CheckoutManager {
  constructor() {
    this.currentStep = 1;
    this.orderData = {};
    this.init();
  }

  init() {
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => this.handleOrderSubmit(e));
    }

    const couponApplyBtn = document.getElementById('checkout-apply-coupon');
    if (couponApplyBtn) {
      couponApplyBtn.addEventListener('click', () => {
        const input = document.getElementById('checkout-coupon-input');
        if (input && input.value) {
          zenCart.applyCoupon(input.value);
          this.renderCheckoutSummary();
        }
      });
    }

    // Payment method selector changes
    document.querySelectorAll('input[name="payment_method"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('active'));
        const parentCard = e.target.closest('.payment-method-card');
        if (parentCard) parentCard.classList.add('active');

        // Show/hide payment specific details
        const cardFields = document.getElementById('card-payment-fields');
        const bankFields = document.getElementById('bank-payment-fields');
        if (cardFields) cardFields.style.display = e.target.value === 'card' ? 'block' : 'none';
        if (bankFields) bankFields.style.display = e.target.value === 'bank' ? 'block' : 'none';
      });
    });
  }

  openCheckout() {
    if (!zenCart || zenCart.cart.length === 0) {
      zenCart.showToast('Your bag is empty! Add items to checkout.', 'error');
      return;
    }

    const modal = document.getElementById('checkout-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.classList.add('modal-open');
      this.renderCheckoutSummary();
      this.resetToStep(1);
    }
  }

  closeCheckout() {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  }

  renderCheckoutSummary() {
    const listEl = document.getElementById('checkout-items-list');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const discountEl = document.getElementById('checkout-discount');
    const discountRow = document.getElementById('checkout-discount-row');
    const shippingEl = document.getElementById('checkout-shipping');
    const totalEl = document.getElementById('checkout-total');

    if (!listEl) return;

    listEl.innerHTML = zenCart.cart.map(item => `
      <div class="checkout-item-summary">
        <div class="item-img-badge">
          <img src="${item.image}" alt="${item.name}">
          <span class="badge-qty">${item.quantity}</span>
        </div>
        <div class="item-summary-info">
          <div class="item-summary-title">${item.name}</div>
          <div class="item-summary-meta">Size: ${item.size} • Color: ${item.color}</div>
        </div>
        <div class="item-summary-price">${formatPKR(item.price * item.quantity)}</div>
      </div>
    `).join('');

    const subtotal = zenCart.getSubtotal();
    const discount = zenCart.getDiscount();
    const shipping = zenCart.getShippingFee();
    const total = zenCart.getTotal();

    if (subtotalEl) subtotalEl.textContent = formatPKR(subtotal);

    if (discountRow && discountEl) {
      if (discount > 0) {
        discountRow.style.display = 'flex';
        discountEl.textContent = `-${formatPKR(discount)}`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    if (shippingEl) {
      shippingEl.innerHTML = shipping === 0 
        ? '<span class="text-free-ship">FREE</span>' 
        : formatPKR(shipping);
    }

    if (totalEl) totalEl.textContent = formatPKR(total);
  }

  handleOrderSubmit(e) {
    e.preventDefault();

    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const orderNumber = 'ZNV-' + Math.floor(100000 + Math.random() * 900000);
    const orderItems = [...zenCart.cart];
    const subtotal = zenCart.getSubtotal();
    const discount = zenCart.getDiscount();
    const shipping = zenCart.getShippingFee();
    const total = zenCart.getTotal();

    const customerName = formData.get('first_name') + ' ' + formData.get('last_name');
    const customerPhone = formData.get('phone');
    const customerEmail = formData.get('email');
    const customerCity = formData.get('city');
    const customerAddress = formData.get('address');
    const paymentMethod = formData.get('payment_method');

    // Show Confirmation View
    const checkoutView = document.getElementById('checkout-form-container');
    const successView = document.getElementById('checkout-success-container');

    if (checkoutView) checkoutView.style.display = 'none';
    if (successView) {
      successView.style.display = 'block';
      successView.innerHTML = `
        <div class="order-success-card">
          <div class="success-icon-wrap">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#5B2A86" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <span class="order-tag">Order Confirmed</span>
          <h2 class="order-thankyou">Thank you, ${formData.get('first_name')}!</h2>
          <p class="order-subtitle">Your order <strong>#${orderNumber}</strong> has been placed successfully. A confirmation SMS & email have been dispatched.</p>

          <div class="order-summary-box">
            <div class="order-info-grid">
              <div class="info-block">
                <span class="label">Tracking Number</span>
                <span class="val font-mono">TCS-${Math.floor(10000000 + Math.random() * 90000000)}</span>
              </div>
              <div class="info-block">
                <span class="label">Estimated Delivery</span>
                <span class="val">2 - 4 Business Days</span>
              </div>
              <div class="info-block">
                <span class="label">Payment Method</span>
                <span class="val">${paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : paymentMethod === 'card' ? 'Credit/Debit Card' : 'Direct Bank / JazzCash'}</span>
              </div>
              <div class="info-block">
                <span class="label">Delivery Location</span>
                <span class="val">${customerCity}, Pakistan</span>
              </div>
            </div>

            <div class="order-items-mini">
              ${orderItems.map(item => `
                <div class="mini-item-row">
                  <span>${item.quantity}x ${item.name} (${item.size})</span>
                  <strong>${formatPKR(item.price * item.quantity)}</strong>
                </div>
              `).join('')}
              <div class="mini-total-row">
                <span>Total Paid / Payable</span>
                <strong>${formatPKR(total)}</strong>
              </div>
            </div>
          </div>

          <div class="order-actions">
            <button class="btn btn-primary btn-lg" onclick="zenCheckout.closeCheckout(); window.location.hash = '#';">
              Continue Shopping
            </button>
          </div>
        </div>
      `;
    }

    // Clear cart
    zenCart.clearCart();
    zenCart.showToast(`Order #${orderNumber} placed successfully!`, 'success');
  }

  resetToStep(step) {
    const checkoutView = document.getElementById('checkout-form-container');
    const successView = document.getElementById('checkout-success-container');
    if (checkoutView) checkoutView.style.display = 'grid';
    if (successView) successView.style.display = 'none';
  }
}

let zenCheckout;
document.addEventListener('DOMContentLoaded', () => {
  zenCheckout = new CheckoutManager();
});
