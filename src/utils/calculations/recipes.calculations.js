// recipes calculations

export const calculateIngredientsAfterServingsUpdate = (recipeToUpdate, updatedServings) => {
  const originalServings = recipeToUpdate.servings;

  const updatedIngredients = recipeToUpdate.ingredients.map((ingredient) => {
    if (ingredient.quantity === null || ingredient.quantity === undefined) {
      return ingredient;
    }

    

    return {
      ...ingredient,

      quantity: (ingredient.quantity * (updatedServings / originalServings)),
    }
  });

  return updatedIngredients;
};