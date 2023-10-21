import React, { Component, useState, useContext } from "react";

import "./search-results.styles.scss";

import Pagination from "../pagination/pagination.component";
import SearchResult from "../search-result/search-result.component";

import { RecipesContext } from "../../../../../contexts/shared/recipes/recipes.context";

import { RECIPES_PER_PAGE } from "../../../../../utils/constants/recipes.constants";

const SearchResults = () => {
  const { displayedRecipesOnPage } = useContext(RecipesContext)

  return (
    <div className="search-results-pagination-container">
      <div className="search-results-container">
        {
          displayedRecipesOnPage.map((recipe, index) => {
            return <SearchResult key={ recipe.id } recipe={ recipe }></SearchResult>
          })
        }

      </div>
      
      <Pagination></Pagination>
      
    </div>
  )
};


export default SearchResults;