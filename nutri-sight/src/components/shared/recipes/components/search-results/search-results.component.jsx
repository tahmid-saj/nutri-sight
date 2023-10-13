import React, { Component } from "react";

import "./search-results.styles.scss";

import Pagination from "../pagination/pagination.component";
import SearchResult from "../search-result/search-result.component";

const RECIPES_PER_PAGE = 8;

class SearchResults extends Component {
  constructor({ recipesSearched }) {
    super();

    this.state = {
      recipeResults: recipesSearched,
      recipeResultsLength: recipesSearched.length,
      lastPage: Math.ceil(recipesSearched.length / RECIPES_PER_PAGE),
    }
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
  
        {
          this.state.recipeResultsLength > RECIPES_PER_PAGE &&
            <Pagination recipeResultsLength={ this.state.recipeResultsLength }
                        lastPage={ this.state.lastPage }
                        recipesPerPage={ RECIPES_PER_PAGE }></Pagination>
        }
      </div>
    )
  };
};

export default SearchResults;