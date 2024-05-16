import "./ingredients.styles.jsx";
import { IngredientsContainer, IngredientQuantitiesContainer } from "./ingredients.styles.jsx";

import { useContext } from "react";
import { RecipesContext } from "../../../../../../contexts/shared/recipes/recipes.context";
import { Typography } from "@mui/material";

const Ingredients = () => {
  const { displayedRecipe } = useContext(RecipesContext);

  return (
    <IngredientsContainer>
      <Typography variant="h5">Recipe Ingredients</Typography>
      <Typography variant="h6">{`${displayedRecipe.title}`}</Typography>

      <IngredientQuantitiesContainer>
        {
          displayedRecipe !== undefined && 
          displayedRecipe.ingredients !== undefined && displayedRecipe.ingredients.length !== 0 &&
          displayedRecipe.updatedIngredients !== undefined && displayedRecipe.updatedIngredients.length !== 0 &&
          displayedRecipe.updatedIngredients.map((ingredient, index) => {
            return (
              <Typography sx={{ padding: "1.5%" }} key={ index }>{`${ingredient.quantity !== null ? (ingredient.quantity) : ""} ${ingredient.unit} ${ingredient.description}`}</Typography>
            )
          })
        }


      </IngredientQuantitiesContainer>
    </IngredientsContainer>
  )
};

export default Ingredients;
