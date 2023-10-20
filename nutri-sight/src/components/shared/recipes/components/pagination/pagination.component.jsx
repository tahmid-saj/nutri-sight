import React, { Component } from "react";

import "./pagination.styles.scss";

import Button from "../../../button/button.component";

const RECIPES_PER_PAGE = 8;

const Pagination = () => {
  const [showPreviousPageButton, setShowPreviousPageButton] = useState(false);
  const [showNextPageButton, setShowNextPageButton] = useState(true);
  const [previousPage, setPreviousPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(2);

  

  const handleButtonsDisplay = () => {
    // (page 1 and there are no pages) recipeResultsLength < 8: both buttons are hidden
    // (page 1 and there are other pages) recipeResultsLength > 8 and currentPage === 1: previous button is hidden, next button is visible
    // (on page before than last page) recipeResultsLength > 8 and currentPage < lastPage: previous button is visible, next button is visible
    // (last page) recipeResultsLength > 8 and currentPage === lastPage: previous button is visible, next button is hidden

    if (this.state.currentPage === 1 && this.state.recipeResultsLength < this.state.recipesPerPage) {
      this.setState({ showPreviousPageButton: false, showNextPageButton: false });
    } else if (this.state.currentPage === 1 && this.state.recipeResultsLength > this.state.recipesPerPage) {
      this.setState({ showPreviousPageButton: false, showNextPageButton: true });
    } else if (this.state.currentPage !== 1 && this.state.currentPage < this.state.lastPage && this.state.recipeResultsLength > this.state.recipesPerPage) {
      this.setState({ showPreviousPageButton: true, showNextPageButton: true });
    } else if (this.state.currentPage !== 1 && this.state.currentPage === this.state.lastPage && this.state.recipeResultsLength > this.state.recipesPerPage) {
      this.setState({ showPreviousPageButton: true, showNextPageButton: false });
    }
  };

  constructor ({ recipeResultsLength, lastPage, recipesPerPage, updateSearchResultsPage }) {
    super();

    this.state = {
      showPreviousPageButton: false,
      showNextPageButton: true,
      previousPage: 0,
      currentPage: 1,
      nextPage: 2,
      recipeResultsLength: recipeResultsLength,
      lastPage: lastPage,
      recipesPerPage: recipesPerPage,
      updateSearchResultsPage: updateSearchResultsPage
    };
  };

  handlePreviousPage = (event) => {
    event.preventDefault();
    
    // this.handleButtonsDisplay();
    this.setState({ previousPage: --this.state.previousPage });
    this.setState({ currentPage: --this.state.currentPage });
    this.setState({ nextPage: --this.state.nextPage });
    this.handleButtonsDisplay();
    this.state.updateSearchResultsPage(this.state.currentPage);

    // if (this.state.currentPage === 0) {
    //   this.setState({ showPreviousPageButton: false });
    // }

    // if (this.state.currentPage === 1) {
    //   this.setState({ showPreviousPageButton: false });
    // }
  };

  handleNextPage = (event) => {
    event.preventDefault();

    // this.handleButtonsDisplay();
    this.setState({ previousPage: ++this.state.previousPage });
    this.setState({ currentPage: ++this.state.currentPage });
    this.setState({ nextPage: ++this.state.nextPage });
    this.handleButtonsDisplay();
    console.log("currentPage: " + this.state.currentPage);
    this.state.updateSearchResultsPage(this.state.currentPage);

    
    // this.setState({ showPreviousPageButton: true });

    // if (this.state.currentPage === this.state.lastPage) {
    //   this.setState({ showNextPageButton: false });
    // }
  };
    
  render () {
    return (
      <div className="pagination-container">
        <div className="pagination-buttons-container">
          <button className="previous-page-button" type="button" onClick={ this.handlePreviousPage }
            style={{ visibility: `${this.state.showPreviousPageButton === false ? "hidden" : ""}` }}>
            {`< Page ${this.state.previousPage}`}
          </button>
          
          <button className="next-page-button" type="button" onClick={ this.handleNextPage }
            style={{ visibility: `${this.state.showNextPageButton === false ? "hidden" : ""}` }}>
            {`Page ${this.state.nextPage} >`}
          </button>

        </div>
      </div>
    );
  }

};

class Pagination2 extends Component {
  handleButtonsDisplay = () => {
    // (page 1 and there are no pages) recipeResultsLength < 8: both buttons are hidden
    // (page 1 and there are other pages) recipeResultsLength > 8 and currentPage === 1: previous button is hidden, next button is visible
    // (on page before than last page) recipeResultsLength > 8 and currentPage < lastPage: previous button is visible, next button is visible
    // (last page) recipeResultsLength > 8 and currentPage === lastPage: previous button is visible, next button is hidden

    if (this.state.currentPage === 1 && this.state.recipeResultsLength < this.state.recipesPerPage) {
      this.setState({ showPreviousPageButton: false, showNextPageButton: false });
    } else if (this.state.currentPage === 1 && this.state.recipeResultsLength > this.state.recipesPerPage) {
      this.setState({ showPreviousPageButton: false, showNextPageButton: true });
    } else if (this.state.currentPage !== 1 && this.state.currentPage < this.state.lastPage && this.state.recipeResultsLength > this.state.recipesPerPage) {
      this.setState({ showPreviousPageButton: true, showNextPageButton: true });
    } else if (this.state.currentPage !== 1 && this.state.currentPage === this.state.lastPage && this.state.recipeResultsLength > this.state.recipesPerPage) {
      this.setState({ showPreviousPageButton: true, showNextPageButton: false });
    }
  };

  constructor ({ recipeResultsLength, lastPage, recipesPerPage, updateSearchResultsPage }) {
    super();

    this.state = {
      showPreviousPageButton: false,
      showNextPageButton: true,
      previousPage: 0,
      currentPage: 1,
      nextPage: 2,
      recipeResultsLength: recipeResultsLength,
      lastPage: lastPage,
      recipesPerPage: recipesPerPage,
      updateSearchResultsPage: updateSearchResultsPage
    };
  };

  handlePreviousPage = (event) => {
    event.preventDefault();
    
    // this.handleButtonsDisplay();
    this.setState({ previousPage: --this.state.previousPage });
    this.setState({ currentPage: --this.state.currentPage });
    this.setState({ nextPage: --this.state.nextPage });
    this.handleButtonsDisplay();
    this.state.updateSearchResultsPage(this.state.currentPage);

    // if (this.state.currentPage === 0) {
    //   this.setState({ showPreviousPageButton: false });
    // }

    // if (this.state.currentPage === 1) {
    //   this.setState({ showPreviousPageButton: false });
    // }
  };

  handleNextPage = (event) => {
    event.preventDefault();

    // this.handleButtonsDisplay();
    this.setState({ previousPage: ++this.state.previousPage });
    this.setState({ currentPage: ++this.state.currentPage });
    this.setState({ nextPage: ++this.state.nextPage });
    this.handleButtonsDisplay();
    console.log("currentPage: " + this.state.currentPage);
    this.state.updateSearchResultsPage(this.state.currentPage);

    
    // this.setState({ showPreviousPageButton: true });

    // if (this.state.currentPage === this.state.lastPage) {
    //   this.setState({ showNextPageButton: false });
    // }
  };
    
  render () {
    return (
      <div className="pagination-container">
        <div className="pagination-buttons-container">
          <button className="previous-page-button" type="button" onClick={ this.handlePreviousPage }
            style={{ visibility: `${this.state.showPreviousPageButton === false ? "hidden" : ""}` }}>
            {`< Page ${this.state.previousPage}`}
          </button>
          
          <button className="next-page-button" type="button" onClick={ this.handleNextPage }
            style={{ visibility: `${this.state.showNextPageButton === false ? "hidden" : ""}` }}>
            {`Page ${this.state.nextPage} >`}
          </button>

        </div>
      </div>
    );
  }

};

export default Pagination;
