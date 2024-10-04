import { ReactNode } from "react";
import { NutrientPrediction } from "../nutrient-predictor/nutrient-predictor.types"

export interface RecipesContextType {
  searchedRecipes: any;

  currentPageNumber: number;
  previousPageNumber: number;
  nextPageNumber: number;
  lastPageNumber: number;

  displayPreviousPage: boolean;
  displayNextPage: boolean;

  displayedRecipesOnPage: any;

  displayedRecipe: RecipeInfo | undefined;

  displaySearchedRecipes: (recipeNameSearched: string) => void;
  displaySearchedRecipesOnPage: (pageNumber: number) => void;
  displayRecipe: (clickedRecipe: RecipeInfo) => void

  updateServings: (recipeToUpdate: RecipeInfo, updatedServings: number) => void;
  decreaseServings: (recipeToDecreaseServings: RecipeInfo) => void;
  increaseServings: (recipeToIncrease: RecipeInfo) => void;

  displayPaginationButtons: (nextOrPrevious: string) => void
}

export interface RecipesProviderProps {
  children: ReactNode;
}

export type RecipeInfo = {
  title: string;
  publisher: string;
  id: string;
  updatedServings: number;
  servings?: number;
  cookingTime: number;
  ingredients: Ingredient[];
  updatedIngredients?: Ingredient[];
  nutrientPredictions?: NutrientPrediction[]
}

export type Ingredient = {
  quantity: number;
  unit: string;
  description: string;
}