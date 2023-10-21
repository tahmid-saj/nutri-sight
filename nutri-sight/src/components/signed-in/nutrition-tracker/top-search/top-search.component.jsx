import React from "react";

import "./top-search.styles.scss";

import SearchDays from "../search-days/search-days.component";

import Summary from "../summary/summary.component";
  
const TopSearch = () => {
  return (
    <div className="search-days-summary-container">
      <Summary></Summary>

      <div className="search-days-nutrition-tracker-container">
        <SearchDays></SearchDays>
      </div>
    </div>
  );
};

export default TopSearch;

