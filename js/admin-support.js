let db = null;
let auth = null;
let tickets = [];
let currentTicketId = null;
let currentFilter = 'all';

function initFirebase() {
  if (!window.firebase || !window.initFirebaseApp) return false;
  try {
    const app = initFirebaseApp();
    if (!app) return false;
    db = firebase.database();
    auth = firebase.auth();
    return true;
  } catch (err) {
    console.error('Firebase init failed:', err);
    return false;
  }
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
    startTicketStream();
  });
}

function startTicketStream() {
  if (!db) return;
  
  const ticketsRef = db.ref('support_tickets');
  ticketsRef.orderByChild('createdAt').on('value', snapshot => {
    tickets = [];
    snapshot.forEach(childSnapshot => {
      tickets.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    tickets.reverse();
    renderTickets();
  }, error => {
    console.error('Error loading tickets:', error);
    renderTickets();
  });
}

function formatDate(timestamp) {
  if (!timestamp) return 'N/A';
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-PK') + ' ' + date.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' });
}

function renderTickets() {
  const tbody = document.getElementById('ticketsTableBody');
  if (!tbody) return;

  const filtered = currentFilter === 'all' 
    ? tickets 
    : tickets.filter(t => t.status === currentFilter);

  if (!filtered.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No support tickets found.</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(ticket => `
    <tr>
      <td>${formatDate(ticket.createdAt)}</td>
      <td>${ticket.email}</td>
      <td>${ticket.subject}</td>
      <td>${ticket.orderId || 'N/A'}</td>
      <td><span class="status-badge ${ticket.status.toLowerCase()}">${ticket.status}</span></td>
      <td>
        <button class="btn-link" onclick="viewTicket('${ticket.id}')">View</button>
        ${ticket.status === 'Open' ? `<button class="btn-link" onclick="quickResolve('${ticket.id}')">Resolve</button>` : ''}
      </td>
    </tr>
  `).join('');
}

function filterTickets(status, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = status;
  renderTickets();
}

function viewTicket(ticketId) {
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) return;

  currentTicketId = ticketId;

  document.getElementById('detailEmail').textContent = ticket.email;
  document.getElementById('detailSubject').textContent = ticket.subject;
  document.getElementById('detailMessage').textContent = ticket.message;
  document.getElementById('detailOrderId').textContent = ticket.orderId || 'N/A';
  document.getElementById('detailDate').textContent = formatDate(ticket.createdAt);
  document.getElementById('detailStatus').textContent = ticket.status;

  const resolveBtn = document.getElementById('resolveBtn');
  if (resolveBtn) {
    resolveBtn.style.display = ticket.status === 'Resolved' ? 'none' : 'block';
  }

  const modal = document.getElementById('ticketModal');
  const overlay = document.getElementById('ticketOverlay');
  if (modal) modal.style.display = 'flex';
  if (overlay) overlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeTicketModal() {
  const modal = document.getElementById('ticketModal');
  const overlay = document.getElementById('ticketOverlay');
  if (modal) modal.style.display = 'none';
  if (overlay) overlay.style.display = 'none';
  document.body.style.overflow = 'auto';
  currentTicketId = null;
}

function markAsResolved() {
  if (!currentTicketId || !db) return;

  const updateData = {
    status: 'Resolved',
    resolvedAt: Date.now()
  };

  db.ref(`support_tickets/${currentTicketId}`).update(updateData)
    .then(() => {
      showToast('✓ Ticket marked as resolved.');
      closeTicketModal();
    })
    .catch(err => {
      console.error('Error updating ticket:', err);
      showToast('✗ Failed to update ticket.');
    });
}

function quickResolve(ticketId) {
  if (!db) return;

  const updateData = {
    status: 'Resolved',
    resolvedAt: Date.now()
  };

  db.ref(`support_tickets/${ticketId}`).update(updateData)
    .then(() => {
      showToast('✓ Ticket resolved.');
    })
    .catch(err => {
      console.error('Error resolving ticket:', err);
      showToast('✗ Failed to resolve ticket.');
    });
}

function handleLogout() {
  if (!auth) return;
  auth.signOut()
    .then(() => {
      window.location.href = 'admin-login.html';
    })
    .catch(err => console.error('Logout error:', err));
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  if (initFirebase()) {
    authGuard();
  }
});
