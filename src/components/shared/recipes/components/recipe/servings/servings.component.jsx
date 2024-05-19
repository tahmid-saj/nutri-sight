import "./servings.styles.jsx";
import { ServingsContainer, TimeContainer,
  ServingsQuantityContainer, ServingsButtonsContainer, 
  DecreasingServings, IncreaseServings
} from "./servings.styles.jsx";

import { Component, useState, useContext } from "react";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { RecipesContext } from "../../../../../../contexts/shared/recipes/recipes.context";
import { Typography } from "@mui/material";

const Servings = () => {
  const { displayedRecipe, decreaseServings, increaseServings } = useContext(RecipesContext);

  const handleDecreaseServings = (event) => {
    event.preventDefault();

    console.log("decrease servings");

    if (displayedRecipe.updatedServings > 0) {
      decreaseServings(displayedRecipe);
    }
  };

  const handleIncreaseServings = (event) => {
    event.preventDefault();

    console.log("increase servings");
    increaseServings(displayedRecipe);
  };

  return (
    <ServingsContainer>
      <TimeContainer>
        <AccessTimeIcon/>
        <Typography sx={{ marginLeft: "1%" }} variant="subtitle1">{` ${displayedRecipe.cookingTime} minutes`}</Typography>
      </TimeContainer>

      <ServingsQuantityContainer>
        <ServingsButtonsContainer>
          <DecreasingServings onClick={ handleDecreaseServings }>
            <RemoveCircleOutlineIcon/>
          </DecreasingServings>
          
          <IncreaseServings onClick={ handleIncreaseServings }>
            <AddCircleOutlineIcon/>
          </IncreaseServings>
        </ServingsButtonsContainer>

        {
          <Typography sx={{ marginLeft: "1%" }} variant="subtitle1">{`${displayedRecipe.updatedServings} servings`}</Typography>
        }

      </ServingsQuantityContainer>
    </ServingsContainer>
  )
};


export default Servings;