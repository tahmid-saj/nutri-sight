import "./pagination.styles.tsx";
import { PaginationButtonsContainer, PaginationContainer } from "./pagination.styles.tsx";

import React, { Component, MouseEvent, useContext } from "react";
import { RecipesContext } from "../../../../../contexts/shared/recipes/recipes.context.tsx";

import { PAGINATION_BUTTONS } from "../../../../../utils/constants/recipes.constants.ts";
import Button from "../../../button/button.component.tsx";

const Pagination = () => {
  const { previousPageNumber, nextPageNumber, 
          displayPreviousPage, displayNextPage, displayPaginationButtons } = useContext(RecipesContext);

  const handlePreviousPage = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    displayPaginationButtons(PAGINATION_BUTTONS.previous);
  };

  const handleNextPage = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    displayPaginationButtons(PAGINATION_BUTTONS.next);
  };
    
  return (
    <div className="container">
      <PaginationContainer>
        <div className="row justify-content-center">
          <PaginationButtonsContainer>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <Button type="button" onClick={ handlePreviousPage }
                style={{ visibility: `${displayPreviousPage === false ? "hidden" : "visible"}` }}>
                {`< Page ${previousPageNumber}`}
              </Button>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6">
              <Button type="button" onClick={ handleNextPage }
                style={{ visibility: `${displayNextPage === false ? "hidden" : "visible"}` }}>
                {`Page ${nextPageNumber} >`}
              </Button>
            </div>
          </PaginationButtonsContainer>
        </div>
      </PaginationContainer>
    </div>
  );

};

export default Pagination;
