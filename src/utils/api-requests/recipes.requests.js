import { errorOnDisplaySearchedRecipes } from "../errors/recipes.errors";

// API requests for recipes

export const getRecipes = async (recipe) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_RECIPES_RECIPES}`)
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
    console.log(error)
    errorOnDisplaySearchedRecipes()
  }
};

export const getRecipe = async (recipe) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_RECIPES_RECIPE}`)
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
    console.log(error)
    errorOnDisplaySearchedRecipes()
  }
};

