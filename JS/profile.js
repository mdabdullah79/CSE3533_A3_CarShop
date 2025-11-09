// ==== profile.js ====
const nameEl = document.getElementById("userName");
const emailEl = document.getElementById("userEmail");
const balanceEl = document.getElementById("balance");
function showProfile() {
  nameEl.textContent = activeUser.name;
  emailEl.textContent = activeUser.email;
  addressEl.textContent = activeUser.address;
  balanceEl.textContent = `$${activeUser.balance.toLocaleString()}`;
}

// Add Balance
const addBalanceBtn = document.getElementById("addBalanceBtn");
addBalanceBtn.addEventListener("click", () => {
  const users = getUsers();
  const index = users.findIndex((u) => u.email === activeUser.email);
  users[index].balance += 10000;
  activeUser.balance = users[index].balance;
  saveUsers(users);
  setActiveUser(activeUser);
  balanceEl.textContent = `$${activeUser.balance.toLocaleString()}`;
  alert("✅ $10,000 added successfully!");
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
