import React, { Fragment, Component } from "react";

import Header from "./header/header.component";
import SearchResults from "./search-results/search-results.component";
import Recipe from "./recipe/recipe.component";
import RecipesView from "./recipes-view/recipes-view.component";

class Recipes extends Component {
  constructor() {
    super();

    this.state = {
      displayRecipeView: false
    }
  }

  displayRecipeViewHandler = (recipeName) => {
    console.log(recipeName);

    this.setState({ displayRecipeView: true });
  };

  render() {
    return (
      <Fragment>
        <Header displayRecipeViewHandler={ this.displayRecipeViewHandler }></Header>
  
        <div className="search-results-recipe-container">
          { this.state.displayRecipeView && this.state.displayRecipeView === true && <RecipesView></RecipesView> }
        </div>
      </Fragment>
    );
  }

};

export default Recipes;
