const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "aenzbi-global-pos.firebaseapp.com",
  databaseURL: "https://aenzbi-global-pos-default-rtdb.firebaseio.com",
  projectId: "aenzbi-global-pos",
  storageBucket: "aenzbi-global-pos.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();

window.addEventListener('load', () => {
  auth.onAuthStateChanged(user => {
    if (user) {
      document.getElementById('loginSection').style.display = 'none';
      document.getElementById('appSection').style.display = 'block';
      loadSales();
    } else {
      document.getElementById('loginSection').style.display = 'block';
      document.getElementById('appSection').style.display = 'none';
    }
  });
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    console.log('Service Worker registered.', reg);
  });
}
