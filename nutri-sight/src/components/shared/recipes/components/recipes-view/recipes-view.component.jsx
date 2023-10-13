import React, { Fragment } from "react";

import SearchResults from "../search-results/search-results.component";
import Recipe from "../recipe/recipe.component";

const RecipesView = () => {
  return (
    <Fragment>
      <SearchResults></SearchResults>
      <Recipe></Recipe>
    </Fragment>
  )
};

export default RecipesView;
