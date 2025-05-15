import { errorOnDisplaySearchedRecipes } from "../errors/recipes.errors";

// API requests for recipes

export const getRecipes = async (recipe: string): Promise<any> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_RECIPES_RECIPES}`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: String(recipe)
    })
    const resJSON = await response.json()

    return resJSON.recipes
  } catch (error) {
    
    errorOnDisplaySearchedRecipes(recipe)
  }
};

export const getRecipe = async (recipe: any): Promise<any> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_RECIPES_RECIPE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recipe)
    })
    const resJSON = await response.json()

    return resJSON.recipe
  } catch (error) {
    
    errorOnDisplaySearchedRecipes(recipe)
  }
};

