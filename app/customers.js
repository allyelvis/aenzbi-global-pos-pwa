function addCustomer(customer) {
  db.ref('customers/' + customer.id).set(customer);
}

function getCustomerById(id, callback) {
  db.ref('customers/' + id).once('value', snapshot => {
    callback(snapshot.val());
  });
}
