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
      recipesSearched: undefined,
      currentDisplayedRecipe: undefined,
      currentDisplayedRecipeName: ""
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
      const fetchPromiseRecipes = fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipeSearched}`);
      const resRecipes = await Promise.race([fetchPromiseRecipes, this.timeout(TIMEOUT_SEC)]);
      const dataRecipes = await resRecipes.json();

      if (!resRecipes.ok) {
        throw new Error(`${dataRecipes.message} (${dataRecipes.status})`);
      }
      
      console.log(this.state.recipesSearched);

      const fetchPromiseRecipe = fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${dataRecipes.data.recipes[0].id}`)
      const resRecipe = await Promise.race([fetchPromiseRecipe, this.timeout(TIMEOUT_SEC)]);
      const dataRecipe = await resRecipe.json();

      if (!resRecipe.ok) {
        throw new Error(`${dataRecipe.message} (${dataRecipe.status})`);
      }

      await (this.state.currentDisplayedRecipe = dataRecipe.data.recipe);
      await (this.state.currentDisplayedRecipeName = dataRecipes.data.recipes[0].title);
      console.log(this.state.currentDisplayedRecipe);

      return dataRecipes.data.recipes;
    } catch (error) {
      console.log(error);
    }
  };

  updateCurrentRecipe = async (recipe) => {
    try {
      const fetchPromiseRecipe = fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipe.id}`)
      const resRecipe = await Promise.race([fetchPromiseRecipe, this.timeout(TIMEOUT_SEC)]);
      const dataRecipe = await resRecipe.json();

      if (!resRecipe.ok) {
        throw new Error(`${dataRecipe.message} (${dataRecipe.status})`);
      }

      await (this.state.currentDisplayedRecipe = dataRecipe.data.recipe);
      await (this.state.currentDisplayedRecipeName = recipe.title);

      console.log(dataRecipe);

      this.setState({ displayRecipeView: true });
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
            this.state.currentDisplayedRecipe!== undefined && this.state.displayRecipeView === true &&       
          
          <Fragment>
              <SearchResults recipesSearched={ this.state.recipesSearched }
                              updateCurrentRecipe={ this.updateCurrentRecipe }></SearchResults>
              <RecipesView currentDisplayedRecipe={ this.state.currentDisplayedRecipe }
                            currentDisplayedRecipeName={ this.state.currentDisplayedRecipeName }></RecipesView> 
          </Fragment>
          }
        </div>
      </Fragment>
    );
  }

};

export default Recipes;
