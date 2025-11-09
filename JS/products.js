// ==== products.js ====
const loadEachCar = () => {
  fetch("https://raw.githubusercontent.com/abdullah233079/smart-shopdata/refs/heads/main/carDetaild.json")
    .then((response) => response.json())
    .then((data) => {
      const Data = data.products;
      displayEachCar(Data);
      // Search
      const searchInput = document.getElementById("search-input");
      searchInput.addEventListener("input", (e) => {
        const searchValue = e.target.value.trim().toLowerCase();
        const FilterData = searchValue
          ? Data.filter((car) => car.name.toLowerCase().includes(searchValue))
          : Data;
        displayEachCar(FilterData);
      });
      // Filter
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
  const categories = document.getElementsByClassName("category");
  for (const cat of categories) {
    cat.classList.remove("border-b-3", "border-blue-500", "font-semibold");
  }
  e.classList.add("border-b-3", "border-blue-500", "font-semibold");
  if (e.id == "All") {
    loadEachCar();
    return;
  }
  fetch("https://raw.githubusercontent.com/abdullah233079/smart-shopdata/refs/heads/main/carDetaild.json")
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
        <img class="rounded-t-lg w-full h-[200px]" src="${car.image}" alt="${car.name}" />
        <div class="p-5 ">
          <div>
            <h2 class="text-[24px] font-semibold">${car.name}</h2>
            <p class="text-gray-400 text-[16px] text-justify">${car.description}</p>
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
            <button class="text-blue-600 hover:underline" onclick="AddtoCart(${car.id})">
              Add to Cart <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    CarContainer.appendChild(Car);
  });
};
loadEachCar();
