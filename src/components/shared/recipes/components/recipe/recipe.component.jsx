import "./recipe.styles.jsx";
import { RecipeContainer } from "./recipe.styles.jsx";

import { Component, useState, useContext } from "react";
import Servings from "./servings/servings.component";
import Ingredients from "./ingredients/ingredients.component";
import NutrientPrediction from "./nutrient-prediction/nutrient-prediction.component.jsx";

import SimplePaper from "../../../mui/paper/paper.component.jsx";
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants.js";
import OutlinedCard from "../../../mui/card/card.component.jsx";

import { RecipesContext } from "../../../../../contexts/shared/recipes/recipes.context.js";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["6"]
}

const cardStyles = {
  backgroundColor: COLOR_CODES.general["6"],
  margin: "1% 0% 1% 0%"
}

const nutrientPredictionCardStyles = {
  backgroundColor: COLOR_CODES.general["6"],
  margin: "1% 0% 1% 0%",
  overflow: "scroll",
  height: "70rem",
  scrollbarColor: `${COLOR_CODES.scrollbar.scroll} ${COLOR_CODES.scrollbar.background}`,
  scrollbarWidth: "thin"
}

const Recipe = () => {
  const { displayedRecipe } = useContext(RecipesContext)

  return (
    <RecipeContainer>
      <SimplePaper styles={ paperStyles }>
        <Servings></Servings>
      </SimplePaper>

      <OutlinedCard styles={ cardStyles }>
        <Ingredients></Ingredients>
      </OutlinedCard>

      {
        displayedRecipe.nutrientPredictions !== undefined && displayedRecipe.nutrientPredictions.length !== 0 ? (
        <OutlinedCard styles={ nutrientPredictionCardStyles }>
          <NutrientPrediction></NutrientPrediction>
        </OutlinedCard>) : null
      }
    </RecipeContainer>
  )
}

export default Recipe;