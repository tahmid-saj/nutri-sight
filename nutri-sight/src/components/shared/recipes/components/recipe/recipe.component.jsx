import { Component, useState } from "react";

import "./recipe.styles.scss";

import Servings from "./servings/servings.component";
import Ingredients from "./ingredients/ingredients.component";

const Recipe = () => {
  return (
    <div className="recipe-container">
      <Servings></Servings>

      <div className="recipe-ingredients-container">
        <Ingredients></Ingredients>

      </div>
    </div>
  )
}

export default Recipe;