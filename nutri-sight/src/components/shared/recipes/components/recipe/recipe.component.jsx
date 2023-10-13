import "./recipe.styles.scss";

import Servings from "./servings/servings.component";
import Ingredients from "./ingredients/ingredients.component";

const Recipe = ({ currentDisplayedRecipe }) => {
  return (
    <div className="recipe-container">
      <Servings currentDisplayedRecipe={ currentDisplayedRecipe }></Servings>

      <div className="recipe-ingredients-container">
        <Ingredients currentDisplayedRecipe={ currentDisplayedRecipe }></Ingredients>
      </div>
    </div>
  )
};

export default Recipe;