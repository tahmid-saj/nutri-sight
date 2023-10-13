import React, { Component } from "react";

import "./search-results.styles.scss";

import Pagination from "../pagination/pagination.component";
import SearchResult from "../search-result/search-result.component";

const RECIPES_PER_PAGE = 8;

class SearchResults extends Component {
  formatRecipesSearched = () => {

  };

  constructor({ recipesSearched }) {
    super();

    this.state = {
      currentPage: 1,
      recipeResults: recipesSearched
    }

    this.formatRecipesSearched();
  };


  render() {
    return (
      <div className="search-results-pagination-container">
        <div className="search-results-container">
          {
            this.state.recipeResults.slice((this.state.currentPage - 1) * RECIPES_PER_PAGE, RECIPES_PER_PAGE)
                .map((recipe) => {
              return (
                <SearchResult key={ recipe.id } recipe={ recipe }/>
              )
            })
          }

        </div>
  
        <Pagination></Pagination>
      </div>
    )
  };
};

export default SearchResults;