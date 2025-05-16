import React from "react";

import "./top-search.styles.tsx";
import { NutritionTrackerSummaryFilterContainer,
  SearchDaysSummaryContainer, NutritionTrackerSummaryGraphTableContainer
} from "./top-search.styles.tsx";

import SearchDays from "../search-days/search-days.component.tsx";
import ConsumptionInfo from "../consumption-info/consumption-info.component.tsx";
import Summary from "../summary/summary.component.tsx";
import NutritionTrackerFilter from "../nutrition-tracker-filter/nutrition-tracker-filter.component.tsx";
import SummaryGraph from "../summary-graph/summary-graph.component.tsx";
import CaloriesGraph from "../calories-graph/calories-graph.component.tsx";
import NutritionTrackerTable from "../nutrition-tracker-table/nutrition-tracker-table.component.tsx";
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts";
  
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

