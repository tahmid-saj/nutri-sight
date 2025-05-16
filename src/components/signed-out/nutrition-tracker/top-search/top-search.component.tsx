import React from "react";

import "./top-search.styles.js";
import { NutritionTrackerSummaryFilterContainer,
  SearchDaysSummaryContainer, NutritionTrackerSummaryGraphTableContainer
} from "./top-search.styles.js";

import SearchDays from "../search-days/search-days.component.js";
import ConsumptionInfo from "../consumption-info/consumption-info.component.js";

import NutritionTrackerFilter from "../nutrition-tracker-filter/nutrition-tracker-filter.component.js";
import SummaryGraph from "../summary-graph/summary-graph.component.js";
import CaloriesGraph from "../calories-graph/calories-graph.component.js";
import NutritionTrackerTable from "../nutrition-tracker-table/nutrition-tracker-table.component.js";
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.js";
  
const TopSearch = () => {
  return (
    <SearchDaysSummaryContainer>
      <NutritionTrackerSummaryFilterContainer>
        <NutritionTrackerFilter></NutritionTrackerFilter>
      </NutritionTrackerSummaryFilterContainer>

      <br/>

      <Typography sx={{ display: "flex", justifyContent: "center", color: COLOR_CODES.general["0"] }} 
        variant="h6">Filtered results</Typography>

      <NutritionTrackerSummaryGraphTableContainer>
        <CaloriesGraph></CaloriesGraph>
        <SummaryGraph></SummaryGraph>
        <NutritionTrackerTable></NutritionTrackerTable>
      </NutritionTrackerSummaryGraphTableContainer>

      {/* <div className="search-days-nutrition-tracker-container">
        <SearchDays></SearchDays>
      </div> */}
    </SearchDaysSummaryContainer>
  );
};

export default TopSearch;

