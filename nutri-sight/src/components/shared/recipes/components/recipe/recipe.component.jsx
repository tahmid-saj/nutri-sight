import { Component } from "react";

import "./recipe.styles.scss";

import Servings from "./servings/servings.component";
import Ingredients from "./ingredients/ingredients.component";

class Recipe extends Component {

  constructor ({ currentDisplayedRecipe, currentDisplayedRecipeName }) {
    super();

    this.state = {
      currentDisplayedRecipe: currentDisplayedRecipe,
      currentDisplayedRecipeName: currentDisplayedRecipeName,
      servingsRatio: 1
    }
  };

  updateIngredientAmounts = (servings, newServings) => {
    this.setState({ servingsRatio: newServings / servings });
  };

  render () {
    return (
      <div className="recipe-container">
        <Servings currentDisplayedRecipe={ this.state.currentDisplayedRecipe }
                  updateIngredientAmounts={ this.updateIngredientAmounts }></Servings>
  
        <div className="recipe-ingredients-container">
          <Ingredients currentDisplayedRecipe={ this.state.currentDisplayedRecipe }
                        currentDisplayedRecipeName={ this.state.currentDisplayedRecipeName }
                        servingsRatio={ this.state.servingsRatio }></Ingredients>
        </div>
      </div>
    )
  }
};

export default Recipe;