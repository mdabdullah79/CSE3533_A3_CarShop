const AllCartData = [];

const loadEachCar = () => {
  fetch("./JSON/carDetaild.json")
    .then((response) => response.json())
    .then((data) => {
      const Data = data.products;

      // Display all cars initially
      displayEachCar(Data);

      // Add search functionality
      const searchInput = document.getElementById("search-input");
      searchInput.addEventListener("input", (e) => {
        const searchValue = e.target.value.trim().toLowerCase();

        const FilterData = searchValue
          ? Data.filter((car) => car.name.toLowerCase().includes(searchValue))
          : Data;

        displayEachCar(FilterData);
      });
    })
    .catch((error) => {
      console.error("Error loading car data:", error);
    });
};

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

// CartOption
const AddtoCart = (id) => {
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

        let updatecart;

        if (LocalAllCartData) {
          updatecart = [...LocalAllCartData, CartData];
        } else {
          updatecart.push(CartData);
        }
        localStorage.setItem("CartData", JSON.stringify(updatecart));
      }
      displayCart();
      updateCartCount();
    });
};

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
                class="flex items-center justify-between shadow-md p-3 rounded-lg m-5"
              >
                <div class="flex items-center gap-3">
                  <div>
                    <img class="rounded-xl w-50 h-25" src="${car.img}" alt="" />
                  </div>
                  <div>
                    <h2 class="text-[24px] font-bold">${car.name}</h2>
                    <h2 class="text-[20px]">$ ${car.price}</h2>
                  </div>
                </div>
                <i class="text-[24px] fa-solid fa-xmark" onclick="handleRemoveCart(${car.id})"></i>
              </div>
        `;
    CartConatainer.appendChild(Car);
  }

  let currentSubtotal =
    parseInt(document.getElementById("subtotal").innerText) || 0;
  currentSubtotal = +subtotal;
  document.getElementById("subtotal").innerText = currentSubtotal;
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

const handlePromoCode = () => {
  const Promocode = document
    .getElementById("promoCode")
    .value.trim()
    .toUpperCase();
  let currentSubtotal =
    parseInt(document.getElementById("subtotal").innerText) || 0;
  console.log(Promocode);

  if (Promocode === "SMART20") {
    const discount = currentSubtotal * 0.2;
    currentSubtotal -= discount;
    document.getElementById("subtotal").innerText = currentSubtotal;
    document.getElementById("discount").innerText = discount.toFixed(2);
  } else {
    alert("Ivalid PromoCode !");
  }
  console.log(currentSubtotal);
};

// Swiper for sliding
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

const backToTopBtn = document.getElementById("backToTop");

// Show or hide button on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.remove("hidden");
    backToTopBtn.classList.add("flex"); // make it visible
  } else {
    backToTopBtn.classList.add("hidden");
    backToTopBtn.classList.remove("flex");
  }
});

// Scroll smoothly to top
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");

  if (window.scrollY > 680) {
    // After scrolling 400px
    navbar.classList.remove("bg-transparent", "text-white");
    navbar.classList.add("bg-white", "text-black", "shadow-md");
  } else {
    // When back to top
    navbar.classList.add("bg-transparent", "text-white");
    navbar.classList.remove("bg-white", "text-black", "shadow-md");
  }
});
