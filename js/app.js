let products = [...perfumes];
let firestoreReady = false;
let db = null;
let auth = null;

function initializeFirebase() {
  if (!window.firebase || !window.initFirebaseApp) return false;
  const app = initFirebaseApp();
  if (!app) return false;
  db = firebase.firestore();
  auth = firebase.auth();
  firestoreReady = true;
  return true;
}

function formatCurrency(value) {
  return 'Rs. ' + Number(value).toLocaleString('en-PK');
}

function startProductStream() {
  if (!firestoreReady) {
    products = [...perfumes];
    renderProducts();
    renderProductDetail();
    renderOrderSummary();
    return;
  }

  db.collection('products').orderBy('productId').onSnapshot(snapshot => {
    products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderProducts();
    renderProductDetail();
    renderOrderSummary();
  }, () => {
    products = [...perfumes];
    renderProducts();
    renderProductDetail();
    renderOrderSummary();
  });
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  const list = products.length ? products : perfumes;

  grid.innerHTML = list.map(perfume => {
    const badge = perfume.gender === 'male' ? 'Homme' : perfume.gender === 'female' ? 'Femme' : perfume.gender === 'unisex' ? 'Unisex' : 'Kids';
    const productId = perfume.id || perfume.productId;
    return `
      <div class="product-card" data-gender="${perfume.gender}" onclick="window.location.href='product-details.html?id=${productId}'">
        <div class="product-card-img">
          <img src="${perfume.imageUrl || getBottleImage(perfume.gender)}" alt="${perfume.name}">
          <span class="product-card-badge">${badge}</span>
        </div>
        <div class="product-card-info">
          <h3>${perfume.name}</h3>
          <p class="product-card-concentration">${perfume.concentration || 'Eau De Parfum (EDP)'}</p>
          <p class="product-card-notes">Notes: ${perfume.notes || 'Premium Blend'}</p>
          <p class="product-card-price">${formatCurrency(perfume.price)}</p>
          <div class="product-card-footer">
            <button class="add-btn" onclick="event.stopPropagation(); addToCart('${productId}', '${perfume.name.replace(/'/g, "\\'")}', ${perfume.price}, '${perfume.gender}', '${(perfume.notes || '').replace(/'/g, "\\'")}')">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterProducts(gender, btn) {
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.product-card').forEach(card => {
    card.style.display = gender === 'all' || card.dataset.gender === gender ? '' : 'none';
  });
}

function toggleMobileMenu() {
  const links = document.getElementById('navbarLinks');
  if (!links) return;
  links.classList.toggle('open');
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function getPerfumeById(id) {
  return products.find(p => String(p.id) === String(id) || String(p.productId) === String(id)) || perfumes.find(p => String(p.id) === String(id));
}

function getRelatedPerfumes(current) {
  return (products.length ? products : perfumes).filter(p => p.gender === current.gender && String(p.id) !== String(current.id)).slice(0, 4);
}

function getBottleImage(gender) {
  return gender === 'male' ? 'images/bottle-male.png' : 'images/bottle-female.png';
}

function getBoxImage(gender) {
  return gender === 'male' ? 'images/box-male.png' : 'images/box-female.png';
}

function renderProductDetail() {
  const container = document.getElementById('productDetail');
  if (!container) return;
  const id = getQueryParam('id');
  const perfume = getPerfumeById(id);
  if (!perfume) {
    container.innerHTML = `
      <div class="product-detail">
        <p class="back-link"><a href="index.html">← Back to collection</a></p>
        <h1 class="font-display">Product not found</h1>
        <p class="desc">Please select a fragrance from the collection.</p>
      </div>
    `;
    return;
  }

  const notes = (perfume.notes || '').split(', ');
  const related = getRelatedPerfumes(perfume);
  const badge = perfume.gender === 'male' ? 'Pour Homme' : perfume.gender === 'female' ? 'Pour Femme' : perfume.gender === 'unisex' ? 'Unisex' : 'Kids';
  const productId = perfume.id || perfume.productId;

  container.innerHTML = `
    <a href="index.html" class="back-link">← Back</a>
    <div class="detail-grid">
      <div class="detail-images">
        <div class="detail-img-box"><img src="${perfume.imageUrl || getBottleImage(perfume.gender)}" alt="${perfume.name}"></div>
        <div class="detail-img-box small"><img src="${getBoxImage(perfume.gender)}" alt="${perfume.name} box"></div>
      </div>
      <div class="detail-info">
        <span class="detail-badge">${badge}</span>
        <h1 class="font-display">${perfume.name}</h1>
        <p class="detail-concentration" style="color: var(--primary); font-weight: 600; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 0.1em;">${perfume.concentration || 'Eau De Parfum (EDP)'}</p>
        <p class="notes" style="font-size: 0.95rem; margin: 0.5rem 0 0 0;">Notes: ${perfume.notes || ''}</p>
        <p class="desc" style="margin-top: 1rem;">${perfume.description || ''}</p>
        <div class="fragrance-profile">
          <h3>Fragrance Profile</h3>
          <p>An exquisite composition built around <span class="highlight">${notes[0] || 'premium notes'}</span> as the heart note, layered with ${notes.slice(1).join(' and ') || 'balanced accords'} to create a scent that evolves beautifully throughout the day.</p>
          <div class="notes-grid">
            ${notes.map(note => `
              <div class="note-box">
                <p class="label">Note</p>
                <p class="value">${note}</p>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="detail-cta">
          <span class="detail-price">${formatCurrency(perfume.price)}</span>
          <span class="cod-badge">Cash on Delivery</span>
          <button class="btn-gold" onclick="addToCart('${productId}', '${perfume.name.replace(/'/g, "\\'")}', ${perfume.price}, '${perfume.gender}', '${(perfume.notes || '').replace(/'/g, "\\'")}')">🛍 Add to Cart</button>
        </div>
      </div>
    </div>

    ${related.length ? `
      <section class="related">
        <h2>You May Also Like</h2>
        <div class="related-grid">
          ${related.map(r => `
            <div class="related-card" onclick="window.location.href='product-details.html?id=${r.id || r.productId}'">
              <div class="related-card-img"><img src="${r.imageUrl || getBottleImage(r.gender)}" alt="${r.name}"></div>
              <div class="related-card-info">
                <p class="name">${r.name}</p>
                <p class="concentration" style="font-size: 0.75rem; color: var(--primary); margin: 0.3rem 0 0;">${r.concentration || 'EDP'}</p>
                <p class="price">${formatCurrency(r.price)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    ` : ''}
  `;
}

function renderOrderSummary() {
  const container = document.getElementById('orderSummary');
  if (!container) return;
  const items = Cart.getItems();
  const subtotal = Cart.totalPrice();
  const shipping = subtotal >= 10000 ? 0 : 250;
  const tax = +(subtotal * 0.05).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  if (items.length === 0) {
    container.innerHTML = '<p class="note">Your cart is empty. Add fragrances to proceed.</p>';
    return;
  }

  let html = '<h3 class="font-display">Order Summary</h3>';
  items.forEach(item => {
    const img = item.gender === 'male' ? 'images/bottle-male.png' : 'images/bottle-female.png';
    html += `
      <div class="summary-item">
        <div class="summary-item-img"><img src="${img}" alt="${item.name}"></div>
        <div class="summary-item-info">
          <p class="name">${item.name}</p>
          <p class="qty">Qty: ${item.quantity}</p>
        </div>
        <span class="price">${formatCurrency(item.price * item.quantity)}</span>
      </div>
    `;
  });

  html += `
    <div class="summary-row"><span>Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
    <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : formatCurrency(shipping)}</span></div>
    <div class="summary-row"><span>Tax</span><span>${formatCurrency(tax)}</span></div>
    <div class="summary-total"><span>Total</span><span>${formatCurrency(total)}</span></div>
    ${shipping === 0 ? '<p class="note">Free shipping on orders over Rs. 10,000</p>' : ''}
  `;
  container.innerHTML = html;
}

function goToPayment(e) {
  e.preventDefault();
  window.location.href = 'checkout.html';
}

function backToShipping() {
  // Redirect to checkout
}

document.addEventListener('DOMContentLoaded', () => {
  if (initializeFirebase()) {
    startProductStream();
  } else {
    products = [...perfumes];
    renderProducts();
    renderProductDetail();
    renderOrderSummary();
  }

  if (document.getElementById('productGrid')) renderProducts();
  if (document.getElementById('productDetail')) renderProductDetail();
  if (document.getElementById('orderSummary')) renderOrderSummary();

  const mobileToggle = document.getElementById('mobileToggle');
  if (mobileToggle) mobileToggle.addEventListener('click', toggleMobileMenu);
});

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}