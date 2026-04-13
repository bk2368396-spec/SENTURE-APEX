const Cart = {
  KEY: 'senteur_apex_cart',
  cache: null,

  getItems() {
    if (this.cache !== null) return this.cache;
    try {
      const data = JSON.parse(localStorage.getItem(this.KEY));
      this.cache = Array.isArray(data) ? data : [];
    } catch {
      this.cache = [];
    }
    return this.cache;
  },

  save(items) {
    this.cache = items;
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.updateUI();
  },

  add(id, name, price, gender, notes) {
    const items = this.getItems();
    const existing = items.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ id, name, price, gender, notes, quantity: 1 });
    }
    this.save(items);
  },

  remove(id) {
    const items = this.getItems().filter(item => item.id !== id);
    this.save(items);
  },

  updateQty(id, qty) {
    const items = this.getItems();
    if (qty <= 0) {
      this.remove(id);
      return;
    }
    const item = items.find(item => item.id === id);
    if (item) {
      item.quantity = qty;
      this.save(items);
    }
  },

  clear() {
    this.save([]);
  },

  totalItems() {
    return this.getItems().reduce((sum, item) => sum + item.quantity, 0);
  },

  totalPrice() {
    return this.getItems().reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  updateUI() {
    const items = this.getItems();
    const total = this.totalItems();
    const badge = document.getElementById('cartBadge');
    if (badge) {
      badge.textContent = total > 9 ? '9+' : total;
      badge.style.display = total > 0 ? 'flex' : 'none';
    }
    const count = document.getElementById('cartCount');
    if (count) count.textContent = total > 0 ? `(${total} item${total !== 1 ? 's' : ''})` : '';

    const container = document.getElementById('cartItems');
    const empty = document.getElementById('cartEmpty');
    const footer = document.getElementById('cartFooter');
    const totalEl = document.getElementById('cartTotal');
    if (!container) return;

    container.querySelectorAll('.cart-item').forEach(el => el.remove());

    if (items.length === 0) {
      if (empty) empty.style.display = 'flex';
      if (footer) footer.style.display = 'none';
      return;
    }

    if (empty) empty.style.display = 'none';
    if (footer) footer.style.display = 'block';
    if (totalEl) totalEl.textContent = 'Rs. ' + this.totalPrice();

    items.forEach(item => {
      const img = item.gender === 'male' ? 'images/bottle-male.png' : 'images/bottle-female.png';
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <div class="cart-item-img"><img src="${img}" alt="${item.name}"></div>
        <div class="cart-item-info">
          <div>
            <h3 class="font-display">${item.name}</h3>
            <p class="notes">${item.notes}</p>
          </div>
          <div class="cart-item-controls">
            <div class="qty-controls">
              <button class="qty-btn" onclick="Cart.updateQty('${item.id}', ${item.quantity - 1})">−</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" onclick="Cart.updateQty('${item.id}', ${item.quantity + 1})">+</button>
            </div>
            <span class="cart-item-price">Rs. ${item.price * item.quantity}</span>
            <button class="remove-btn" onclick="Cart.remove('${item.id}')">✕</button>
          </div>
        </div>
      `;
      container.appendChild(div);
    });
  }
};

document.addEventListener('DOMContentLoaded', () => Cart.updateUI());

function addToCart(id, name, price, gender, notes) {
  Cart.add(id, name, price, gender, notes);
  showToast(name + ' added to cart');
  toggleCart(true);
}

function clearCart() {
  Cart.clear();
}

function toggleCart(forceOpen) {
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  if (!overlay || !drawer) return;
  const isOpen = drawer.classList.contains('open');
  if (forceOpen && isOpen) return;
  overlay.classList.toggle('open');
  drawer.classList.toggle('open');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}
