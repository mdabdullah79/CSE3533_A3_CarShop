// ==== main.js ====
// Map of page filenames to nav item IDs
const pageMap = {
  "index.html": "home",
  "inventory.html": "inventory",
  "reviews.html": "reviews",
  "contact.html": "contact",
  "aboutus.html": "about",
};

// Get current page
const currentPage = window.location.pathname.split("/").pop() || "index.html";

// Remove active class from all nav buttons
document.querySelectorAll(".navbtn").forEach((btn) => {
  btn.classList.remove("active");
});

// Add active class to current page’s nav btn
const activeId = pageMap[currentPage];
if (activeId) {
  const activeElement = document.getElementById(activeId);
  if (activeElement) {
    activeElement.classList.add("active");
  }
}
// Data From LocalStorage: Common utilities
const getUsers = () => JSON.parse(localStorage.getItem("customers")) || [];
const getActiveUser = () => JSON.parse(localStorage.getItem("activeUser"));
const clearActiveUser = () => localStorage.removeItem("activeUser");
const getCartData = ()=> JSON.parse(localStorage.getItem("CartData")) || [];
const saveUsers = (users) => localStorage.setItem("customers", JSON.stringify(users));
const setActiveUser = (user) => localStorage.setItem("activeUser", JSON.stringify(user));
const clearCart = () => localStorage.removeItem("CartData");
let activeUser = getActiveUser();

// Navbar navigation
function getHome() { window.location.href = "index.html"; }
function goInventory() { window.location.href = "inventory.html"; }
function goReviews() { window.location.href = "reviews.html"; }
function goContact() { window.location.href = "contact.html"; }
function goAbout() { window.location.href = "aboutus.html"; }
function goLogin() { window.location.href = "login.html"; }

// Initial UI update according to login state
const ProfileCart = document.getElementById("profilecart");
const HomeLogin = document.getElementById("homeLogin");
if (getActiveUser()) {
  ProfileCart.classList.remove("hidden");
  ProfileCart.classList.add("flex");
  HomeLogin.classList.add("hidden");
  showProfile();
}




