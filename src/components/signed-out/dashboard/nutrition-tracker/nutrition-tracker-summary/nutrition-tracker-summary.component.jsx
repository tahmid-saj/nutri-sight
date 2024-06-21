import "./nutrition-tracker-summary.styles.jsx"
import { NutritionTrackerDashboardSummaryContainer,
  NutritionTrackerDashboardSummaryInfoContainer
} from "./nutrition-tracker-summary.styles.jsx";
import NutritionTrackerGraphPie from "./nutrition-tracker-graph-pie/nutrition-tracker-graph-pie.component";
import { useSelector } from "react-redux";
import { selectNutritionTrackedDaysSummary } from "../../../../../store/signed-out/nutrition-tracker/nutrition-tracker.selector";
import { Divider, Typography, backdropClasses } from "@mui/material";
import SimplePaper from "../../../../shared/mui/paper/paper.component.jsx";
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants.js";

const date = new Date();
let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth()+1).padStart(2,"0");
let currentYear = date.getFullYear();
let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

const paperStyles = {
  backgroundColor: COLOR_CODES.general["0"],
}

const NutritionTrackerSummary = () => {
  const nutritionTrackedDaysSummary = useSelector(selectNutritionTrackedDaysSummary)

  return (
    <NutritionTrackerDashboardSummaryContainer>
      <div className="container">
        <div className="row justify-content-evenly align-items-center">
          <div className="col-sm-12 col-md-6">
            <SimplePaper styles={ paperStyles }>
              <NutritionTrackerDashboardSummaryInfoContainer>
                <Typography variant="h6">{`As of ${currentDate}`}</Typography>

                <Typography variant="body1">{`Average daily calories : ${nutritionTrackedDaysSummary.averageDailyCaloriesConsumption}`}</Typography>

                <br/>
                <Divider/>
                <br/>

                <Typography variant="body1">{`Average daily carbohydrates : ${nutritionTrackedDaysSummary.averageDailyCarbohydratesConsumption} g`}</Typography>
                <Typography variant="body1">{`Average daily protein : ${nutritionTrackedDaysSummary.averageDailyProteinConsumption} g`}</Typography>
                <Typography variant="body1">{`Average daily fat : ${nutritionTrackedDaysSummary.averageDailyFatConsumption} g`}</Typography>
              </NutritionTrackerDashboardSummaryInfoContainer>
            </SimplePaper>
          </div>

          <div className="col-sm-12 col-md-4">
            <NutritionTrackerGraphPie></NutritionTrackerGraphPie>
          </div>
        </div>
      </div>
    </NutritionTrackerDashboardSummaryContainer>
  )
}

export default NutritionTrackerSummary