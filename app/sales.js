document.getElementById('addSaleBtn').addEventListener('click', () => {
  let sale = {
    id: Date.now(),
    item: "Sample Item",
    amount: Math.floor(Math.random() * 100),
    timestamp: new Date().toISOString()
  };
  saveSaleLocally(sale);
  alert('Sale added locally.');
});

document.getElementById('syncBtn').addEventListener('click', () => {
  getUnsyncedSales(sales => {
    sales.forEach(sale => {
      db.ref('sales/' + sale.id).set(sale);
    });
    alert('Synced with Firebase!');
  });
});

function loadSales() {
  db.ref('sales').on('value', snapshot => {
    let list = document.getElementById('salesList');
    list.innerHTML = '';
    snapshot.forEach(child => {
      let li = document.createElement('li');
      li.textContent = `${child.val().item} - $${child.val().amount}`;
      list.appendChild(li);
    });
  });
}
