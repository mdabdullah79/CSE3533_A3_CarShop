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

// Remove active class from all
document.querySelectorAll(".navbtn").forEach((btn) => {
  btn.classList.remove("active");
});

// Add active class to current page
const activeId = pageMap[currentPage];
if (activeId) {
  const activeElement = document.getElementById(activeId);
  if (activeElement) {
    activeElement.classList.add("active");
  }
}

//   category

