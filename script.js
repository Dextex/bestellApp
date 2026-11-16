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

function createFilledBasket() {
  let mealListHtml = "";
  for (let index = 0; index < shoppingCar.length; index++) {
    mealListHtml += createBasketList(index);
  }
  const subTotal = calcSubtotal();
  const total = subTotal + DELIVERY_FEE;
  return renderFilledBasket(mealListHtml, subTotal, DELIVERY_FEE, total);
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
  return renderMealCardBasket(trashButtonTopRight, meal, buttonLeftFromAmount);
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

function formatPrice(value) {
  return value.toFixed(2).replace(".", ",") + "€";
}
