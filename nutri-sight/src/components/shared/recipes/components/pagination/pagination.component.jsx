import "./pagination.styles.jsx";
import { PaginationContainer, PaginationButtonsContainer } from "./pagination.styles.jsx";

import React, { Component, useContext } from "react";
import { RecipesContext } from "../../../../../contexts/shared/recipes/recipes.context";

import { PAGINATION_BUTTONS } from "../../../../../utils/constants/recipes.constants";
import Button from "../../../button/button.component.jsx";

const Pagination = () => {
  const { previousPageNumber, nextPageNumber, 
          displayPreviousPage, displayNextPage, displayPaginationButtons } = useContext(RecipesContext);

  const handlePreviousPage = (event) => {
    event.preventDefault();
    
    displayPaginationButtons(PAGINATION_BUTTONS.previous);
  };

  const handleNextPage = (event) => {
    event.preventDefault();

    displayPaginationButtons(PAGINATION_BUTTONS.next);
  };
    
  return (
    <PaginationContainer>
      <PaginationButtonsContainer>
        <Button type="button" onClick={ handlePreviousPage }
          style={{ visibility: `${displayPreviousPage === false ? "hidden" : ""}` }}>
          {`< Page ${previousPageNumber}`}
        </Button>
        
        <Button type="button" onClick={ handleNextPage }
          style={{ visibility: `${displayNextPage === false ? "hidden" : ""}` }}>
          {`Page ${nextPageNumber} >`}
        </Button>
      </PaginationButtonsContainer>
    </PaginationContainer>
  );

};

export default Pagination;
