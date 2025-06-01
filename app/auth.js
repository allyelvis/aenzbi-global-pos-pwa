document.getElementById('loginBtn').addEventListener('click', () => {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert('Login successful!');
    })
    .catch(err => alert(err.message));
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  auth.signOut();
});
