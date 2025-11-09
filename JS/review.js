// ==== review.js ====
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
      <div class="p-5 shadow-sm rounded-xl bg-[]">
        <div class="flex items-center justify-between mb-4">
          <div class="star flex items-center gap-1">
            <p class="text-[20px] font-bold">${review.star}</p>
            <div class="bg-[#00B67A] px-1 rounded-sm  text-white">
              <i class="fa-solid text-[14px] fa-star"></i>
            </div>
          </div>
          <div class="verified flex items-center text-white gap-2">
            <div class="bg-[#6C6C83] flex items-center justify-center text-[10px] rounded-full p-1 font-bold">
              <i class="fa-solid fa-check"></i>
            </div>
            <p class="text-[16px] text-[#6C6C83]">Verified</p>
          </div>
        </div>
        <div class="flex flex-col items-start gap-3">
          <h2 class="text-[20px] font-semibold">${review.comment}</h2>
          <p class="text-gray-500">${review.description}</p>
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

// Swiper for reviews
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
    320: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});
