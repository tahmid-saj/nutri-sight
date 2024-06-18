import React from "react";

import "./top-search.styles.scss";

import SearchDays from "../search-days/search-days.component";
import ConsumptionInfo from "../consumption-info/consumption-info.component";
import Summary from "../summary/summary.component";
import NutritionTrackerFilter from "../nutrition-tracker-filter/nutrition-tracker-filter.component";
import SummaryGraph from "../summary-graph/summary-graph.component";
import CaloriesGraph from "../calories-graph/calories-graph.component";
import NutritionTrackerTable from "../nutrition-tracker-table/nutrition-tracker-table.component";
  
const TopSearch = () => {
  return (
    <div className="search-days-summary-container">
      <div className="nutrition-tracker-summary-filter-container">
        <Summary></Summary>
        <NutritionTrackerFilter></NutritionTrackerFilter>
      </div>

      <div className="calories-burned-summary-separator-container">
        <hr className="rounded"/>
      </div>

      <h3 className="nutrition-tracked-summary-header">Tracked Summary</h3>

      <div className="nutrition-tracked-summary-graph-table-container">
        <CaloriesGraph></CaloriesGraph>
        <SummaryGraph></SummaryGraph>
        <NutritionTrackerTable></NutritionTrackerTable>
      </div>

      {/* <div className="search-days-nutrition-tracker-container">
        <SearchDays></SearchDays>
      </div> */}
    </div>
  );
};

export default TopSearch;

