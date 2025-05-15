// errors on recipes

export const errorOnDisplaySearchedRecipes = (recipeNameSearched: string) => {
  alert(`${recipeNameSearched} could not be found`);
};

export const errorOnInvalidSearchedRecipe = () => {
  alert("Invalid searched recipe name");
};