import { createContext, useState, useEffect } from "react";

// helper functions

const displaySearchedRecipesHelper = (searchedRecipes, recipeNameSearched) => {
  // TODO: need to validate recipeNameSearched
};

const displayRecipeHelper = (searchedRecipes, clickedRecipe) => {
};

const updateServingsHelper = (recipeToUpdate, updatedServings) => {
  // TODO: need to validate updatedServings
  // TODO: create servings calculation under calculations folder
};

export const RecipesContext = createContext({
  searchedRecipes: [],
  // TODO: may need to place page numbers here
  // searchedRecipes will contain results returned from https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipeSearched}?key=

  displayedRecipe: {},
  // TODO: may need to place updated servings here
  // displayedRecipe will contain result returned from https://forkify-api.herokuapp.com/api/v2/recipes/${recipe.id}

  displaySearchedRecipes: () => {},
  displayRecipe: () => {},
  updateServings: () => {},
});

export const RecipesProvider = ({ children }) => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [displayedRecipe, setDisplayedRecipe] = useState({});

  const displaySearchedRecipes = (recipeNameSearched) => {
    setSearchedRecipes(displaySearchedRecipesHelper(searchedRecipes, recipeNameSearched));
  };

  const displayRecipe = (clickedRecipe) => {
    setDisplayedRecipe(displayRecipeHelper(searchedRecipes, clickedRecipe));
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

