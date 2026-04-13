let auth;

function initializeAuth() {
  if (!window.firebase || !window.initFirebaseApp) return false;
  const app = initFirebaseApp();
  if (!app) return false;
  auth = firebase.auth();
  return true;
}

function handleUserLogin(event) {
  event.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const error = document.getElementById('authError');
  if (error) error.textContent = '';

  if (!initializeAuth()) {
    if (error) error.textContent = 'Unable to connect to Firebase. Please check configuration.';
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch(err => {
      if (error) error.textContent = err.message;
    });
}

function handleUserSignup(event) {
  event.preventDefault();
  const name = document.getElementById('displayName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const error = document.getElementById('authError');
  if (error) error.textContent = '';

  if (!initializeAuth()) {
    if (error) error.textContent = 'Unable to connect to Firebase. Please check configuration.';
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      if (userCredential.user && name) {
        return userCredential.user.updateProfile({ displayName: name });
      }
      return null;
    })
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch(err => {
      if (error) error.textContent = err.message;
    });
}

function handleUserLogout() {
  if (!auth && !initializeAuth()) return;
  auth.signOut().then(() => {
    window.location.href = 'index.html';
  });
}

function setupAuthStatus() {
  if (!auth) return;
  const statusEl = document.getElementById('authStatus');
  auth.onAuthStateChanged(user => {
    if (!statusEl) return;
    if (user) {
      statusEl.innerHTML = `Welcome ${user.displayName || user.email} • <button class="link-button" onclick="handleUserLogout()">Logout</button>`;
    } else {
      statusEl.innerHTML = `<a href="login.html">Login</a> • <a href="signup.html">Sign Up</a>`;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (!initializeAuth()) return;
  setupAuthStatus();

  const loginForm = document.getElementById('loginForm');
  if (loginForm) loginForm.addEventListener('submit', handleUserLogin);

  const signupForm = document.getElementById('signupForm');
  if (signupForm) signupForm.addEventListener('submit', handleUserSignup);
});
