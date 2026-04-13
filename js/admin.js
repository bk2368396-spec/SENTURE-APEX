let db = null;
let auth = null;
let products = [];
let orders = [];
let reviews = [];
const initialProducts = [
  { name: 'Starry Spritz', category: 'Kids', price: 4200, imageUrl: 'https://via.placeholder.com/360x360/0d0d0d/ffd700?text=Kids+1', description: 'A sweet and sparkling fragrance with candy apple and vanilla breeze.', notes: 'Apple, Vanilla, Sugar' },
  { name: 'Candy Cloud', category: 'Kids', price: 4300, imageUrl: 'https://via.placeholder.com/360x360/0d0d0d/ffd700?text=Kids+2', description: 'Soft fruity sweetness with gentle cotton candy and berry accord.', notes: 'Berry, Cotton Candy, Musk' },
  { name: 'Sunny Spritz', category: 'Kids', price: 4000, imageUrl: 'https://via.placeholder.com/360x360/0d0d0d/ffd700?text=Kids+3', description: 'A bright citrus floral for carefree playtime and warm afternoons.', notes: 'Orange, Lemon, Blossom' },
  { name: 'Sugar Melody', category: 'Kids', price: 4450, imageUrl: 'https://via.placeholder.com/360x360/0d0d0d/ffd700?text=Kids+4', description: 'A dreamy blend of sweet caramel and gentle floral touches.', notes: 'Caramel, Jasmine, Honey' },
  { name: 'Little Breeze', category: 'Kids', price: 3900, imageUrl: 'https://via.placeholder.com/360x360/0d0d0d/ffd700?text=Kids+5', description: 'A playful whisper of pear and soft sugar for little moments.', notes: 'Pear, Sugar, Cotton' },
  { name: 'Balance Mist', category: 'Unisex', price: 6400, imageUrl: 'https://via.placeholder.com/360x360/111111/cccccc?text=Unisex+1', description: 'A modern blend of citrus and clean woods for every mood.', notes: 'Bergamot, Sage, Cedar' },
  { name: 'Neutral Bloom', category: 'Unisex', price: 6600, imageUrl: 'https://via.placeholder.com/360x360/111111/cccccc?text=Unisex+2', description: 'A subtle floral with fresh green accords and warm musk.', notes: 'Neroli, Green Tea, Musk' },
  { name: 'Amber Harmony', category: 'Unisex', price: 7200, imageUrl: 'https://via.placeholder.com/360x360/111111/cccccc?text=Unisex+3', description: 'Balanced amber and soft spice for everyday elegance.', notes: 'Amber, Ginger, Sandalwood' },
  { name: 'Silk Unity', category: 'Unisex', price: 6800, imageUrl: 'https://via.placeholder.com/360x360/111111/cccccc?text=Unisex+4', description: 'Clean, refined and timeless with a smooth dry down.', notes: 'Lavender, Vetiver, Musk' },
  { name: 'Eclipse Calm', category: 'Unisex', price: 7000, imageUrl: 'https://via.placeholder.com/360x360/111111/cccccc?text=Unisex+5', description: 'A soft woody fragrance with luminous citrus highlights.', notes: 'Grapefruit, Cedar, White Musk' },
  { name: 'Noir Ember', category: 'Men', price: 8900, imageUrl: 'https://via.placeholder.com/360x360/111111/ffd700?text=Men+1', description: 'A commanding oud and leather blend for confident nights.', notes: 'Oud, Leather, Spice' },
  { name: 'Midnight Drift', category: 'Men', price: 8600, imageUrl: 'https://via.placeholder.com/360x360/111111/ffd700?text=Men+2', description: 'Dark woods lifted by smoked citrus and black pepper.', notes: 'Cedar, Black Pepper, Amber' },
  { name: 'Urban Musk', category: 'Men', price: 8200, imageUrl: 'https://via.placeholder.com/360x360/111111/ffd700?text=Men+3', description: 'A refined musk fragrance with warm vetiver and spice.', notes: 'Musk, Vetiver, Cinnamon' },
  { name: 'Iron Cedar', category: 'Men', price: 7800, imageUrl: 'https://via.placeholder.com/360x360/111111/ffd700?text=Men+4', description: 'A bold blend of cedar wood, patchouli and black resin.', notes: 'Cedar, Patchouli, Resin' },
  { name: 'Royal Oud', category: 'Men', price: 9500, imageUrl: 'https://via.placeholder.com/360x360/111111/ffd700?text=Men+5', description: 'A powerful oud fragrance with smoke, amber and spice.', notes: 'Oud, Amber, Smoke' },
  { name: 'Steel Noir', category: 'Men', price: 8100, imageUrl: 'https://via.placeholder.com/360x360/111111/ffd700?text=Men+6', description: 'Modern leather with tobacco and aromatic wood depths.', notes: 'Leather, Tobacco, Cedar' },
  { name: 'Cedar Pulse', category: 'Men', price: 7700, imageUrl: 'https://via.placeholder.com/360x360/111111/ffd700?text=Men+7', description: 'Sharp cedarwood brightened with citrus and spice.', notes: 'Cedar, Orange, Clove' },
  { name: 'Smoked Amber', category: 'Men', price: 9000, imageUrl: 'https://via.placeholder.com/360x360/111111/ffd700?text=Men+8', description: 'Deep amber warmth with smoked resin and wood.', notes: 'Amber, Resin, Smoke' },
  { name: 'Musk Voyage', category: 'Men', price: 8400, imageUrl: 'https://via.placeholder.com/360x360/111111/ffd700?text=Men+9', description: 'Earthy musk with spicy cardamom and leather.', notes: 'Musk, Cardamom, Leather' },
  { name: 'Graphite Rush', category: 'Men', price: 8800, imageUrl: 'https://via.placeholder.com/360x360/111111/ffd700?text=Men+10', description: 'A sleek woody scent with dark amber and smoke.', notes: 'Sandalwood, Amber, Smoke' },
  { name: 'Velvet Rose', category: 'Women', price: 7600, imageUrl: 'https://via.placeholder.com/360x360/111111/ffc0cb?text=Women+1', description: 'A feminine floral with rose petals and soft vanilla.', notes: 'Rose, Vanilla, Amber' },
  { name: 'Jasmine Silk', category: 'Women', price: 7900, imageUrl: 'https://via.placeholder.com/360x360/111111/ffc0cb?text=Women+2', description: 'Delicate jasmine and creamy white flowers with musk.', notes: 'Jasmine, Lily, Musk' },
  { name: 'Velvet Bloom', category: 'Women', price: 8200, imageUrl: 'https://via.placeholder.com/360x360/111111/ffc0cb?text=Women+3', description: 'A luxurious blend of peony, vanilla and sandalwood.', notes: 'Peony, Vanilla, Sandalwood' },
  { name: 'Golden Petal', category: 'Women', price: 8500, imageUrl: 'https://via.placeholder.com/360x360/111111/ffc0cb?text=Women+4', description: 'A bright floral with citrus, jasmine and soft amber.', notes: 'Citrus, Jasmine, Amber' },
  { name: 'Ivory Lantern', category: 'Women', price: 8300, imageUrl: 'https://via.placeholder.com/360x360/111111/ffc0cb?text=Women+5', description: 'Warm vanilla and tuberose with powdery sweetness.', notes: 'Vanilla, Tuberose, Musk' },
  { name: 'Moonlit Garden', category: 'Women', price: 8100, imageUrl: 'https://via.placeholder.com/360x360/111111/ffc0cb?text=Women+6', description: 'Soft florals with sparkling pear and gardenia.', notes: 'Pear, Gardenia, Musk' },
  { name: 'Satin Petals', category: 'Women', price: 7800, imageUrl: 'https://via.placeholder.com/360x360/111111/ffc0cb?text=Women+7', description: 'A tender floral fragrance with powdery warmth.', notes: 'Peach, Rose, Vanilla' },
  { name: 'Blush Whisper', category: 'Women', price: 8000, imageUrl: 'https://via.placeholder.com/360x360/111111/ffc0cb?text=Women+8', description: 'A romantic floral amber with creamy sandalwood.', notes: 'Rose, Amber, Sandalwood' },
  { name: 'Velvet Nectar', category: 'Women', price: 8700, imageUrl: 'https://via.placeholder.com/360x360/111111/ffc0cb?text=Women+9', description: 'A luminous fragrance with jasmine and sugar petals.', notes: 'Jasmine, Sugar, Vanilla' },
  { name: 'Orchid Aura', category: 'Women', price: 9000, imageUrl: 'https://via.placeholder.com/360x360/111111/ffc0cb?text=Women+10', description: 'A lush floral bouquet accented with creamy musk.', notes: 'Orchid, Rose, Musk' }
];

function initFirebase() {
  if (!window.firebase || !window.initFirebaseApp) return false;
  const app = initFirebaseApp();
  if (!app) return false;
  db = firebase.database();
  auth = firebase.auth();
  return true;
}

function authGuard() {
  if (!auth) return;
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = 'admin-login.html';
      return;
    }
    const emailElement = document.getElementById('adminEmail');
    if (emailElement) {
      emailElement.textContent = user.email || 'Admin';
    }
  });
}

function objectToArray(value) {
  if (!value) return [];
  return Object.keys(value).map(key => ({ id: key, ...value[key] }));
}

function resetProductForm() {
  const form = document.getElementById('productForm');
  if (form) form.reset();
  const errorEl = document.getElementById('productFormError');
  if (errorEl) errorEl.textContent = '';
}

function saveProduct(event) {
  event.preventDefault();
  const name = document.getElementById('productName').value.trim();
  const category = document.getElementById('productCategory').value;
  const price = Number(document.getElementById('productPrice').value.trim());
  const imageUrl = document.getElementById('productImageUrl').value.trim();
  const description = document.getElementById('productDescription').value.trim();
  const notes = document.getElementById('productNotes').value.trim();
  const errorEl = document.getElementById('productFormError');
  if (errorEl) errorEl.textContent = '';

  if (!name || !category || !price || !imageUrl || !description) {
    if (errorEl) errorEl.textContent = 'Please complete all required fields.';
    return;
  }

  const productData = {
    name,
    category,
    price,
    imageUrl,
    description,
    notes,
    stock: 99,
    createdAt: Date.now()
  };

  db.ref('products').push(productData)
    .then(() => {
      resetProductForm();
      showToast('Product added successfully.');
    })
    .catch(err => {
      console.error(err);
      if (errorEl) errorEl.textContent = 'Unable to add product. Please try again.';
    });
}

function seedProducts() {
  if (!db) return;
  if (products.length > 0) {
    showToast('Products already exist in the catalog.');
    return;
  }

  const seedPromises = initialProducts.map(product => db.ref('products').push({ ...product, stock: 99, createdAt: Date.now() }));
  Promise.all(seedPromises)
    .then(() => showToast('30 products seeded successfully.'))
    .catch(err => {
      console.error(err);
      showToast('Unable to seed products.');
    });
}

function deleteProduct(id) {
  if (!db) return;
  db.ref(`products/${id}`).remove().catch(err => console.error('Delete failed', err));
}

function updateOrderStatus(orderId, status) {
  if (!db) return;
  db.ref(`orders/${orderId}`).update({ status }).catch(err => console.error('Order update failed', err));
}

function getActiveOrdersCount() {
  return orders.filter(order => order.status !== 'Delivered').length;
}

function updateDashboardCounts() {
  const totalProductsEl = document.getElementById('totalProducts');
  const activeOrdersEl = document.getElementById('activeOrders');
  if (totalProductsEl) totalProductsEl.textContent = products.length;
  if (activeOrdersEl) activeOrdersEl.textContent = getActiveOrdersCount();
}

function renderProductTable() {
  const body = document.getElementById('productTableBody');
  if (!body) return;
  body.innerHTML = '';

  if (!products.length) {
    body.innerHTML = '<tr><td colspan="5" class="empty-row">No products found. Seed the catalog or add a new product.</td></tr>';
    return;
  }

  products.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${product.imageUrl || 'images/bottle-female.png'}" alt="${product.name}" class="table-thumb"></td>
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>Rs. ${product.price}</td>
      <td>
        <button class="action-button delete" onclick="deleteProduct('${product.id}')">Delete</button>
      </td>
    `;
    body.appendChild(row);
  });
}

function renderOrdersTable() {
  const body = document.getElementById('ordersTableBody');
  if (!body) return;
  body.innerHTML = '';

  if (!orders.length) {
    body.innerHTML = '<tr><td colspan="7" class="empty-row">No orders available yet.</td></tr>';
    return;
  }

  orders.forEach(order => {
    const date = order.createdAt ? new Date(order.createdAt).toLocaleString('en-PK') : '-';
    const status = order.status || 'Pending';
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customer?.fullName || '-'}</td>
      <td>Rs. ${order.total || 0}</td>
      <td>${status}</td>
      <td>${date}</td>
      <td>
        <select onchange="updateOrderStatus('${order.id}', this.value)">
          <option value="Pending" ${status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="Shipped" ${status === 'Shipped' ? 'selected' : ''}>Shipped</option>
          <option value="Delivered" ${status === 'Delivered' ? 'selected' : ''}>Delivered</option>
        </select>
      </td>
    `;
    body.appendChild(row);
  });
}

function renderReviewTable() {
  const body = document.getElementById('reviewsTableBody');
  if (!body) return;
  body.innerHTML = '';

  if (!reviews.length) {
    body.innerHTML = '<tr><td colspan="5" class="empty-row">No reviews have been submitted yet.</td></tr>';
    return;
  }

  reviews.forEach(review => {
    const date = review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-PK') : '-';
    const rating = '★'.repeat(review.rating || 0) + '☆'.repeat(5 - (review.rating || 0));
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${review.productName || 'Unknown'}</td>
      <td>${review.name || 'Customer'}</td>
      <td>${rating}</td>
      <td>${review.comment || '-'}</td>
      <td>${date}</td>
    `;
    body.appendChild(row);
  });
}

function subscribeRealtimeData() {
  if (!db) return;

  db.ref('products').on('value', snapshot => {
    products = objectToArray(snapshot.val());
    renderProductTable();
    updateDashboardCounts();
  });

  db.ref('orders').on('value', snapshot => {
    orders = objectToArray(snapshot.val());
    renderOrdersTable();
    updateDashboardCounts();
  });

  db.ref('reviews').on('value', snapshot => {
    const rawReviews = objectToArray(snapshot.val());
    reviews = rawReviews.map(review => ({
      ...review,
      productName: products.find(product => product.id === review.productId)?.name || 'Unknown'
    }));
    renderReviewTable();
    updateDashboardCounts();
  });
}

function showSection(sectionId) {
  document.querySelectorAll('.admin-section').forEach(section => {
    section.hidden = section.id !== sectionId;
  });
  document.querySelectorAll('.sidebar-link').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === sectionId);
  });
  const titleMap = {
    dashboard: 'Dashboard',
    products: 'Product Management',
    orders: 'Order Management',
    reviews: 'Review Management'
  };
  document.getElementById('pageTitle').textContent = titleMap[sectionId] || 'Dashboard';
}

document.addEventListener('DOMContentLoaded', () => {
  if (!initFirebase()) {
    console.error('Firebase initialization failed.');
    return;
  }
  authGuard();
  subscribeRealtimeData();
  document.querySelectorAll('.sidebar-link').forEach(button => {
    button.addEventListener('click', () => showSection(button.dataset.section));
  });
});
