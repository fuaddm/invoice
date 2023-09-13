const userStreet = document.querySelector("#userStreet");
const userCity = document.querySelector("#userCity");
const userPostcode = document.querySelector("#userPostcode");
const userCountry = document.querySelector("#userCountry");
const clientName = document.querySelector("#clientName");
const clientEmail = document.querySelector("#clientEmail");
const clientStreet = document.querySelector("#clientStreet");
const clientCity = document.querySelector("#clientCity");
const clientCountry = document.querySelector("#clientCountry");
const clientPostcode = document.querySelector("#clientPostcode");
const projectDesc = document.querySelector("#projectDesc");
const draftBtn = document.querySelector(".sidebar__draftBtn");
const saveBtn = document.querySelector(".sidebar__saveBtn");
const addBtn = document.querySelector(".sidebar__addBtn");
const cancelBtn = document.querySelector(".sidebar__cancelBtn");
const editBtn = document.querySelector(".sidebar__editBtn");
const itemsWrapper = document.querySelector(".sidebar__group2__wrapper");
const items = document.querySelectorAll(".sidebar__group2");
const buttons = document.querySelector(".sidebar__group3");
const buttons2 = document.querySelector(".sidebar__group4");
const totals = document.querySelectorAll(".sidebar__label__total");
const title = document.querySelector(".sidebar__title");
const mainWrapper = document.querySelector(".main__wrapper");
const card = document.querySelector(".item");
const goBack = document.querySelector(".item__goback");
const openEditBtn = document.querySelector(".item__header__editBtn");
const deleteBtn = document.querySelector(".item__header__deleteBtn");
const paidBtn = card.querySelector(".item__header__paidBtn");

draftBtn.addEventListener("click", () => {
  const items = document.querySelectorAll(".sidebar__group2");
  let arr = [];
  items.forEach((item) => {
    let obj = {
      name: item.querySelector(".itemName").value,
      qty: item.querySelector(".qty").value,
      price: item.querySelector(".price").value,
    };
    arr.push(obj);
  });
  let data = {
    userStreet: userStreet.value,
    userCity: userCity.value,
    userPostcode: userPostcode.value,
    userCountry: userCountry.value,
    clientName: clientName.value,
    clientEmail: clientEmail.value,
    clientStreet: clientStreet.value,
    clientCity: clientCity.value,
    clientCountry: clientCountry.value,
    clientPostcode: clientPostcode.value,
    projectDesc: projectDesc.value,
    date: new Date().toLocaleDateString(),
    status: "draft",
    items: arr,
  };

  loadLocalStorage([data]);
  loadItems();
  closeSidebar();
});

addBtn.addEventListener("click", () => {
  let newItem = document.createElement("div");
  newItem.className = "sidebar__group2";
  newItem.innerHTML = `
<div class="sidebar__label">
  <div class="sidebar__label__text">Item Name</div>
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
  sidebar.scrollTo(0, sidebar.scrollHeight);
});

saveBtn.addEventListener("click", () => {
  const items = document.querySelectorAll(".sidebar__group2");
  let arr = [];
  items.forEach((item) => {
    let obj = {
      name: item.querySelector(".itemName").value,
      qty: item.querySelector(".qty").value,
      price: item.querySelector(".price").value,
    };
    arr.push(obj);
  });
  let data = {
    userStreet: userStreet.value,
    userCity: userCity.value,
    userPostcode: userPostcode.value,
    userCountry: userCountry.value,
    clientName: clientName.value,
    clientEmail: clientEmail.value,
    clientStreet: clientStreet.value,
    clientCity: clientCity.value,
    clientCountry: clientCountry.value,
    clientPostcode: clientPostcode.value,
    projectDesc: projectDesc.value,
    date: new Date().toLocaleDateString(),
    status: "pending",
    items: arr,
  };
  loadLocalStorage([data]);
  loadItems();
  closeSidebar();
});

cancelBtn.addEventListener("click", () => {
  sidebar.style.left = "-100%";
  bgc.style.display = "none";
});

editBtn.addEventListener("click", () => {
  let localData = getLocalStorage();
  const items = document.querySelectorAll(".sidebar__group2");
  let arr = [];
  items.forEach((item) => {
    let obj = {
      name: item.querySelector(".itemName").value,
      qty: item.querySelector(".qty").value,
      price: item.querySelector(".price").value,
    };
    arr.push(obj);
  });
  let data = {
    userStreet: userStreet.value,
    userCity: userCity.value,
    userPostcode: userPostcode.value,
    userCountry: userCountry.value,
    clientName: clientName.value,
    clientEmail: clientEmail.value,
    clientStreet: clientStreet.value,
    clientCity: clientCity.value,
    clientCountry: clientCountry.value,
    clientPostcode: clientPostcode.value,
    projectDesc: projectDesc.value,
    date: new Date().toLocaleDateString(),
    items: arr,
  };
  localData = localData.map((item) => {
    if (item.projectDesc == data.projectDesc) {
      return { ...item, ...data };
    }
    return item;
  });
  localStorage.setItem("data", JSON.stringify(localData));

  loadItems();

  loadCard(localData.find((it) => it.projectDesc == data.projectDesc));
  closeSidebar();
});

goBack.addEventListener("click", () => {
  mainWrapper.classList.remove("hidden");
  card.classList.remove("show");
});

deleteBtn.addEventListener("click", () => {
  let name = card.querySelector(".itemName");
  let data = JSON.parse(localStorage.getItem("data"));
  data = data.filter((it) => it.projectDesc != name.textContent);
  localStorage.setItem("data", JSON.stringify(data));
  loadItems();
  mainWrapper.classList.remove("hidden");
  card.classList.remove("show");
});

openEditBtn.addEventListener("click", () => {
  projectDesc.setAttribute("disabled", "true");
  buttons.classList.add("hidden");
  buttons2.classList.remove("hidden");
  sidebar.style.left = "0";
  bgc.style.display = "block";
  let name = card.querySelector(".itemName");
  let data = JSON.parse(localStorage.getItem("data"));
  let item = data.find((it) => it.projectDesc == name.textContent);
  userStreet.value = item.userStreet;
  userCity.value = item.userCity;
  userPostcode.value = item.userPostcode;
  userCountry.value = item.userCountry;
  clientName.value = item.clientName;
  clientEmail.value = item.clientEmail;
  clientStreet.value = item.clientStreet;
  clientCity.value = item.clientCity;
  clientCountry.value = item.clientCountry;
  clientPostcode.value = item.clientPostcode;
  projectDesc.value = item.projectDesc;
  itemsWrapper.innerHTML = "";
  title.textContent = `Edit #${item.projectDesc}`;
  item.items.forEach((item) => {
    let newItem = document.createElement("div");
    newItem.className = "sidebar__group2";
    newItem.innerHTML = `
            <div class="sidebar__label">
              <div class="sidebar__label__text">Item Name</div>
              <input type="text" value="${item.name}" class="sidebar__input itemName" />
            </div>
            <div class="sidebar__label">
              <div class="sidebar__label__text">Qty.</div>
              <input type="number" class="sidebar__input qty" value="${item.qty}" />
            </div>
            <div  class="sidebar__label">
              <div class="sidebar__label__text">Price</div>
              <input type="number" class="sidebar__input price" value="${item.price}" />
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
    total.textContent = parseFloat(qty.value * price.value).toFixed(2);
    qty.addEventListener("keyup", () => {
      total.textContent = parseFloat(qty.value * price.value).toFixed(2);
    });
    price.addEventListener("keyup", () => {
      total.textContent = parseFloat(qty.value * price.value).toFixed(2);
    });
    itemsWrapper.append(newItem);
  });
});

paidBtn.addEventListener("click", () => {
  let name = card.querySelector(".itemName");
  let data = JSON.parse(localStorage.getItem("data"));
  data = data.map((it) => {
    if (it.projectDesc == name.textContent) {
      it.status = "paid";
      return it;
    }
    return it;
  });
  localStorage.setItem("data", JSON.stringify(data));
  loadItems();
  loadCard(data.find((it) => it.projectDesc == name.textContent));
});

function loadLocalStorage(data) {
  if (localStorage.getItem("data") == null) {
    localStorage.setItem("data", JSON.stringify(data));
  } else {
    let localData = JSON.parse(localStorage.getItem("data"));
    let setData = JSON.stringify(localData.concat(data));
    localStorage.setItem("data", setData);
  }
}

function getLocalStorage() {
  if (localStorage.getItem("data") == null) {
    return [];
  } else {
    let data = JSON.parse(localStorage.getItem("data"));
    return data;
  }
}

function loadItems() {
  let data = getLocalStorage();
  let body = document.querySelector(".main__body");
  body.innerHTML = "";
  data.forEach((item) => {
    let total = item.items.reduce((sum, curr) => {
      sum += curr.qty * curr.price;
      return sum;
    }, 0);
    let bodyItem = document.createElement("div");
    bodyItem.className = "main__body__item";
    bodyItem.innerHTML = `
                <div class="main__body__item-1">
                  <div class="main__body__item__code"><span class="main__body__item__code__yes">#</span>KL9021</div>
                  <div class="main__body__item__date">${item.date}</div>
                </div>
                <div class="main__body__item-2">
                  <div class="main__body__item__name">${item.clientName}</div>
                </div>
                <div class="main__body__item-3">
                  <div class="main__body__item__price">$${total.toFixed(2)}</div>
                  <div class="status ${item.status}">
                    <div class="circle"></div>
                    <span>${item.status[0].toUpperCase() + item.status.slice(1)}</span>
                  </div>
                  <svg class="main__body__item__arrow">
                    <use xlink:href="#arrow"></use>
                  </svg>
                </div>`;
    bodyItem.addEventListener("click", () => {
      mainWrapper.classList.add("hidden");
      card.classList.add("show");
      loadCard(item);
    });
    body.append(bodyItem);
  });
}

function loadCard(item) {
  let total = item.items.reduce((sum, curr) => {
    sum += curr.qty * curr.price;
    return sum;
  }, 0);
  let status = card.querySelector(".status");
  let statusText = status.querySelector("span");
  status.classList.remove("paid");
  status.classList.remove("draft");
  status.classList.remove("pending");
  status.classList.add(item.status);
  paidBtn.classList.remove("show");
  if (item.status == "pending") {
    paidBtn.classList.add("show");
  }
  statusText.textContent = item.status[0].toUpperCase() + item.status.slice(1);
  let projectDesc = card.querySelector(".itemName");
  projectDesc.textContent = item.projectDesc;
  let userStreet = card.querySelector(".userStreet");
  userStreet.textContent = item.userStreet;
  let userCity = card.querySelector(".userCity");
  userCity.textContent = item.userCity;
  let userPostcode = card.querySelector(".userPostcode");
  userPostcode.textContent = item.userPostcode;
  let userCountry = card.querySelector(".userCountry");
  userCountry.textContent = item.userCountry;
  let date1 = card.querySelector(".date1");
  date1.textContent = item.date;
  let date2 = card.querySelector(".date2");
  date2.textContent = item.date;
  let clientName = card.querySelector(".clientName");
  clientName.textContent = item.clientName;
  let clientStreet = card.querySelector(".clientStreet");
  clientStreet.textContent = item.clientStreet;
  let clientPostcode = card.querySelector(".clientPostcode");
  clientPostcode.textContent = item.clientPostcode;
  let clientCity = card.querySelector(".clientCity");
  clientCity.textContent = item.clientCity;
  let clientCountry = card.querySelector(".clientCountry");
  clientCountry.textContent = item.clientCountry;
  let clientEmail = card.querySelector(".clientEmail");
  clientEmail.textContent = item.clientEmail;
  let items = card.querySelector(".item__card__footer__items");
  items.innerHTML = `<div class="item__card__footer__items__name start">Item Name</div>
      <div class="item__card__footer__items__title">QTY.</div>
      <div class="item__card__footer__items__title">Price</div>
      <div class="item__card__footer__items__title">Total</div>`;
  item.items.forEach((item) => {
    let element = `<div class="item__card__footer__item__name start">${item.name}</div>
        <div class="item__card__footer__item__other">${item.qty}</div>
        <div class="item__card__footer__item__other">${item.price}</div>
        <div class="item__card__footer__item__other darkColor">$${(item.qty * item.price).toFixed(2)}</div>`;
    items.innerHTML += element;
  });
  let totalPrice = card.querySelector(".TotalPrice");
  totalPrice.textContent = `$${total.toFixed(2)}`;
}

function closeSidebar() {
  sidebar.style.left = "-100%";
  bgc.style.display = "none";
}

loadItems();
