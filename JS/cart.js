// ==== cart.js ====
const AllCartData = [];



document.getElementById("clear-all").addEventListener("click", () => {
  clearCart();
  displayCart();
  updateCartCount();
});

const displayCart = () => {
  const CartConatainer = document.getElementById("cart-cotainer");
  CartConatainer.innerHTML = "";
  const LocalAllCartData = JSON.parse(localStorage.getItem("CartData")) || [];
  let subtotal = 0;
  for (const car of LocalAllCartData) {
    subtotal = subtotal + car.price;
    const Car = document.createElement("div");
    Car.innerHTML = `
      <div class="flex items-center justify-between shadow-md p-3 rounded-lg m-3">
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
  document.getElementById("total").innerText = currentSubtotal - discount;
};


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
      }else {
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
        alert(`${SelectCar.name} Sucessfully Added to the cart`);
      }
      displayCart();
      updateCartCount();
    });
};

const handlePromoCode = () => {
  let Promocode = document
    .getElementById("promoCode")
    .value.trim()
    .toUpperCase();
  let currentTotal = parseInt(document.getElementById("total").innerText) || 0;
  if (Promocode === "SMART20") {
    const discount = currentTotal * 0.2;
    currentTotal -= discount;
    document.getElementById("total").innerText = currentTotal;
    document.getElementById("discount").innerText = discount.toFixed(2);
    document.getElementById("apply-coupon").textContent = "Applied";
    document.getElementById("apply-coupon").disabled = true;
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
  displayCart();
  updateCartCount();
};
updateCartCount();

// Add this function near other cart logic in cart.js
const handlePlaceOrder = () => {
  const Total = parseFloat(document.getElementById("total").textContent);
  const UserBalance = parseFloat(activeUser.balance);

  if (UserBalance >= Total) {
    const users = getUsers();
    const index = users.findIndex((u) => u.email === activeUser.email);

    users[index].balance -= Total;
    activeUser.balance = users[index].balance;

    saveUsers(users);
    setActiveUser(activeUser);

    balanceEl.textContent = `$${activeUser.balance.toFixed(2)}`;

    alert("Order placed");

    clearCart();
    displayCart();
    updateCartCount();
    // window.location.reload(); // optional
  } else {
    alert(`Insufficient balance, $${activeUser.balance.toFixed(2)}`);
  }
};

document
  .getElementById("placeOrderBtn")
  .addEventListener("click", handlePlaceOrder);

