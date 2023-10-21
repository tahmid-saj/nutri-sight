import { useContext } from "react";

import "./search-result.styles.scss";

import { RecipesContext } from "../../../../../contexts/shared/recipes/recipes.context";

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
    <div className="search-result-container" onClick={ handleClick }>
      <h3>{`${recipe.title}`}</h3>
      <h5>{`${recipe.publisher}`}</h5>
    </div>
  )
};

export default SearchResult;