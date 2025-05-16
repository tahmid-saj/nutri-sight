import "./recipes.styles.tsx"
import { SearchResultsRecipeContainer, SearchResultsMainContainer } from "./recipes.styles.tsx";

import React, { Fragment, Component, useEffect, useContext } from "react";

import Header from "../../../components/shared/recipes/components/header/header.component.tsx";
import SearchResults from "../../../components/shared/recipes/components/search-results/search-results.component.tsx";
import Recipe from "../../../components/shared/recipes/components/recipe/recipe.component.tsx";
import RecipesView from "../../../components/shared/recipes/components/recipes-view/recipes-view.component.tsx";

import { RecipesContext } from "../../../contexts/shared/recipes/recipes.context.tsx";
import { Divider, Typography } from "@mui/material";
import { COLOR_CODES } from "../../../utils/constants/shared.constants.ts";

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
