import { useContext } from "react";

import "./ingredients.styles.scss";

import { RecipesContext } from "../../../../../../contexts/shared/recipes/recipes.context";

const Ingredients = ({ 
                    // currentDisplayedRecipe, currentDisplayedRecipeName, servingsRatio 
                  }) => {
  // const { ingredients } = currentDisplayedRecipe;

  const { displayedRecipe } = useContext(RecipesContext);

  return (
    <div className="ingredients-container">
      <h2>Recipe Ingredients</h2>
      <h3>{`${displayedRecipe.title}`}</h3>

      <div className="ingredient-quantities-container">
        {
          displayedRecipe !== undefined && 
          displayedRecipe.ingredients !== undefined && displayedRecipe.ingredients.length !== 0 &&
          displayedRecipe.updatedIngredients !== undefined && displayedRecipe.updatedIngredients.length !== 0 &&
          displayedRecipe.updatedIngredients.map((ingredient, index) => {
            return (
              // <h4 key={ index }>{`${ingredient.quantity !== null ? (servingsRatio * ingredient.quantity) : ""} ${ingredient.unit} ${ingredient.description}`}</h4>
              <h4 key={ index }>{`${ingredient.quantity !== null ? (ingredient.quantity) : ""} ${ingredient.unit} ${ingredient.description}`}</h4>
            )
          })
        }


      </div>
    </div>
  )
};

export default Ingredients;
