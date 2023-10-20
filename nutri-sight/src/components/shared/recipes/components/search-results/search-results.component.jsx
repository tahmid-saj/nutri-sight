import React, { Component, useState, useContext } from "react";

import "./search-results.styles.scss";

import Pagination from "../pagination/pagination.component";
import SearchResult from "../search-result/search-result.component";

import { RecipesContext } from "../../../../../contexts/shared/recipes/recipes.context";

const RECIPES_PER_PAGE = 8;

const SearchResults = () => {
  const { displayedRecipesOnPage } = useContext(RecipesContext)

  // constructor({ recipesSearched, updateCurrentRecipe }) {
  //   super();

  //   this.state = {
  //     currentPage: 1,
  //     recipeResults: recipesSearched,
  //     recipeResultsLength: recipesSearched.length,
  //     lastPage: Math.ceil(recipesSearched.length / RECIPES_PER_PAGE),
  //     updateCurrentRecipe: updateCurrentRecipe
  //   }

  //   console.log(this.state.recipeResults);
  // };

  // updateSearchResultsPage = (currentPage) => {
  //   this.setState({ currentPage: currentPage });
  //   console.log(currentPage);
  // };

  // render() {
  return (
    <div className="search-results-pagination-container">
      <div className="search-results-container">
        {
          //this.state.recipeResults.slice((this.state.currentPage - 1) * RECIPES_PER_PAGE, (this.state.currentPage) * RECIPES_PER_PAGE)
          //    .map((recipe) => {
          //  return (
          //    <SearchResult key={ recipe.id } recipe={ recipe } 
          //                  updateCurrentRecipe={ this.state.updateCurrentRecipe }/>
          //  )
          //})

          displayedRecipesOnPage.map((recipe, index) => {
            return <SearchResult key={ recipe.id } recipe={ recipe }></SearchResult>
          })
        }

      </div>

      
      <Pagination></Pagination>

      
    </div>
  )
  // };
};

class SearchResults2 extends Component {
  constructor({ recipesSearched, updateCurrentRecipe }) {
    super();

    this.state = {
      currentPage: 1,
      recipeResults: recipesSearched,
      recipeResultsLength: recipesSearched.length,
      lastPage: Math.ceil(recipesSearched.length / RECIPES_PER_PAGE),
      updateCurrentRecipe: updateCurrentRecipe
    }

    console.log(this.state.recipeResults);
  };

  updateSearchResultsPage = (currentPage) => {
    this.setState({ currentPage: currentPage });
    console.log(currentPage);
  };

  render() {
    return (
      <div className="search-results-pagination-container">
        <div className="search-results-container">
          {
            this.state.recipeResults.slice((this.state.currentPage - 1) * RECIPES_PER_PAGE, (this.state.currentPage) * RECIPES_PER_PAGE)
                .map((recipe) => {
              return (
                <SearchResult key={ recipe.id } recipe={ recipe } 
                              updateCurrentRecipe={ this.state.updateCurrentRecipe }/>
              )
            })
          }

        </div>
  
        {
          this.state.recipeResultsLength > RECIPES_PER_PAGE &&
            <Pagination recipeResultsLength={ this.state.recipeResultsLength }
                        lastPage={ this.state.lastPage }
                        recipesPerPage={ RECIPES_PER_PAGE }
                        updateSearchResultsPage={ this.updateSearchResultsPage }></Pagination>
        }
      </div>
    )
  };
};

export default SearchResults;