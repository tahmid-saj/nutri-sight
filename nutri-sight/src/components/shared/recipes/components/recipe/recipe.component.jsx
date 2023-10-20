
import { Component, useState } from "react";


import "./recipe.styles.scss";

import Servings from "./servings/servings.component";
import Ingredients from "./ingredients/ingredients.component";


const Recipe = ({ 
                  // currentDisplayedRecipe, currentDisplayedRecipeName, 
                  // handleServingsUpdate 
                }) => {

  // const [servingsRatio, setServingsRatio] = useState(1);

  // const updateIngredients = (originalServings, updatedServings) => {
  //   setServingsRatio(updatedServings / originalServings);
  // };

  return (
    <div className="recipe-container">
      <Servings 
                // currentDisplayedRecipe={ currentDisplayedRecipe }
                // updateIngredients={ updateIngredients }
                ></Servings>

      <div className="recipe-ingredients-container">
        <Ingredients 
                      // currentDisplayedRecipe={ currentDisplayedRecipe }
                      // currentDisplayedRecipeName={ currentDisplayedRecipeName }
                      // handleServingsUpdate={ handleServingsUpdate }
                      // servingsRatio={ servingsRatio }
                      ></Ingredients>

      </div>
    </div>
  )
}

const Recipe2 = ({ currentDisplayedRecipe, currentDisplayedRecipeName, 
                  handleServingsUpdate }) => {

  const [servingsRatio, setServingsRatio] = useState(1);

  const updateIngredients = (originalServings, updatedServings) => {
    setServingsRatio(updatedServings / originalServings);
  };

  return (
    <div className="recipe-container">
      <Servings currentDisplayedRecipe={ currentDisplayedRecipe }
                updateIngredients={ updateIngredients }></Servings>

      <div className="recipe-ingredients-container">
        <Ingredients currentDisplayedRecipe={ currentDisplayedRecipe }
                      currentDisplayedRecipeName={ currentDisplayedRecipeName }
                      handleServingsUpdate={ handleServingsUpdate }
                      servingsRatio={ servingsRatio }></Ingredients>

      </div>
    </div>
  )
}

class RecipeClass extends Component {
  constructor ({ currentDisplayedRecipe, currentDisplayedRecipeName }) {
    super();

    this.state = {
      currentDisplayedRecipe: currentDisplayedRecipe,
      currentDisplayedRecipeName: currentDisplayedRecipeName,
    };
  };

  render = () => {
    return (
      <div className="recipe-container">
        <Servings currentDisplayedRecipe={ this.state.currentDisplayedRecipe }></Servings>

        <div className="recipe-ingredients-container">
          <Ingredients currentDisplayedRecipe={ this.state.currentDisplayedRecipe }
                        currentDisplayedRecipeName={ this.state.currentDisplayedRecipeName }></Ingredients>
        </div>
      </div>
    )
  };
};

export default Recipe;