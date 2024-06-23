import { createContext, useState, useEffect } from "react";

import { getRecipes, getRecipe } from "../../../utils/api-requests/recipes.requests";

import { calculateIngredientsAfterServingsUpdate } from "../../../utils/calculations/recipes.calculations";
import { validateRecipeNameSearched } from "../../../utils/validations/recipes.validations";

import { RECIPES_PER_PAGE, PAGINATION_BUTTONS } from "../../../utils/constants/recipes.constants";
import { getNutrientPredictions } from "../../../utils/api-requests/nutrient-predictor.requests";

// helper functions

const displaySearchedRecipesHelper = async (searchedRecipes, recipeNameSearched) => {
  if (validateRecipeNameSearched(recipeNameSearched) === true) return searchedRecipes;

  const recipes = await getRecipes(recipeNameSearched);

  // placing page numbers in recipes
  let recipeNumber = 0;

  const updatedRecipes = recipes.map(recipe => {
    const pageNumber = Math.floor(recipeNumber / RECIPES_PER_PAGE) + 1;
    recipeNumber += 1;

    return {
      ...recipe,

      pageNumber: pageNumber,
    }
  });

  return updatedRecipes;
};

const displaySearchedRecipesOnPageHelper = (searchedRecipes, currentPageNumber) => {
  const recipesOnPage = searchedRecipes.filter(recipe => recipe.pageNumber === currentPageNumber);

  return recipesOnPage;
};

const displayRecipeHelper = async (searchedRecipes, clickedRecipe) => {
  const recipe = await getRecipe(clickedRecipe);
  const nutrientPredictions = await getNutrientPredictions(clickedRecipe.title)

  return {
    title: recipe.title,
    publisher: recipe.publisher,
    id: recipe.id,
    servings: recipe.servings,
    updatedServings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    updatedIngredients: recipe.ingredients,
    nutrientPredictions: nutrientPredictions
  };
};

const updateServingsHelper = (recipeToUpdate, updatedServings) => {
  const updatedIngredients = calculateIngredientsAfterServingsUpdate(recipeToUpdate, updatedServings);

  return {
    title: recipeToUpdate.title,
    publisher: recipeToUpdate.publisher,
    id: recipeToUpdate.id,
    servings: recipeToUpdate.servings,
    updatedServings: updatedServings,
    cookingTime: recipeToUpdate.cookingTime,
    ingredients: recipeToUpdate.ingredients,
    updatedIngredients: updatedIngredients,
  };
};

const decreaseServingsHelper = (recipeToDecreaseServings) => {
  const updatedIngredients = calculateIngredientsAfterServingsUpdate(recipeToDecreaseServings, recipeToDecreaseServings.updatedServings - 1);

  return {
    title: recipeToDecreaseServings.title,
    publisher: recipeToDecreaseServings.publisher,
    id: recipeToDecreaseServings.id,
    servings: recipeToDecreaseServings.servings,
    updatedServings: recipeToDecreaseServings.updatedServings - 1,
    cookingTime: recipeToDecreaseServings.cookingTime,
    ingredients: recipeToDecreaseServings.ingredients,
    updatedIngredients: updatedIngredients,
  };
};

const increaseServingsHelper = (recipeToIncreaseServings) => {
  const updatedIngredients = calculateIngredientsAfterServingsUpdate(recipeToIncreaseServings, recipeToIncreaseServings.updatedServings + 1);
  
  return {
    title: recipeToIncreaseServings.title,
    publisher: recipeToIncreaseServings.publisher,
    id: recipeToIncreaseServings.id,
    servings: recipeToIncreaseServings.servings,
    updatedServings: recipeToIncreaseServings.updatedServings + 1,
    cookingTime: recipeToIncreaseServings.cookingTime,
    ingredients: recipeToIncreaseServings.ingredients,
    updatedIngredients: updatedIngredients,
  };
};

export const RecipesContext = createContext({
  searchedRecipes: [],
  // TODO: may need to place page numbers here

  currentPageNumber: 1,
  previousPageNumber: 0,
  nextPageNumber: 2,
  lastPageNumber: 0,

  displayPreviousPage: false,
  displayNextPage: false,

  displayedRecipesOnPage: [],
  // takes portion of recipeSearched for specific page number

  displayedRecipe: {},
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
  //   ],
  //   nutrientPredictions: [ predictions from nutrient predictor API ]
  // }

  displaySearchedRecipes: () => {},
  displaySearchedRecipesOnPage: () => {},
  displayRecipe: () => {},

  updateServings: () => {},
  decreaseServings: () => {},
  increaseServings: () => {},

  displayPaginationButtons: () => {},
});

export const RecipesProvider = ({ children }) => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [previousPageNumber, setPreviousPageNumber] = useState(0);
  const [nextPageNumber, setNextPageNumber] = useState(2);
  const [lastPageNumber, setLastPageNumber] = useState(0);
  const [displayPreviousPage, setDisplayPreviousPage] = useState(false);
  const [displayNextPage, setDisplayNextPage] = useState(false);

  const [displayedRecipesOnPage, setDisplayedRecipesOnPage] = useState([]);
  const [displayedRecipe, setDisplayedRecipe] = useState({});

  // pagination logic included here
  const paginationUpdate = () => {
    // (page 1 and there are no pages) recipeResultsLength < 8: both buttons are hidden
    // (page 1 and there are other pages) recipeResultsLength > 8 and currentPage === 1: previous button is hidden, next button is visible
    // (on page before than last page) recipeResultsLength > 8 and currentPage < lastPage: previous button is visible, next button is visible
    // (last page) recipeResultsLength > 8 and currentPage === lastPage: previous button is visible, next button is hidden
    const lastPageNum = Math.floor(searchedRecipes.length / RECIPES_PER_PAGE) + 1;

    if (currentPageNumber === 1 && searchedRecipes.length < RECIPES_PER_PAGE) {
      setDisplayPreviousPage(false);
      setDisplayNextPage(false);
    } else if (currentPageNumber === 1 && searchedRecipes.length > RECIPES_PER_PAGE) {
      setDisplayPreviousPage(false);
      setDisplayNextPage(true);
    } else if (currentPageNumber !== 1 && currentPageNumber < lastPageNum && searchedRecipes.length > RECIPES_PER_PAGE) {
      setDisplayPreviousPage(true);
      setDisplayNextPage(true);
    } else if (currentPageNumber !== 1 && currentPageNumber === lastPageNum && searchedRecipes.length > RECIPES_PER_PAGE) {
      setDisplayPreviousPage(true);
      setDisplayNextPage(false);
    }
  };

  useEffect(() => {
    setDisplayedRecipesOnPage(displaySearchedRecipesOnPageHelper(searchedRecipes, currentPageNumber));
    setLastPageNumber(Math.floor(searchedRecipes.length / RECIPES_PER_PAGE) + 1);

    // pagination logic
    
    if (searchedRecipes.length !== 0) {
      paginationUpdate();
    }
  }, [currentPageNumber, searchedRecipes]);

  const displaySearchedRecipes = async (recipeNameSearched) => {
    // full recipes list
    const returnedRecipes = await displaySearchedRecipesHelper(searchedRecipes, recipeNameSearched);
    setSearchedRecipes(returnedRecipes);

    // first displayed recipe
    const displayRecipe = {
      id: returnedRecipes[0].id,
      title: returnedRecipes[0].title
    };

    const firstDisplayedRecipe = await displayRecipeHelper(searchedRecipes, displayRecipe);
    setDisplayedRecipe(firstDisplayedRecipe);
  };

  const displaySearchedRecipesOnPage = (pageNumber) => {
    // display recipe for page number 1
    setCurrentPageNumber(1);
    setDisplayedRecipesOnPage(displaySearchedRecipesOnPageHelper(searchedRecipes, pageNumber));
  };

  const displayRecipe = async (clickedRecipe) => {
    const recipe = await displayRecipeHelper(searchedRecipes, clickedRecipe);

    setDisplayedRecipe(recipe);
  };

  const updateServings = (recipeToUpdate, updatedServings) => {
    setDisplayedRecipe(updateServingsHelper(recipeToUpdate, updatedServings));
  };

  const decreaseServings = (recipeToDecreaseServings) => {
    setDisplayedRecipe(decreaseServingsHelper(recipeToDecreaseServings));
  };

  const increaseServings = (recipeToIncreaseServings) => {
    setDisplayedRecipe(increaseServingsHelper(recipeToIncreaseServings));
  };

  const displayPaginationButtons = (nextOrPrevious) => {
    if (nextOrPrevious === PAGINATION_BUTTONS.next) {
      setPreviousPageNumber(previousPageNumber + 1);
      setCurrentPageNumber(currentPageNumber + 1);
      setNextPageNumber(nextPageNumber + 1);
    } else if (nextOrPrevious === PAGINATION_BUTTONS.previous) {
      setPreviousPageNumber(previousPageNumber - 1);
      setCurrentPageNumber(currentPageNumber - 1);
      setNextPageNumber(nextPageNumber - 1);
    }
  };

  const value = { searchedRecipes, displaySearchedRecipes, 
                  currentPageNumber, setCurrentPageNumber, displayedRecipesOnPage, displaySearchedRecipesOnPage,
                  updateServings, decreaseServings, increaseServings,
                  displayedRecipe, displayRecipe,
                  previousPageNumber, nextPageNumber, lastPageNumber, displayPreviousPage, displayNextPage,
                  setPreviousPageNumber, setNextPageNumber, setDisplayPreviousPage, setDisplayNextPage, displayPaginationButtons };

  return (
    <RecipesContext.Provider
      value={ value }>
      { children }
    </RecipesContext.Provider>
  );
};

