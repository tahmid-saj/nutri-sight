import "./recipes.styles.jsx"
import { SearchResultsRecipeContainer, SearchResultsMainContainer } from "./recipes.styles.jsx";

import React, { Fragment, Component, useEffect, useContext } from "react";

import Header from "../../../components/shared/recipes/components/header/header.component.jsx";
import SearchResults from "../../../components/shared/recipes/components/search-results/search-results.component.jsx";
import Recipe from "../../../components/shared/recipes/components/recipe/recipe.component.jsx";
import RecipesView from "../../../components/shared/recipes/components/recipes-view/recipes-view.component.jsx";

import { RecipesContext } from "../../../contexts/shared/recipes/recipes.context.js";
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
