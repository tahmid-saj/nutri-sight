import React, { Component, useContext } from "react";

import "./pagination.styles.scss";

import { RecipesContext } from "../../../../../contexts/shared/recipes/recipes.context";

import { PAGINATION_BUTTONS } from "../../../../../utils/constants/recipes.constants";

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
    <div className="pagination-container">
      <div className="pagination-buttons-container">
        <button className="previous-page-button" type="button" onClick={ handlePreviousPage }
          style={{ visibility: `${displayPreviousPage === false ? "hidden" : ""}` }}>
          {`< Page ${previousPageNumber}`}
        </button>
        
        <button className="next-page-button" type="button" onClick={ handleNextPage }
          style={{ visibility: `${displayNextPage === false ? "hidden" : ""}` }}>
          {`Page ${nextPageNumber} >`}
        </button>
      </div>
    </div>
  );

};

export default Pagination;
