// ==== profile.js ====
const nameEl = document.getElementById("userName");
const emailEl = document.getElementById("userEmail");
const balanceEl = document.getElementById("balance");
function showProfile() {
  nameEl.textContent = activeUser.name;
  emailEl.textContent = activeUser.email;
  balanceEl.textContent = `$${activeUser.balance.toLocaleString()}`;
}
showProfile();


// Add Balance
const addBalanceBtn = document.getElementById("addBalanceBtn");
addBalanceBtn.addEventListener("click", () => {
  const users = getUsers();
  const index = users.findIndex((u) => u.email === activeUser.email);
  console.log(users[index]);
  users[index].balance += 100000;
  activeUser.balance = users[index].balance;
  saveUsers(users);
  setActiveUser(activeUser);
  balanceEl.textContent = `$${activeUser.balance.toLocaleString()}`;
});

// LogOut
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
  clearActiveUser();
  clearCart();
  activeUser = null;
  location.reload();
  alert("You have logged out!");
});






