// validations for recipes

import { errorOnInvalidSearchedRecipe } from "../errors/recipes.errors";

export const validateRecipeNameSearched = (recipeNameSearched) => {
  if (!/\S/.test(recipeNameSearched)) {

    errorOnInvalidSearchedRecipe();
    
    return true;
  }

  return false;
};