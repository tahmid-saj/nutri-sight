import React, { Fragment } from "react";

import SearchResults from "../search-results/search-results.component";
import Recipe from "../recipe/recipe.component";

const RecipesView = ({ currentDisplayedRecipe }) => {
  return (
    <Fragment>
      <Recipe currentDisplayedRecipe={ currentDisplayedRecipe }></Recipe>
    </Fragment>
  )
};

export default RecipesView;
