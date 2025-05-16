import "./search-result.styles.tsx";
import { RecipeResult } from "./search-result.styles.tsx";

import { MouseEvent, useContext } from "react";
import { RecipesContext } from "../../../../../contexts/shared/recipes/recipes.context.tsx";
import { Typography } from "@mui/material";
import { RecipePartialInfo } from "../../../../../contexts/shared/recipes/recipes.types.js";

const SearchResult = ({ recipe }: { recipe: any }) => {
  const { displayRecipe } = useContext(RecipesContext);

  const handleClick = async (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    const clickedRecipe: RecipePartialInfo = {
      id: recipe.id,
      title: recipe.title,
    };

    displayRecipe(clickedRecipe);
  }

  return (
    <RecipeResult onClick={ handleClick }>
      <Typography variant="subtitle1">{`${recipe.title}`}</Typography>
      <Typography variant="body2">{`${recipe.publisher}`}</Typography>
    </RecipeResult>
  )
};

export default SearchResult;