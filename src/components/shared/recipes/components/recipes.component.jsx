import "./recipes.styles.jsx"
import { SearchResultsRecipeContainer, SearchResultsMainContainer } from "./recipes.styles.jsx";

import React, { Fragment, Component, useEffect, useContext } from "react";

import Header from "./header/header.component";
import SearchResults from "./search-results/search-results.component";
import Recipe from "./recipe/recipe.component";
import RecipesView from "./recipes-view/recipes-view.component";

import { RecipesContext } from "../../../../contexts/shared/recipes/recipes.context";
import { Divider, Typography } from "@mui/material";

const Recipes = () => {
  const { displayedRecipe, displayedRecipesOnPage } = useContext(RecipesContext);

  return (
    <Fragment>
      <SearchResultsRecipeContainer>
      <Typography sx={{ display: "flex", justifyContent: "center" }} variant="h6">Search some recipes</Typography>
      <Header></Header>

      <Divider sx={{ marginRight: "2%" }}/>

        { 
          displayedRecipesOnPage.length !== 0 &&
          <SearchResultsMainContainer>
              <SearchResults></SearchResults>
              {
                displayedRecipe !== undefined && displayedRecipe !== null &&
                <RecipesView ></RecipesView>
              }
          </SearchResultsMainContainer>
        }
      </SearchResultsRecipeContainer>
    </Fragment>
  );
};

export default Recipes;
