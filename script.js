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
  basketDialogRef.showModal();
}

function closeModal() {
  const basketDialogRef = document.getElementById("basketDialog");
  basketDialogRef.close();
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
              <button>Add to basket</button>
            </div>
          </article>
      `;
}

function createBasketList() {
  return `
          <li>
            <h3>1x Veggie mushroom black burger</h3>
            <div>
              <div class="meal_count_wrapper">
                <button>
                  <img src="./assets/icons/delete.svg" alt="eine Mülltonne" />
                </button>
                <p>1</p>
                <button>+</button>
              </div>
              <p>16,90€</p>
            </div>
          </li>
  `;
}
