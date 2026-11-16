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

function createEmptyBasket() {
  return `
    <div class="emptyContainer">
      <p class="empty_text">Nothing here yet. Go ahead and choose something delicious!</p>
      <img src="./assets/icons/shopping_cart_white.svg" alt="Icon eines Einkaufswagen" />
    </div>
  `;
}

function renderFilledBasket(mealListHtml, subTotal, DELIVERY_FEE, total) {
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

function renderMealCardBasket(trashButtonTopRight, meal, buttonLeftFromAmount) {
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
