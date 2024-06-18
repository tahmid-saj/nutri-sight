import "./search-results.styles"
import { SearchResultsContainer, PaginationContainer } from "./search-results.styles";

import React, { Component, useState, useContext, Fragment } from "react";
import Pagination from "../pagination/pagination.component";
import SearchResult from "../search-result/search-result.component";

import { RecipesContext } from "../../../../../contexts/shared/recipes/recipes.context";
import SimplePaper from "../../../mui/paper/paper.component";

import { RECIPES_PER_PAGE } from "../../../../../utils/constants/recipes.constants";
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants";
import { Paper } from "@mui/material";

const paperStyles = {
  searchResults: {
    backgroundColor: COLOR_CODES.general["0"]
  },
  searchResult: {
    backgroundColor: COLOR_CODES.general["0"]
  }
}

const SearchResults = () => {
  const { displayedRecipesOnPage } = useContext(RecipesContext)

  return (
    <SearchResultsContainer>
      <SimplePaper styles={ paperStyles.searchResults }>
        {
          displayedRecipesOnPage.map((recipe, index) => {
            return (
              <Paper styles={ paperStyles.searchResult }>
                <SearchResult key={ recipe.id } recipe={ recipe }></SearchResult>
              </Paper>
            )
          })
        }
      </SimplePaper>
      
      {/* <PaginationContainer> */}
        <Pagination></Pagination>
      {/* </PaginationContainer> */}
    </SearchResultsContainer>
  )
};


export default SearchResults;