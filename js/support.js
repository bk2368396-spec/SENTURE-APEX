let db = null;
let supportFormReady = false;

function initSupportFirebase() {
  if (!window.firebase || !window.initFirebaseApp) return false;
  try {
    const app = initFirebaseApp();
    if (!app) return false;
    db = firebase.database();
    supportFormReady = true;
    return true;
  } catch (err) {
    console.error('Support Firebase init failed:', err);
    return false;
  }
}

function openCustomerCareModal() {
  const modal = document.getElementById('customerCareModal');
  const overlay = document.getElementById('customerCareOverlay');
  if (modal) modal.style.display = 'flex';
  if (overlay) overlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeCustomerCareModal() {
  const modal = document.getElementById('customerCareModal');
  const overlay = document.getElementById('customerCareOverlay');
  if (modal) modal.style.display = 'none';
  if (overlay) overlay.style.display = 'none';
  document.body.style.overflow = 'auto';
  resetSupportForm();
}

function resetSupportForm() {
  const form = document.getElementById('supportForm');
  if (form) form.reset();
  const errorEl = document.getElementById('supportFormError');
  if (errorEl) errorEl.textContent = '';
}

async function submitSupportTicket(event) {
  event.preventDefault();
  
  const subject = document.getElementById('supportSubject')?.value.trim();
  const message = document.getElementById('supportMessage')?.value.trim();
  const orderId = document.getElementById('supportOrderId')?.value.trim() || 'N/A';
  const email = document.getElementById('supportEmail')?.value.trim();
  const errorEl = document.getElementById('supportFormError');
  const submitBtn = document.querySelector('#supportForm button[type="submit"]');

  if (errorEl) errorEl.textContent = '';

  if (!subject || !message || !email) {
    if (errorEl) errorEl.textContent = 'Please fill in all required fields.';
    return;
  }

  if (!supportFormReady) {
    if (errorEl) errorEl.textContent = 'Service unavailable. Please try again.';
    return;
  }

  if (submitBtn) {
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
  }

  const ticketData = {
    subject,
    message,
    orderId,
    email,
    status: 'Open',
    createdAt: Date.now(),
    resolvedAt: null
  };

  try {
    const ticketsRef = db.ref('support_tickets');
    await ticketsRef.push(ticketData);
    
    showToast('✓ Thank you! Your message has been sent. We will respond shortly.');
    resetSupportForm();
    closeCustomerCareModal();
  } catch (err) {
    console.error('Error submitting ticket:', err);
    if (errorEl) errorEl.textContent = 'Failed to send message. Please try again.';
  } finally {
    if (submitBtn) {
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initSupportFirebase();
});
