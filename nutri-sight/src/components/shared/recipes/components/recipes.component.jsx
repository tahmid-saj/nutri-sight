import React, { Fragment } from "react";

import Header from "./header/header.component";
import SearchResults from "./search-results/search-results.component";
import Recipe from "./recipe/recipe.component";
import RecipesView from "./recipes-view/recipes-view.component";

const Recipes = () => {
  return (
    <Fragment>
      <Header></Header>

      <div className="search-results-recipe-container">
        <RecipesView></RecipesView>
      </div>
    </Fragment>
  );
};

export default Recipes;
