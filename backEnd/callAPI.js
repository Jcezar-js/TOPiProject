const searchButton = document.getElementById('searchButton');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.mealDetails-Content');
const recipeCloseButton = document.getElementById('recipe-CloseButton');

const ingredientsList =document.getElementById('ingredientsList');

// listeners
searchButton.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);

recipeCloseButton.addEventListener('click',()=>{
    mealDetailsContent.parentElement.classList.remove('showRecipe')
})


function getMealList() {

    let searchInputTxt = document.getElementById('searchInput').value.trim();

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(Response => Response.json())
    .then(data =>{
        let html = "";

        if (data.meals) {
            data.meals.forEach(meal => {
                html += `
                    <div class="mealObject" data-id = "${meal.idMeal}">
                        <div class="mealImg">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>

                        <div class="mealName">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe!</a>
                        </div>
                    </div> 
                 `;
            });
            mealList.classList.remove('notFound');
        }else{
            html = "Sorry, we didn't find any meal =(";
            mealList.classList.add('notFound')
        }
        mealList.innerHTML = html;
    });
}

// Get Recipe

function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// modal
function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class="recipeTittle">${meal.strMeal}</h2>
        <p class="recipeCategory">${meal.strCategory}</p>

        <div class="recipeInstruction">
            <h3>Instructions: </h3>
            <p>${meal.strInstructions}</p>
        </div>

        <div class="recipeMealImg">
            <img src="${meal.strMealThumb}" alt="recipeImage">
        </div>

        <div class="recipeLink">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>

    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}