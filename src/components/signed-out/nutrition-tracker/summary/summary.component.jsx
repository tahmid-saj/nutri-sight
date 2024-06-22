import { useContext } from "react";

import "./summary.styles.jsx";
import { NutritionTrackerSummary } from "./summary.styles.jsx";

// import { NutritionTrackerContext } from "../../../../contexts/signed-out/nutrition-tracker/nutrition-tracker.context";
import { useSelector } from "react-redux"
import { selectNutritionTrackedDaysSummary } from "../../../../store/signed-out/nutrition-tracker/nutrition-tracker.selector";
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
  // const { nutritionTrackedDaysSummary } = useContext(NutritionTrackerContext);
  const nutritionTrackedDaysSummary = useSelector(selectNutritionTrackedDaysSummary)

  return (
    <NutritionTrackerSummary>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="h6">{`As of ${currentDate}`}</Typography>

        <Typography variant="body1">{`Average daily calories : ${nutritionTrackedDaysSummary.averageDailyCaloriesConsumption}`}</Typography>
        <Typography variant="body1">{`Average daily carbohydrates : ${nutritionTrackedDaysSummary.averageDailyCarbohydratesConsumption} g`}</Typography>
        <Typography variant="body1">{`Average daily protein : ${nutritionTrackedDaysSummary.averageDailyProteinConsumption} g`}</Typography>
        <Typography variant="body1">{`Average daily fat : ${nutritionTrackedDaysSummary.averageDailyFatConsumption} g`}</Typography>
      </SimplePaper>
    </NutritionTrackerSummary>
  );
};

export default Summary;