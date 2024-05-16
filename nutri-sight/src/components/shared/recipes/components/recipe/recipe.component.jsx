import "./recipe.styles.jsx";
import { RecipeContainer } from "./recipe.styles.jsx";

import { Component, useState } from "react";
import Servings from "./servings/servings.component";
import Ingredients from "./ingredients/ingredients.component";

import SimplePaper from "../../../mui/paper/paper.component.jsx";
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants.js";
import OutlinedCard from "../../../mui/card/card.component.jsx";

const paperStyles = {
  backgroundColor: COLOR_CODES.paper.formPaper
}

const cardStyles = {
  backgroundColor: COLOR_CODES.card.infoCard,
  margin: "1% 0% 1% 0%"
}

const Recipe = () => {
  return (
    <RecipeContainer>
      <SimplePaper styles={ paperStyles }>
        <Servings></Servings>
      </SimplePaper>

      <OutlinedCard styles={ cardStyles }>
        <Ingredients></Ingredients>
      </OutlinedCard>
    </RecipeContainer>
  )
}

export default Recipe;