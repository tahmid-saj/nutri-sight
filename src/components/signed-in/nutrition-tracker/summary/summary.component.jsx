import { useContext } from "react";

import "./summary.styles.jsx";
import { NutritionTrackerSummary } from "./summary.styles.jsx";

import { NutritionTrackerContext } from "../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context";
import { Typography } from "@mui/material";

import SimplePaper from "../../../shared/mui/paper/paper.component.jsx";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js";

const date = new Date();
let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth()+1).padStart(2,"0");
let currentYear = date.getFullYear();
let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: COMMON_SPACING.summaryInfoCard.width
}

const Summary = () => {
  const { nutritionTrackedDaysSummary } = useContext(NutritionTrackerContext);

  return (
    <NutritionTrackerSummary>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="h6">{`As of ${currentDate}`}</Typography>

        <Typography variant="body1">{`Average daily calories : ${nutritionTrackedDaysSummary.averageDailyCaloriesConsumption.toFixed(2)}`}</Typography>
        <Typography variant="body1">{`Average daily carbohydrates : ${nutritionTrackedDaysSummary.averageDailyCarbohydratesConsumption.toFixed(2)} g`}</Typography>
        <Typography variant="body1">{`Average daily protein : ${nutritionTrackedDaysSummary.averageDailyProteinConsumption.toFixed(2)} g`}</Typography>
        <Typography variant="body1">{`Average daily fat : ${nutritionTrackedDaysSummary.averageDailyFatConsumption.toFixed(2)} g`}</Typography>
      </SimplePaper>
    </NutritionTrackerSummary>
  );
};

export default Summary;