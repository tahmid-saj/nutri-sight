import "./recipe.styles.scss";

import Servings from "./servings/servings.component";
import Ingredients from "./ingredients/ingredients.component";

const Recipe = () => {
  return (
    <div className="recipe-container">
      <Servings></Servings>
      <Ingredients></Ingredients>
    </div>
  )
};

export default Recipe;