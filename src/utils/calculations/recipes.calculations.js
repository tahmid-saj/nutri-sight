// recipes calculations

export const calculateIngredientsAfterServingsUpdate = (recipeToUpdate, updatedServings) => {
  const originalServings = recipeToUpdate.servings;

  const updatedIngredients = recipeToUpdate.ingredients.map((ingredient) => {
    if (ingredient.quantity === null || ingredient.quantity === undefined) {
      return ingredient;
    }

    console.log(updatedServings / originalServings);

    return {
      ...ingredient,

      quantity: (ingredient.quantity * (updatedServings / originalServings)),
    }
  });

  return updatedIngredients;
};