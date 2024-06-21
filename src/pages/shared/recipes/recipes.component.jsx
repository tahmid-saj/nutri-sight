import "./recipes.styles.jsx"
import { SearchResultsRecipeContainer, SearchResultsMainContainer } from "./recipes.styles.jsx";

import React, { Fragment, Component, useEffect, useContext } from "react";

import Header from "../../../components/shared/recipes/components/header/header.component.jsx";
import SearchResults from "../../../components/shared/recipes/components/search-results/search-results.component.jsx";
import Recipe from "../../../components/shared/recipes/components/recipe/recipe.component.jsx";
import RecipesView from "../../../components/shared/recipes/components/recipes-view/recipes-view.component.jsx";

import { RecipesContext } from "../../../contexts/shared/recipes/recipes.context.js";
import { Divider, Typography } from "@mui/material";
import { COLOR_CODES } from "../../../utils/constants/shared.constants.js";

const Recipes = () => {
  const { displayedRecipe, displayedRecipesOnPage } = useContext(RecipesContext);

  return (
    <Fragment>
      <SearchResultsRecipeContainer>
      <Typography sx={{ display: "flex", justifyContent: "center", color: COLOR_CODES.general["6"] }} 
        variant="h6">Search some recipes</Typography>
      <Header></Header>

      <br></br>

        { 
          displayedRecipesOnPage.length !== 0 &&
          <div className="container">
            <SearchResultsMainContainer>
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <SearchResults></SearchResults>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-6">
                  {
                    displayedRecipe !== undefined && displayedRecipe !== null &&
                    <RecipesView ></RecipesView>
                  }
                </div>
              </div>
            </SearchResultsMainContainer>
          </div>
        }
      </SearchResultsRecipeContainer>
    </Fragment>
  );
};

export default Recipes;
