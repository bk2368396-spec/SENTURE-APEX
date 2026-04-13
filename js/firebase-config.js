const firebaseConfig = {
  apiKey: "AIzaSyCQYC4dYnpyTHNju3fkLKdRogH6DexM4TA",
  authDomain: "senture-apex.firebaseapp.com",
  databaseURL: "https://senture-apex-default-rtdb.firebaseio.com",
  projectId: "senture-apex",
  storageBucket: "senture-apex.firebasestorage.app",
  messagingSenderId: "241745650010",
  appId: "1:241745650010:web:a951112a571771cc67d363",
  measurementId: "G-9N05467ZSF"
};

function initFirebaseApp() {
  if (!window.firebase || !firebase.apps) return null;
  if (!firebaseConfig || !firebaseConfig.apiKey || firebaseConfig.apiKey.startsWith('<')) {
    console.warn('Firebase is not configured correctly.');
    return null;
  }
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  return firebase.app();
}
