import "./search-result.styles.jsx";
import { SearchResultContainer } from "./search-result.styles.jsx";

import { useContext } from "react";
import { RecipesContext } from "../../../../../contexts/shared/recipes/recipes.context";
import { Typography } from "@mui/material";

const SearchResult = ({ recipe }) => {
  const { displayRecipe } = useContext(RecipesContext);

  const handleClick = async (event) => {
    event.preventDefault();

    const clickedRecipe = {
      id: recipe.id,
      title: recipe.title,
    };

    displayRecipe(clickedRecipe);
  }

  return (
    <SearchResultContainer onClick={ handleClick }>
      <Typography variant="subtitle1">{`${recipe.title}`}</Typography>
      <Typography variant="body2">{`${recipe.publisher}`}</Typography>
    </SearchResultContainer>
  )
};

export default SearchResult;