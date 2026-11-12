const category = {
  Burger: "Burger",
  Pizza: "Pizza",
  Salad: "Salad",
};

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
  setCountOnCartIcon();
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

function openModal() {
  const basketDialogRef = document.getElementById("basketDialog");
  const mealListRef = document.getElementById("mealList");
  const subtotalRef = basketDialogRef.querySelector("#subtotal");
  const totalRef = basketDialogRef.querySelector("#totalCost");
  const emptyContainerRef = document.getElementById("emptyContainer");
  const summaryRef = document.getElementById("summary");

  let basket = ``;

  if (shoppingCar.length == 0) {
    emptyContainerRef.style.visibility = "visible";
    emptyContainerRef.style.display = "flex";
    summaryRef.style.display = "none";
  } else {
    emptyContainerRef.style.visibility = "hidden";
    emptyContainerRef.style.display = "none";
    summaryRef.style.display = "flex";
  }
  for (let index = 0; index < shoppingCar.length; index++) {
    let buttonLefFromAmount =
      shoppingCar[index].amount == 1
        ? `<button onclick="deleteMeal(${index})">
          <img src="./assets/icons/delete.svg" alt="eine Mülltonne" />
        </button>`
        : `<button onclick="subMeal(${index})">-</button>`;

    let trashButtonTopRight = ``;
    if (shoppingCar[index].amount > 1) {
      trashButtonTopRight = `
                              <button id="trashButtonTopRight" onclick="deleteMeal(${index})">
                                <img src="./assets/icons/delete.svg" alt="eine Mülltonne" />
                              </button>
                            `;
    }

    basket += createBasketList(index, buttonLefFromAmount, trashButtonTopRight);
  }
  let subTotal = calcSubtotal();
  let total = subTotal + 4.99;
  mealListRef.innerHTML = basket;
  subtotalRef.innerHTML = subTotal.toFixed(2).replace(".", ",") + "€";
  totalRef.innerHTML = total.toFixed(2).replace(".", ",") + "€";
  let buyButtonRef = document.getElementById("buyButton");
  buyButtonRef.innerHTML = `Buy now (${total.toFixed(2).replace(".", ",") + "€"})`;
  basketDialogRef.showModal();
  basketDialogRef.classList.remove("is-hide");
  basketDialogRef.classList.add("is-visible");
}

function deleteMeal(index) {
  const id = shoppingCar[index].id;
  const button = document.getElementById(id);
  button.textContent = "Add to basket";
  button.classList.remove("orange_button_text");
  shoppingCar[index].amount = 0;
  shoppingCar.splice(index, 1);
  openModal();
  setCountOnCartIcon();
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

function addMealInBasket(mealID) {
  let meal = structuredClone(myDishes[mealID]);
  let position = shoppingCar.findIndex((element) => meal.id === element.id);
  if (position == -1) {
    meal.amount++;
    shoppingCar.push(meal);
  } else {
    shoppingCar[position].amount++;
  }
  setCountOnCartIcon();
  openModal();
}

function addMeal(mealID, buttonRef) {
  let meal = structuredClone(myDishes[mealID]);
  let position = shoppingCar.findIndex((element) => meal.id === element.id);
  if (position == -1) {
    meal.amount++;
    shoppingCar.push(meal);
  } else {
    shoppingCar[position].amount++;
  }
  buttonRef.innerHTML = "Added 1";
  buttonRef.classList.add("orange_button_text");
  setCountOnCartIcon();
}

function buy() {
  closeModal("basketDialog");
  const orderDialogRef = document.getElementById("orderDialog");
  orderDialogRef.classList.remove("is-hide");
  orderDialogRef.classList.add("is-visible");
  orderDialogRef.showModal();
  clearBasket();
  setCountOnCartIcon();
}

function clearBasket() {
  shoppingCar = [];
}

function subMeal(index) {
  shoppingCar[index].amount--;
  setCountOnCartIcon();
  openModal();
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

function createBasketList(i, buttonLefFromAmount, trashButtonTopRight) {
  return `
          <li>
            ${trashButtonTopRight}
            <h3>${shoppingCar[i].name}</h3>
            <div>
              <div class="meal_count_wrapper">
                  ${buttonLefFromAmount}
                <p>${shoppingCar[i].amount}</p>
                <button onclick="(addMealInBasket(${shoppingCar[i].id}))">+</button>
              </div>
              <p>${shoppingCar[i].price.toFixed(2).replace(".", ",")}€</p>
            </div>
          </li>
  `;
}
