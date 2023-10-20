import React, { Fragment, Component, useEffect, useContext } from "react";

import Header from "./header/header.component";
import SearchResults from "./search-results/search-results.component";
import Recipe from "./recipe/recipe.component";
import RecipesView from "./recipes-view/recipes-view.component";

import { RecipesContext } from "../../../../context/shared/recipes/recipes.context";

const TIMEOUT_SEC = 10;

const Recipes = () => {

  const { searchedRecipes, displayedRecipe } = useContext(RecipesContext);

  // constructor() {
  //   super();

  //   this.state = {
  //     displayRecipeView: false,
  //     recipesSearched: undefined,
  //     currentDisplayedRecipe: undefined,
  //     currentDisplayedRecipeName: "",
  //     newSearchedRecipe: true
  //   }
  // };

  // handleSearchChange = (changeTo) => {
  //   this.setState({ newSearchedRecipe: changeTo });
  // };

  // displayRecipeViewHandler = async (recipeName, recipesSearched) => {
  //   console.log(recipeName);

  //   await (this.state.recipesSearched = recipesSearched);
  //   this.setState({ recipesSearched: recipesSearched });
  //   console.log(this.state.recipesSearched);

  //   this.setState({ displayRecipeView: true });
  // };

  // shouldComponentUpdate = () => {
  //   return true;
  // };

  // timeout = (seconds) => {
  //   return new Promise(function (_, reject) {
  //     setTimeout(function () {
  //       reject(new Error(`Request took too long! Timeout after ${seconds} seconds`));
  //     }, seconds * 1000);
  //   });
  // };

  // updateSearchResults = async (recipeSearched) => {
  //   try {
  //     const fetchPromiseRecipes = fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipeSearched}?key=6d894e60-5ddc-4e1a-9510-084ab089a4b7`);
  //     const resRecipes = await Promise.race([fetchPromiseRecipes, this.timeout(TIMEOUT_SEC)]);
  //     const dataRecipes = await resRecipes.json();

  //     if (!resRecipes.ok) {
  //       throw new Error(`${dataRecipes.message} (${dataRecipes.status})`);
  //     }
      
  //     console.log(this.state.recipesSearched);

  //     console.log(dataRecipes.data.recipes);

  //     await (this.state.recipesSearched = dataRecipes.data.recipes);

  //     const fetchPromiseRecipe = fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${dataRecipes.data.recipes[0].id}?key=6d894e60-5ddc-4e1a-9510-084ab089a4b7`)
  //     const resRecipe = await Promise.race([fetchPromiseRecipe, this.timeout(TIMEOUT_SEC)]);
  //     const dataRecipe = await resRecipe.json();

  //     if (!resRecipe.ok) {
  //       throw new Error(`${dataRecipe.message} (${dataRecipe.status})`);
  //     }

  //     await (this.state.currentDisplayedRecipe = dataRecipe.data.recipe);
  //     await (this.state.currentDisplayedRecipeName = dataRecipes.data.recipes[0].title);
  //     this.setState({ displayRecipeView: false });
  //     this.forceUpdate();
  //     console.log(this.state.currentDisplayedRecipe);

  //     return dataRecipes.data.recipes;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // updateCurrentRecipe = async (recipe) => {
  //   try {
  //     const fetchPromiseRecipe = fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipe.id}`)
  //     const resRecipe = await Promise.race([fetchPromiseRecipe, this.timeout(TIMEOUT_SEC)]);
  //     const dataRecipe = await resRecipe.json();

  //     if (!resRecipe.ok) {
  //       throw new Error(`${dataRecipe.message} (${dataRecipe.status})`);
  //     }

  //     await (this.state.currentDisplayedRecipe = dataRecipe.data.recipe);
  //     await (this.state.currentDisplayedRecipeName = recipe.title);

  //     console.log(dataRecipe);

  //     this.setState({ displayRecipeView: true });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // render = () => {
    // console.log(this.state.recipesSearched);

  return (
    <Fragment>
      <Header 
              // displayRecipeViewHandler={ this.displayRecipeViewHandler } 
              // updateSearchResults={ this.updateSearchResults }
              // handleSearchChange={ this.handleSearchChange }
              ></Header>

      <div className="search-results-recipe-container">
        { 
          // this.state.displayRecipeView && this.state.recipesSearched !== undefined && 
          // this.state.currentDisplayedRecipe !== undefined && this.state.displayRecipeView === true && 
          searchedRecipes.length !== 0 &&
          <Fragment>
            <div 
              // className={`${this.state.newSearchedRecipe === true ? "search-results-main-container" : ""}`}
              >
              {
                  // this.state.recipesSearched && this.state.newSearchedRecipe === true &&
                  <SearchResults 
                                  // recipesSearched={ this.state.recipesSearched }
                                  // updateCurrentRecipe={ this.updateCurrentRecipe }
                                  ></SearchResults>
              }
            </div>
              {
                displayedRecipe !== undefined && displayedRecipe !== null &&
                <RecipesView ></RecipesView>
              }
                            
          </Fragment>
        }
      </div>
    </Fragment>
  );
  // }
};

class Recipes2 extends Component {

  constructor() {
    super();

    this.state = {
      displayRecipeView: false,
      recipesSearched: undefined,
      currentDisplayedRecipe: undefined,
      currentDisplayedRecipeName: "",
      newSearchedRecipe: true
    }
  };

  handleSearchChange = (changeTo) => {
    this.setState({ newSearchedRecipe: changeTo });
  };

  displayRecipeViewHandler = async (recipeName, recipesSearched) => {
    console.log(recipeName);

    await (this.state.recipesSearched = recipesSearched);
    this.setState({ recipesSearched: recipesSearched });
    console.log(this.state.recipesSearched);

    this.setState({ displayRecipeView: true });
  };

  shouldComponentUpdate = () => {
    return true;
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
      const fetchPromiseRecipes = fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipeSearched}?key=6d894e60-5ddc-4e1a-9510-084ab089a4b7`);
      const resRecipes = await Promise.race([fetchPromiseRecipes, this.timeout(TIMEOUT_SEC)]);
      const dataRecipes = await resRecipes.json();

      if (!resRecipes.ok) {
        throw new Error(`${dataRecipes.message} (${dataRecipes.status})`);
      }
      
      console.log(this.state.recipesSearched);

      console.log(dataRecipes.data.recipes);

      await (this.state.recipesSearched = dataRecipes.data.recipes);

      const fetchPromiseRecipe = fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${dataRecipes.data.recipes[0].id}?key=6d894e60-5ddc-4e1a-9510-084ab089a4b7`)
      const resRecipe = await Promise.race([fetchPromiseRecipe, this.timeout(TIMEOUT_SEC)]);
      const dataRecipe = await resRecipe.json();

      if (!resRecipe.ok) {
        throw new Error(`${dataRecipe.message} (${dataRecipe.status})`);
      }

      await (this.state.currentDisplayedRecipe = dataRecipe.data.recipe);
      await (this.state.currentDisplayedRecipeName = dataRecipes.data.recipes[0].title);
      this.setState({ displayRecipeView: false });
      this.forceUpdate();
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

  render = () => {
    console.log(this.state.recipesSearched);

    return (
      <Fragment>
        <Header displayRecipeViewHandler={ this.displayRecipeViewHandler } 
                updateSearchResults={ this.updateSearchResults }
                handleSearchChange={ this.handleSearchChange }></Header>
  
        <div className="search-results-recipe-container">
          { this.state.displayRecipeView && this.state.recipesSearched !== undefined && 
            this.state.currentDisplayedRecipe !== undefined && this.state.displayRecipeView === true && 
          
          <Fragment>
            <div className={`${this.state.newSearchedRecipe === true ? "search-results-main-container" : ""}`}>
              {
                  this.state.recipesSearched && this.state.newSearchedRecipe === true &&
                  <SearchResults recipesSearched={ this.state.recipesSearched }
                                  updateCurrentRecipe={ this.updateCurrentRecipe }></SearchResults>
              }
            </div>
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
