import React, { Fragment, Component } from "react";

import SearchResults from "../search-results/search-results.component";
import Recipe from "../recipe/recipe.component";

const RecipesView = ({ 
                      // currentDisplayedRecipe, currentDisplayedRecipeName,
                      // handleServingsUpdate, servingsRatio 
                    }) => {
  return (
    <Fragment>
      <Recipe 
              // currentDisplayedRecipe={ currentDisplayedRecipe }
              // currentDisplayedRecipeName={ currentDisplayedRecipeName }
              // handleServingsUpdate={ handleServingsUpdate }
              // servingsRatio={ servingsRatio }
              ></Recipe>
    </Fragment>
  )
};

const RecipesView2 = ({ currentDisplayedRecipe, currentDisplayedRecipeName,
                      handleServingsUpdate, servingsRatio }) => {
  return (
    <Fragment>
      <Recipe currentDisplayedRecipe={ currentDisplayedRecipe }
              currentDisplayedRecipeName={ currentDisplayedRecipeName }
              handleServingsUpdate={ handleServingsUpdate }
              servingsRatio={ servingsRatio }></Recipe>
    </Fragment>
  )
};

class RecipesViewClass extends Component {
  constructor ({ currentDisplayedRecipe, currentDisplayedRecipeName }) {
    super();

    this.state = {
      currentDisplayedRecipe: currentDisplayedRecipe,
      currentDisplayedRecipeName: currentDisplayedRecipeName,
      servingsRatio: 1
    }
  };

  handleServingsUpdate = (originalServings, updatedServings) => {
    this.setState({ servingsRatio: updatedServings / originalServings });
  };

  render = () => {
    return (
      <Fragment>
        <Recipe currentDisplayedRecipe={ this.state.currentDisplayedRecipe }
                currentDisplayedRecipeName={ this.state.currentDisplayedRecipeName }
                handleServingsUpdate={ this.handleServingsUpdate }
                servingsRatio={ this.state.servingsRatio }></Recipe>
      </Fragment>
    )
  };
}

export default RecipesView;
