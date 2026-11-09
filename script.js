const category = {
  burger: "Burger",
  pizza: "Pizza",
  salad: "Salad",
};

function init() {
  let categoryHeadlinerRef = document.getElementById("categoryHeadline");
  let categoryList = Object.values(category);
  categoryHeadlinerRef.innerHTML = createCategoryHeadlines(categoryList);
}

function createCategoryHeadlines(category) {
  return `<div class="category_headline">
            <img src="./assets/icons/${category[0]}.svg" alt="Icons eines Bürgers" />
            <h2>${category[0]}</h2>
          </div>
        `;

  for (let index = 0; index < Object.keys(category).length; index++) {}
}
