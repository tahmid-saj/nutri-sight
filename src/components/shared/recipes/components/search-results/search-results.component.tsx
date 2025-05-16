import "./search-results.styles.tsx"
import { SearchResultsContainer, SearchResultContainer,
  PaginationContainer 
} from "./search-results.styles.tsx";

import React, { Component, useState, useContext, Fragment } from "react";
import Pagination from "../pagination/pagination.component.tsx";
import SearchResult from "../search-result/search-result.component.tsx";

import { RecipesContext } from "../../../../../contexts/shared/recipes/recipes.context.tsx";
import SimplePaper from "../../../mui/paper/paper.component.tsx";

import { RECIPES_PER_PAGE } from "../../../../../utils/constants/recipes.constants.ts";
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants.ts";
import { Paper } from "@mui/material";

const paperStyles = {
  searchResults: {
    backgroundColor: COLOR_CODES.general["2"]
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
                <SearchResultContainer>
                    <SearchResult key={ recipe.id } recipe={ recipe }></SearchResult>
                </SearchResultContainer>
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