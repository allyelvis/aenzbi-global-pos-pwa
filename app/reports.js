document.getElementById('generateReportBtn').addEventListener('click', () => {
  db.ref('sales').once('value', snapshot => {
    let totalSales = 0;
    snapshot.forEach(child => {
      totalSales += child.val().amount;
    });
    alert('Total Sales: $' + totalSales);
  });
});
