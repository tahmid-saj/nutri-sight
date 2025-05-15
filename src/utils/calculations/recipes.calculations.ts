// recipes calculations

import { RecipeInfo } from "../../contexts/shared/recipes/recipes.types";

export const calculateIngredientsAfterServingsUpdate = (recipeToUpdate: RecipeInfo, updatedServings: number) => {
  const originalServings = recipeToUpdate.servings;

  const updatedIngredients = recipeToUpdate.ingredients.map((ingredient) => {
    if (ingredient.quantity === null || ingredient.quantity === undefined) {
      return ingredient;
    }

    

    return {
      ...ingredient,

      quantity: (ingredient.quantity * (updatedServings / originalServings!)),
    }
  });

  return updatedIngredients;
};