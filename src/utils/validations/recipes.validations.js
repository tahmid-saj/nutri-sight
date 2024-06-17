// validations for recipes

import { errorOnInvalidSearchedRecipe } from "../errors/recipes.errors";
import { REGEX_PATTERNS } from "./regex.constants";

export const validateRecipeNameSearched = (recipeNameSearched) => {
  if (!REGEX_PATTERNS.search.test(recipeNameSearched)) {

    errorOnInvalidSearchedRecipe();
    
    return true;
  }

  return false;
};