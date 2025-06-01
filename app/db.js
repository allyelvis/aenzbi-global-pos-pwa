let dbPromise = indexedDB.open("posDB", 1);

dbPromise.onupgradeneeded = event => {
  let db = event.target.result;
  db.createObjectStore("sales", { keyPath: "id" });
};

function saveSaleLocally(sale) {
  let tx = dbPromise.result.transaction("sales", "readwrite");
  let store = tx.objectStore("sales");
  store.put(sale);
}

function getUnsyncedSales(callback) {
  let tx = dbPromise.result.transaction("sales", "readonly");
  let store = tx.objectStore("sales");
  let req = store.getAll();
  req.onsuccess = () => callback(req.result);
}
