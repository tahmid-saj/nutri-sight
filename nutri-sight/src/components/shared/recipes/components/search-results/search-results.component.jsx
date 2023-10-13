import React, { Component } from "react";

import "./search-results.styles.scss";

import Pagination from "../pagination/pagination.component";
import SearchResult from "../search-result/search-result.component";

class SearchResults extends Component {
  constructor({ recipesSearched }) {
    super();

    this.state = {
      currentPage: 1,
      recipeResults: recipesSearched
    }
  };


  render() {
    return (
      <div className="search-results-pagination-container">
        <div className="search-results-container">
          {
            this.state.recipeResults.map((recipe) => {
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