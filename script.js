const AllCartData = [];
// Data From LocalStorage
const getUsers = () => JSON.parse(localStorage.getItem("customers")) || [];
const getActiveUser = () => JSON.parse(localStorage.getItem("activeUser"));
const clearActiveUser = () => localStorage.removeItem("activeUser");
const getCartData = ()=> JSON.parse(localStorage.getItem("CartData")) || [];
const saveUsers = (users) =>
  localStorage.setItem("customers", JSON.stringify(users));
const setActiveUser = (user) =>
  localStorage.setItem("activeUser", JSON.stringify(user));
const clearCart = () => localStorage.removeItem("CartData");
let activeUser = getActiveUser();
// Navbar All Functionality
//> 1.Navigate

function getHome() {
  window.location.href = "index.html";
}

function goInventory() {
  window.location.href = "inventory.html";
}

function goReviews() {
  window.location.href = "reviews.html";
}

function goContact() {
  window.location.href = "contact.html";
}

function goAbout() {
  window.location.href = "aboutus.html";
}

function goLogin() {
  window.location.href = "login.html";
}

const loadEachCar = () => {
  fetch(
    "https://raw.githubusercontent.com/abdullah233079/smart-shopdata/refs/heads/main/carDetaild.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const Data = data.products; // your car data

      // Display all cars initially
      displayEachCar(Data);

      // --- Search functionality ---
      const searchInput = document.getElementById("search-input");
      searchInput.addEventListener("input", (e) => {
        const searchValue = e.target.value.trim().toLowerCase();
        const FilterData = searchValue
          ? Data.filter((car) => car.name.toLowerCase().includes(searchValue))
          : Data;

        displayEachCar(FilterData);
      });

      // --- Filter functionality ---
      const filterSelect = document.getElementById("price-filter");
      filterSelect.addEventListener("change", (e) => {
        const value = e.target.value;
        let sortedData = [...Data];

        if (value === "lowToHigh") {
          sortedData.sort((a, b) => a.price - b.price);
        } else if (value === "highToLow") {
          sortedData.sort((a, b) => b.price - a.price);
        }

        displayEachCar(sortedData);
      });
    })
    .catch((error) => {
      console.error("Error loading car data:", error);
    });
};

function setActiveCategory(e) {
  console.log(e.id);
  const categories = document.getElementsByClassName("category");

  // Remove active border from all buttons
  for (const cat of categories) {
    cat.classList.remove("border-b-3", "border-blue-500", "font-semibold");
  }

  // Add active border to the clicked one
  e.classList.add("border-b-3", "border-blue-500", "font-semibold");

  if (e.id == "All") {
    loadEachCar();
    return;
  }
  fetch(
    "https://raw.githubusercontent.com/abdullah233079/smart-shopdata/refs/heads/main/carDetaild.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const Cars = data.products;
      const FilterCar = Cars.filter((car) => car.category == e.id);
      displayEachCar(FilterCar);
    });
}

const displayEachCar = (data) => {
  const CarContainer = document.getElementById("all-vehicle");
  CarContainer.innerHTML = "";

  if (!data.length) {
    CarContainer.innerHTML = `<p class="text-gray-500 text-center mt-4">No cars found.</p>`;
    return;
  }

  data.forEach((car) => {
    const Car = document.createElement("div");
    Car.innerHTML = `
      <div class="car bg-white rounded-lg shadow-md relative">
        <div class="bg-[#405FF2] text-[14px] text-white rounded-full absolute top-[3%] left-[5%] py-1 px-2 font-semibold">
          ${car.category}
        </div>
        <img class="rounded-t-lg w-full h-[200px]" src="${car.image}" alt="${
      car.name
    }" />
        <div class="p-5 ">
          <div>
            <h2 class="text-[24px] font-semibold">${car.name}</h2>
            <p class="text-gray-400 text-[16px] text-justify">${
              car.description
            }</p>
          </div>
          <div class="flex items-center justify-between border-t border-b border-gray-300 m-4 py-4">
            <div class="flex flex-col items-center justify-center">
              <img class="w-6" src="./assets/icon/speedometer.png" alt="Speedometer" />
              <p>${car.mile} mi</p>
            </div>
            <div class="flex flex-col items-center justify-center">
              <img class="w-6" src="./assets/icon/fuel-station.png" alt="Fuel" />
              <p>${car.fuel || "Petrol"}</p>
            </div>
            <div class="flex flex-col items-center justify-center">
              <img class="w-6" src="./assets/icon/gearbox.png" alt="Gearbox" />
              <p class="text-[14px]">${car.type}</p>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <p class="text-[22px] font-bold">$${car.price_usd}</p>
            <button class="text-blue-600 hover:underline" onclick="AddtoCart(${
              car.id
            })">
              Add to Cart
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    CarContainer.appendChild(Car);
  });
};
loadEachCar();

// Review
const loadReview = () => {
  fetch("./JSON/review.json")
    .then((response) => response.json())
    .then((data) => displayReview(data.reviews));
};

const displayReview = (data) => {
  const ReviewConataner = document.getElementById("reviwe-container");

  ReviewConataner.innerHTML = "";
  data.forEach((review) => {
    const Review = document.createElement("div");
    Review.classList.add("swiper-slide");
    Review.innerHTML = `
             <div  class="p-5 shadow-sm rounded-xl bg-[]">
              <div class="flex items-center justify-between mb-4">
                <div class="star flex items-center gap-1">
                  <p class="text-[20px] font-bold">${review.star}</p>
                  <div class="bg-[#00B67A] px-1 rounded-sm  text-white">
                    <i class="fa-solid text-[14px] fa-star"></i>
                  </div>
                  
                </div>

                <div class="verified flex items-center text-white gap-2">
                  <div
                    class="bg-[#6C6C83] flex items-center justify-center text-[10px] rounded-full p-1 font-bold"
                  >
                    <i class="fa-solid fa-check"></i>
                  </div>
                  <p class="text-[16px] text-[#6C6C83]">Verified</p>
                </div>
              </div>

              <div class="flex flex-col items-start gap-3">
                <h2 class="text-[20px] font-semibold">
                  ${review.comment}
                </h2>
                <p class="text-gray-500">${review.description}
                </p>
                <p class="text-[16px] font-bold"></p>
                 <div class="flex items-center justify-between w-full">
                  <p class="text-[16px] font-bold">${review.customer_name}</p>
                  <p class="text-[16px]">${review.date}</p>
                </div>
              </div>
            </div>
    `;
    ReviewConataner.appendChild(Review);
  });
};
loadReview();

// Swiper for Review
const swiper = new Swiper(".swiper", {
  speed: 300,
  spaceBetween: 30,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  grabCursor: true,

  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// CartOption
const AddtoCart = (id) => {
  if (!activeUser) {
    alert("login please");
    return;
  }
  const LocalAllCartData = JSON.parse(localStorage.getItem("CartData")) || [];
  fetch("./JSON/carDetaild.json")
    .then((response) => response.json())
    .then((data) => {
      const Data = data.products;
      const SelectCar = Data[id - 1];
      const found = AllCartData.find((e) => e.id === SelectCar.id);
      const isDuplicate = LocalAllCartData.find((car) => car.id === id);

      if (isDuplicate) {
        alert(`${isDuplicate.name} Already in Cart!`);
        return;
      }
      alert(`${SelectCar.name} Sucessfully Added to the cart`);
      if (found) {
        found.quantity++;
      } else {
        const CartData = {
          id: id,
          img: SelectCar.image,
          name: SelectCar.name,
          price: SelectCar.price_usd,
          quantity: 1,
        };
        AllCartData.push(CartData);

        LocalAllCartData.push(CartData);
        localStorage.setItem("CartData", JSON.stringify(LocalAllCartData));
      }
      displayCart();
      updateCartCount();
    });
};

  document.getElementById('clear-all').addEventListener('click',()=>{
    clearCart();
    displayCart();
    updateCartCount();
})

const displayCart = () => {

  const CartConatainer = document.getElementById("cart-cotainer");
  CartConatainer.innerHTML = "";
  const LocalAllCartData = JSON.parse(localStorage.getItem("CartData")) || [];
  let subtotal = 0;
  for (const car of LocalAllCartData) {
    subtotal = subtotal + car.price;
    const Car = document.createElement("div");
    Car.innerHTML = `
            <div
                class="flex items-center justify-between shadow-md p-3 rounded-lg m-3"
              >
                <div class="flex items-center gap-3">
                  <div>
                    <img class="rounded-xl w-40 h-20" src="${car.img}" alt="" />
                  </div>
                  <div>
                    <h2 class="text-[18px] font-bold">${car.name}</h2>
                    <h2 class="text-[16px]">$ ${car.price}</h2>
                  </div>
                </div>
                <i class="text-[24px] fa-solid fa-xmark" onclick="handleRemoveCart(${car.id})"></i>
              </div>
        `;
    CartConatainer.appendChild(Car);
    
  }

  
 let discount = parseInt(document.getElementById("discount").innerText) || 0;
  let currentSubtotal =
    parseInt(document.getElementById("subtotal").innerText) || 0;
  currentSubtotal = +subtotal;
  document.getElementById("subtotal").innerText = currentSubtotal;
  document.getElementById("total").innerText = currentSubtotal-discount;
  
  
};

const handlePromoCode = () => {
  let Promocode = document
    .getElementById("promoCode")
    .value.trim()
    .toUpperCase();
  let currentTotal =
    parseInt(document.getElementById("total").innerText) || 0;
  console.log(Promocode);

  if (Promocode === "SMART20") {
    const discount = currentTotal * 0.2;
    currentTotal -= discount;
    document.getElementById("total").innerText = currentTotal;
    document.getElementById("discount").innerText = discount.toFixed(2);
    document.getElementById("apply-coupon").textContent = "Applied";
    document.getElementById("apply-coupon").disabled = true;
    Promocode.value = "dfefegg";
  } else {
    alert("Ivalid PromoCode !");
  }
};




const updateCartCount = () => {
  const LocalAllCartData = JSON.parse(localStorage.getItem("CartData")) || [];
  document.getElementById("cart-count").innerText = LocalAllCartData.length;
};

const handleRemoveCart = (id) => {
  const LocalAllCartData = JSON.parse(localStorage.getItem("CartData"));
  let updatelist = LocalAllCartData.filter((car) => car.id !== id);
  localStorage.setItem("CartData", JSON.stringify(updatelist));
  console.log(LocalAllCartData.length);
  displayCart();
  updateCartCount();
};
updateCartCount();



// ✅ New Swiper for Hero Banner
const heroSwiper = new Swiper(".hero-swiper", {
  loop: true,
  speed: 800,
  effect: "slide",
  fadeEffect: { crossFade: true },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    clickable: true,
  },
});




// contact form
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

  // Reset errors
  nameError.classList.add("hidden");
  emailError.classList.add("hidden");
  messageError.classList.add("hidden");

  let valid = true;

  // Name validation
  if (nameInput.value.trim().length < 2) {
    nameError.textContent = "Please enter your name.";
    nameError.classList.remove("hidden");
    valid = false;
  }

  // Email validation
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

  // Message validation
  if (messageInput.value.trim().length < 10) {
    messageError.textContent = "Message must be at least 10 characters long.";
    messageError.classList.remove("hidden");
    valid = false;
  }

  // Show thank-you message
  if (valid) {
    form.classList.add("hidden");
    thankYou.classList.remove("hidden");
    form.reset();
  }
});





// Profile 
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





const ProfileCart = document.getElementById("profilecart");
const HomeLogin = document.getElementById("homeLogin");
if (getActiveUser()) {
  ProfileCart.classList.remove("hidden");
  ProfileCart.classList.add("flex");
  HomeLogin.classList.add("hidden");
  showProfile();
}


