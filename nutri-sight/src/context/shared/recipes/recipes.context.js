import { createContext, useState, useEffect } from "react";

import { getRecipes, getRecipe } from "../../../utils/api-requests/recipes.requests";

import { calculateIngredientsAfterServingsUpdate } from "../../../utils/calculations/recipes.calculations";

// helper functions

const displaySearchedRecipesHelper = async (searchedRecipes, recipeNameSearched) => {
  const recipes = await getRecipes(recipeNameSearched);

  return recipes;
};

const displayRecipeHelper = async (searchedRecipes, clickedRecipe) => {
  const recipe = await getRecipe(clickedRecipe);

  return {
    title: recipe.title,
    publisher: recipe.publisher,
    id: recipe.id,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients
  };
};

const updateServingsHelper = (recipeToUpdate, updatedServings) => {
  const updatedIngredients = calculateIngredientsAfterServingsUpdate(recipeToUpdate, updatedServings);

  return {
    title: recipeToUpdate.title,
    publisher: recipeToUpdate.publisher,
    id: recipeToUpdate.id,
    servings: updatedServings,
    cookingTime: recipeToUpdate.cookingTime,
    ingredients: updatedIngredients
  };
};

export const RecipesContext = createContext({
  searchedRecipes: [],
  // TODO: may need to place page numbers here
  // searchedRecipes will contain results returned from https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipeSearched}?key=

  displayedRecipe: {},
  // TODO: may need to place updated servings here
  // displayedRecipe will contain result returned from https://forkify-api.herokuapp.com/api/v2/recipes/${recipe.id}
  // displayedRecipe structure:
  // {
  //   title: "spicy chicken and pepper jack pizza",
  //   publisher: "my baking addiction"
  //   id: "234321afs",
  //   servings: 4,
  //   cookingTime: 45,
  //   ingredients: [
  //     {
  //       quantity: 1,
  //       unit: "" or "cup" or "g" etc,
  //       description: "chopped sweet onion"
  //     },
  //     {
  //       quantity: 1,
  //       unit: "" or "cup" or "g" etc,
  //       description: "chopped sweet onion"
  //     },
  //   ]
  // }

  displaySearchedRecipes: () => {},
  displayRecipe: () => {},
  updateServings: () => {},
});

export const RecipesProvider = ({ children }) => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [displayedRecipe, setDisplayedRecipe] = useState({});

  const displaySearchedRecipes = async (recipeNameSearched) => {
    const returnedRecipes = await displaySearchedRecipesHelper(searchedRecipes, recipeNameSearched);

    setSearchedRecipes(returnedRecipes);

    const displayRecipe = {
      id: returnedRecipes[0].id,
      title: returnedRecipes[0].title
    };

    const firstDisplayedRecipe = await displayRecipeHelper(searchedRecipes, displayRecipe);

    setDisplayedRecipe(firstDisplayedRecipe);
  };

  const displayRecipe = async (clickedRecipe) => {
    const recipe = await displayRecipeHelper(searchedRecipes, clickedRecipe);

    setDisplayedRecipe(recipe);
  };

  const updateServings = (recipeToUpdate, updatedServings) => {
    setDisplayedRecipe(updateServingsHelper(recipeToUpdate, updatedServings));
  };

  const value = { searchedRecipes, displaySearchedRecipes, updateServings,
                  displayedRecipe, displayRecipe };

  return (
    <RecipesContext.Provider
      value={ value }>
      { children }
    </RecipesContext.Provider>
  );
};

