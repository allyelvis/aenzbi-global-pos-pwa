document.getElementById('viewInventoryBtn').addEventListener('click', () => {
  db.ref('inventory').once('value', snapshot => {
    let items = snapshot.val();
    alert(JSON.stringify(items, null, 2));
  });
});

function addInventoryItem(item) {
  db.ref('inventory/' + item.id).set(item);
}
