import { errorOnDisplaySearchedRecipes } from "../errors/recipes.errors";

import { TIMEOUT_SEC } from "../constants/recipes.constants";

// API requests for recipes

// helpers functions

const timeout = (seconds) => {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${seconds} seconds`));
    }, seconds * 1000);
  });
};

// requests

export const getRecipes = async (recipe) => {
  try {
    console.log(`${process.env.REACT_APP_RECIPES_URL}${recipe}?${process.env.REACT_APP_RECIPES_API_KEY_NAME}${process.env.REACT_APP_RECIPES_API_KEY}`);
    const fetchPromiseRecipes = fetch(`${process.env.REACT_APP_RECIPES_URL}${recipe}?${process.env.REACT_APP_RECIPES_API_KEY_NAME}${process.env.REACT_APP_RECIPES_API_KEY}`)
    const resRecipes = await Promise.race([fetchPromiseRecipes, timeout(TIMEOUT_SEC)]);
    const dataRecipes = await resRecipes.json();

    if (!resRecipes.ok) {
      throw new Error(`${dataRecipes.message} (${dataRecipes.status})`);
    }

    return dataRecipes.data.recipes;
  } catch (error) {
    errorOnDisplaySearchedRecipes(recipe);
    console.log(error);
  }
};

export const getRecipe = async (recipe) => {
  try {
    const fetchPromiseRecipe = fetch(`${process.env.REACT_APP_RECIPE_URL}${recipe.id}?${process.env.REACT_APP_RECIPES_API_KEY_NAME}${process.env.REACT_APP_RECIPES_API_KEY}`);
    const resRecipe = await Promise.race([fetchPromiseRecipe, timeout(TIMEOUT_SEC)]);
    const dataRecipe = await resRecipe.json();

    if (!resRecipe.ok) {
      throw new Error(`${dataRecipe.message} (${dataRecipe.status})`);
    }

    return dataRecipe.data.recipe;
  } catch (error) {
    errorOnDisplaySearchedRecipes(recipe.title);
    console.log(error);
  }
};

