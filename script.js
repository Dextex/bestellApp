const category = {
  Burger: "Burger",
  Pizza: "Pizza",
  Salad: "Salad",
};

function init() {
  let categoryHeadlinerRef = document.getElementById("categoryHeadline");
  let categoryList = Object.values(category);
  // categoryHeadlinerRef.innerHTML = createCategoryHeadlines(categoryList);

  for (let indexCategory = 0; indexCategory < Object.values(category).length; indexCategory++) {
    let currentList = filterArrayOnCategory(indexCategory);
    categoryHeadlinerRef.innerHTML += createCategoryHeadlines(categoryList, indexCategory);
    for (let dishIndex = 0; dishIndex < currentList.length; dishIndex++) {
      categoryHeadlinerRef.innerHTML += createMeals();
    }
    console.log(currentList);
  }
  // for (let index = 0; index < myDishes.length; index++) {
  //   console.log(index);
  // }
}

function filterArrayOnCategory(i) {
  let categoryItem = Object.keys(category)[i];
  let filterArray = myDishes.filter((dish) => {
    return dish.category == categoryItem;
  });
  return filterArray;
}

function createCategoryHeadlines(category, i) {
  return `<div class="category_headline">
            <img src="./assets/icons/${category[i]}.svg" alt="Icons eines Bürgers" />
            <h2>${category[i]}</h2>
          </div>
        `;
}

function createMeals() {
  return `
          <section>
            <div class="meal_component">
            <div class="meal_information_container">
            <figure>
              <img
                src="./assets/img/veggie-mushdroom-black-burger.jpg"
                alt="Ein Veggie Bürger der Schwarz ist und aus Mushrooms gemacht ist"
              />
            </figure>

            <div class="meal_information">
              <h3>Veggie mushroom black burger</h3>
              <p>Chicken, Mozzarella, Gorgonzola, Fontina, Parmigiano Reggiano</p>
            </div>
          </div>
          <div class="pricing">
            <p>16,90€</p>
            <button>Add to basket</button>
          </div>
        </div>
      </section>
      `;
}
