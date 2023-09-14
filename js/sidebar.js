const btn = document.querySelector(".main__header__control__btn");
const sidebar = document.querySelector(".sidebar");
const bgc = document.querySelector(".bgc");
const discard = document.querySelector(".sidebar__discardBtn");
const invoices = document.querySelectorAll(".main__body__item");

btn.addEventListener("click", () => {
  buttons.classList.remove("hidden");
  buttons2.classList.add("hidden");
  sidebar.style.left = "0";
  bgc.style.display = "block";
  userStreet.value = "";
  userCity.value = "";
  userPostcode.value = "";
  userCountry.value = "";
  clientName.value = "";
  clientEmail.value = "";
  clientStreet.value = "";
  clientCity.value = "";
  clientCountry.value = "";
  clientPostcode.value = "";
  projectDesc.value = "";
  itemsWrapper.innerHTML = "";
  title.textContent = "New Invoice";
  let newItem = document.createElement("div");
  newItem.className = "sidebar__group2";
  newItem.innerHTML = `
<div class="sidebar__label">
<div class="sidebar__label__header">
<div class="sidebar__label__text">Item name</div>
<div class="sidebar__label__err">can't be empty</div>
</div>
  <input type="text" value="New Item" class="sidebar__input itemName" />
</div>
<div class="sidebar__label">
  <div class="sidebar__label__text">Qty.</div>
  <input type="number" class="sidebar__input qty" value="1" />
</div>
<div  class="sidebar__label">
  <div class="sidebar__label__text">Price</div>
  <input type="number" class="sidebar__input price" value="0" />
</div>
<div class="sidebar__label">
  <div class="sidebar__label__text">Total</div>
  <div class="sidebar__label__total total">0.00</div>
</div>
<div class="sidebar__group2__trash">
  <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
      fill-rule="nonzero"></path>
  </svg>
</div>`;
  newItem.querySelector(".sidebar__group2__trash").addEventListener("click", () => {
    newItem.remove();
  });
  let qty = newItem.querySelector(".qty");
  let price = newItem.querySelector(".price");
  let total = newItem.querySelector(".total");
  qty.addEventListener("keyup", () => {
    total.textContent = parseFloat(qty.value * price.value).toFixed(2);
  });
  price.addEventListener("keyup", () => {
    total.textContent = parseFloat(qty.value * price.value).toFixed(2);
  });
  itemsWrapper.append(newItem);
});
discard.addEventListener("click", () => {
  sidebar.style.left = "-100%";
  bgc.style.display = "none";
});
bgc.addEventListener("click", () => {
  sidebar.style.left = "-100%";
  bgc.style.display = "none";
});
