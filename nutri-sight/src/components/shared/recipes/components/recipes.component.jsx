import React, { Fragment, Component } from "react";

import Header from "./header/header.component";
import SearchResults from "./search-results/search-results.component";
import Recipe from "./recipe/recipe.component";
import RecipesView from "./recipes-view/recipes-view.component";

const TIMEOUT_SEC = 10;

class Recipes extends Component {
  constructor() {
    super();

    this.state = {
      displayRecipeView: false,
      recipesSearched: undefined
    }
  }

  displayRecipeViewHandler = async (recipeName, recipesSearched) => {
    console.log(recipeName);

    await (this.state.recipesSearched = recipesSearched);
    console.log(this.state.recipesSearched);

    this.setState({ displayRecipeView: true });
  };

  timeout = (seconds) => {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${seconds} seconds`));
      }, seconds * 1000);
    });
  };

  updateSearchResults = async (recipeSearched) => {
    try {
      const fetchPromise = fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipeSearched}`);
      const res = await Promise.race([fetchPromise, this.timeout(TIMEOUT_SEC)]);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(`${data.message} (${data.status})`);
      }
      
      console.log(this.state.recipesSearched);

      return data.data.recipes;
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Fragment>
        <Header displayRecipeViewHandler={ this.displayRecipeViewHandler } 
                updateSearchResults={ this.updateSearchResults }></Header>
  
        <div className="search-results-recipe-container">
          { this.state.displayRecipeView && this.state.recipesSearched !== undefined &&
            this.state.displayRecipeView === true &&       
          
          <Fragment>
              <SearchResults recipesSearched={ this.state.recipesSearched }></SearchResults>
              <RecipesView></RecipesView> 
          </Fragment>
          }
        </div>
      </Fragment>
    );
  }

};

export default Recipes;
