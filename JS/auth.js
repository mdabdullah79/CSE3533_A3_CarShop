// Helpers
const getUsers = () => JSON.parse(localStorage.getItem("customers")) || [];
const saveUsers = (users) =>
  localStorage.setItem("customers", JSON.stringify(users));
const getActiveUser = () => JSON.parse(localStorage.getItem("activeUser"));
const setActiveUser = (user) =>
  localStorage.setItem("activeUser", JSON.stringify(user));

// toggleing
const loginSection = document.getElementById("loginSection");
const signupSection = document.getElementById("signupSection");

function showLogin() {
  signupSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
}

function showSignup() {
  loginSection.classList.add("hidden");
  signupSection.classList.remove("hidden");
}



// Sign Up
const signupBtn = document.getElementById("signupBtn");
signupBtn.addEventListener("click", () => {
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!name || !email || !password) {
    alert("Please fill all fields!");
    return;
  }

  let users = getUsers();
  if (users.find((u) => u.email === email)) {
    alert("User already exists!");
    return;
  }

  const newUser = { name, email, password, balance: 10000 };
  users.push(newUser);
  saveUsers(users);
  setActiveUser(newUser);
  activeUser = newUser;
//   showProfile();
  alert("🎉 Account created successfully!");

});

// Login
const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const users = getUsers();

  const foundUser = users.find(
    (u) => u.email === email && u.password === password
  );
  if (!foundUser) {
    alert("Invalid email or password!");
    return;
  }

  setActiveUser(foundUser);
  activeUser = foundUser;
  window.location.href='index.html';
  alert(`Welcome back, ${foundUser.name}!`);
});


