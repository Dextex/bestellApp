const category = {
  Burger: "Burger",
  Pizza: "Pizza",
  Salad: "Salad",
};
const DELIVERY_FEE = 4.99;

function init() {
  let categoryHeadlinerRef = document.getElementById("main");
  let categoryList = Object.values(category);

  for (let indexCategory = 0; indexCategory < Object.values(category).length; indexCategory++) {
    let currentList = filterArrayOnCategory(indexCategory);
    categoryHeadlinerRef.innerHTML += createCategoryHeadlines(categoryList, indexCategory);
    categoryHeadlinerRef.innerHTML += openSection(indexCategory);
    newSectionRef = document.getElementById("new_section_" + indexCategory);
    for (let dishIndex = 0; dishIndex < currentList.length; dishIndex++) {
      newSectionRef.innerHTML += createMeals(dishIndex, currentList);
    }
  }
  renderBasket();
}

function renderBasket() {
  const html = shoppingCar.length == 0 ? createEmptyBasket() : createFilledBasket();
  document.querySelectorAll(".basket_content").forEach((ref) => {
    ref.innerHTML = html;
  });
  setCountOnCartIcon();
}

function openModal() {
  const basketDialogRef = document.getElementById("basketDialog");
  basketDialogRef.showModal();
  basketDialogRef.classList.remove("is-hide");
  basketDialogRef.classList.add("is-visible");
}

function addToBasket(mealID) {
  let meal = structuredClone(myDishes[mealID]);
  let position = shoppingCar.findIndex((element) => meal.id === element.id);
  if (position == -1) {
    meal.amount++;
    shoppingCar.push(meal);
  } else {
    shoppingCar[position].amount++;
  }
  renderBasket();
}

function filterArrayOnCategory(i) {
  let categoryItem = Object.keys(category)[i];
  let filterArray = myDishes.filter((dish) => {
    return dish.category == categoryItem;
  });
  return filterArray;
}

function changeButtonImg(button) {
  const icon = button.querySelector("img");
  const pfad = icon.src;
  const letzterSlash = pfad.lastIndexOf("/");
  const dateiname = pfad.slice(letzterSlash + 1);
  const normalName = dateiname.replace(".svg", "-hover.svg");
  icon.src = "./assets/icons/" + normalName;
}
function resetIcon(button) {
  const icon = button.querySelector("img");
  const pfad = icon.src;
  const letzterSlash = pfad.lastIndexOf("/");
  const dateiname = pfad.slice(letzterSlash + 1);
  const normalName = dateiname.replace("-hover", "");

  icon.src = "./assets/icons/" + normalName;
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (id === "basketDialog") {
    modal.classList.remove("is-visible");
    modal.classList.add("is-hide");
  } else if (id === "orderDialog") {
    modal.classList.remove("is-visible");
    modal.classList.add("is-hide");
  }
  modal.addEventListener(
    "animationend",
    () => {
      modal.close();
    },
    { once: true },
  );
}

function addMeal(mealID, buttonRef) {
  addToBasket(mealID);
  buttonRef.innerHTML = "Added 1";
  buttonRef.classList.add("orange_button_text");
}

function subMeal(index) {
  shoppingCar[index].amount--;
  renderBasket();
}

function deleteMeal(index) {
  const button = document.getElementById(shoppingCar[index].id);
  button.textContent = "Add to basket";
  button.classList.remove("orange_button_text");
  shoppingCar.splice(index, 1);
  renderBasket();
}

function buy() {
  const basketDialogRef = document.getElementById("basketDialog");
  if (basketDialogRef.open) {
    closeModal("basketDialog");
  }
  const orderDialogRef = document.getElementById("orderDialog");
  orderDialogRef.classList.remove("is-hide");
  orderDialogRef.classList.add("is-visible");
  orderDialogRef.showModal();
  clearBasket();
}

function clearBasket() {
  shoppingCar = [];
  document.querySelectorAll(".pricing button").forEach((button) => {
    button.textContent = "Add to basket";
    button.classList.remove("orange_button_text");
  });
  renderBasket();
}

function createEmptyBasket() {
  return `
    <div class="emptyContainer">
      <p class="empty_text">Nothing here yet. Go ahead and choose something delicious!</p>
      <img src="./assets/icons/shopping_cart_white.svg" alt="Icon eines Einkaufswagen" />
    </div>
  `;
}

function createFilledBasket() {
  let mealListHtml = "";
  for (let index = 0; index < shoppingCar.length; index++) {
    mealListHtml += createBasketList(index);
  }
  const subTotal = calcSubtotal();
  const total = subTotal + DELIVERY_FEE;
  return `
    <ul>${mealListHtml}</ul>
    <div class="summary">
      <div><p>Subtotal</p><p>${formatPrice(subTotal)}</p></div>
      <div><p>Delivery fee</p><p>${formatPrice(DELIVERY_FEE)}</p></div>
      <hr />
      <div><p>Total</p><p>${formatPrice(total)}</p></div>
      <button onclick="buy()">Buy now (${formatPrice(total)})</button>
    </div>
  `;
}

function createBasketList(i) {
  const meal = shoppingCar[i];
  const deleteIcon = `<img src="./assets/icons/delete.svg" alt="eine Mülltonne" />`;
  const buttonLeftFromAmount =
    meal.amount == 1
      ? `<button onclick="deleteMeal(${i})">${deleteIcon}</button>`
      : `<button onclick="subMeal(${i})">-</button>`;
  const trashButtonTopRight =
    meal.amount > 1 ? `<button onclick="deleteMeal(${i})">${deleteIcon}</button>` : ``;
  return `
    <li>
      ${trashButtonTopRight}
      <h3>${meal.name}</h3>
      <div>
        <div class="meal_count_wrapper">
          ${buttonLeftFromAmount}
          <p>${meal.amount}</p>
          <button onclick="addToBasket(${meal.id})">+</button>
        </div>
        <p>${formatPrice(meal.price)}</p>
      </div>
    </li>
  `;
}

function setCountOnCartIcon() {
  const pRef = document.getElementById("mealCountOnShoppingCartIcon");
  const count = calcMealCount();
  if (count != 0) {
    pRef.innerHTML = `${count}`;
    pRef.style.visibility = "visible";
  } else {
    pRef.style.visibility = "hidden";
  }
}

function calcSubtotal() {
  let subTotal = 0;
  shoppingCar.forEach((element) => {
    subTotal += element.price * element.amount;
  });
  return subTotal;
}

function calcMealCount() {
  let count = 0;
  shoppingCar.forEach((element) => {
    count += element.amount;
  });
  return count;
}

function openSection(i) {
  return `<section class="meal_section" id=new_section_${i}>`;
}

function createCategoryHeadlines(category, i) {
  return `<div class="category_headline">
            <img src="./assets/icons/${category[i]}.svg" alt="Icons eines Bürgers" />
            <h2>${category[i]}</h2>
          </div>
        `;
}

function createMeals(i, currentList) {
  return `
          <article class="meal_component">
            <div class="meal_information_container">
              <figure>
                <img
                  src="./assets/img/${currentList[i].img}"
                  alt="${currentList[i].name} ${currentList[i].description}"
                />
              </figure>
              <div class="meal_information">
                <h3>${currentList[i].name}</h3>
                <p>${currentList[i].description}</p>
              </div>
            </div>
            <div class="pricing">
              <p>${currentList[i].price.toFixed(2).replace(".", ",")}€</p>
              <button id=${currentList[i].id} onclick="addMeal(${currentList[i].id}, this)">Add to basket</button>
            </div>
          </article>
      `;
}

function formatPrice(value) {
  return value.toFixed(2).replace(".", ",") + "€";
}
