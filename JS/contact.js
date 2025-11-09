// ==== contact.js ====
const form = document.getElementById("contactForm");
const thankYou = document.getElementById("thankYouMessage");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  nameError.classList.add("hidden");
  emailError.classList.add("hidden");
  messageError.classList.add("hidden");
  let valid = true;
  if (nameInput.value.trim().length < 2) {
    nameError.textContent = "Please enter your name.";
    nameError.classList.remove("hidden");
    valid = false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.trim()) {
    emailError.textContent = "Please enter your email.";
    emailError.classList.remove("hidden");
    valid = false;
  } else if (!emailRegex.test(emailInput.value.trim())) {
    emailError.textContent = "Please enter a valid email address.";
    emailError.classList.remove("hidden");
    valid = false;
  }
  if (messageInput.value.trim().length < 10) {
    messageError.textContent = "Message must be at least 10 characters long.";
    messageError.classList.remove("hidden");
    valid = false;
  }
  if (valid) {
    form.classList.add("hidden");
    thankYou.classList.remove("hidden");
    form.reset();
  }
});
