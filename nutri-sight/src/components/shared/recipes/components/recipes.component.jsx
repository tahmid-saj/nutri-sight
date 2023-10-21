import React, { Fragment, Component, useEffect, useContext } from "react";

import Header from "./header/header.component";
import SearchResults from "./search-results/search-results.component";
import Recipe from "./recipe/recipe.component";
import RecipesView from "./recipes-view/recipes-view.component";

import { RecipesContext } from "../../../../contexts/shared/recipes/recipes.context";

const Recipes = () => {
  const { displayedRecipe, displayedRecipesOnPage } = useContext(RecipesContext);

  return (
    <Fragment>
      <Header></Header>

      <div className="search-results-recipe-container">
        { 
          displayedRecipesOnPage.length !== 0 &&
          <Fragment>
            <div 
              className="search-results-main-container"
              >
              {
                  <SearchResults></SearchResults>
              }
            </div>
              {
                displayedRecipe !== undefined && displayedRecipe !== null &&
                <RecipesView ></RecipesView>
              }
                            
          </Fragment>
        }
      </div>
    </Fragment>
  );
};

export default Recipes;
