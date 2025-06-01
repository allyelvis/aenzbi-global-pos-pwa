// Initialize Firebase
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
const dbRef = firebase.database().ref('sales');

// IndexedDB setup
let db;
const request = indexedDB.open('aenzbiPOSDB', 1);
request.onupgradeneeded = (e) => {
  db = e.target.result;
  const store = db.createObjectStore('sales', { keyPath: 'id' });
};
request.onsuccess = (e) => {
  db = e.target.result;
  loadSales();
};

function loadSales() {
  const tx = db.transaction('sales', 'readonly');
  const store = tx.objectStore('sales');
  const req = store.getAll();
  req.onsuccess = () => {
    const salesList = document.getElementById('salesList');
    salesList.innerHTML = '';
    req.result.forEach((sale) => {
      const li = document.createElement('li');
      li.textContent = `${sale.id}: $${sale.amount} (Synced: ${sale.synced})`;
      salesList.appendChild(li);
    });
  };
}

document.getElementById('addSaleBtn').onclick = () => {
  const id = Date.now();
  const sale = { id, amount: Math.floor(Math.random() * 100), synced: false };
  const tx = db.transaction('sales', 'readwrite');
  const store = tx.objectStore('sales');
  store.add(sale).onsuccess = () => {
    loadSales();
  };
};

document.getElementById('syncBtn').onclick = () => {
  const tx = db.transaction('sales', 'readonly');
  const store = tx.objectStore('sales');
  const req = store.openCursor();
  const unsyncedSales = [];
  req.onsuccess = (e) => {
    const cursor = e.target.result;
    if (cursor) {
      if (!cursor.value.synced) unsyncedSales.push(cursor.value);
      cursor.continue();
    } else {
      unsyncedSales.forEach((sale) => {
        dbRef.push(sale)
          .then(() => {
            const txUpdate = db.transaction('sales', 'readwrite');
            const storeUpdate = txUpdate.objectStore('sales');
            const updateReq = storeUpdate.get(sale.id);
            updateReq.onsuccess = () => {
              const updatedSale = updateReq.result;
              updatedSale.synced = true;
              storeUpdate.put(updatedSale);
            };
          })
          .catch((err) => console.error('Firebase sync error:', err));
      });
      alert('Synced to Firebase!');
      loadSales();
    }
  };
};

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log('Service Worker registered.');
  });
}
