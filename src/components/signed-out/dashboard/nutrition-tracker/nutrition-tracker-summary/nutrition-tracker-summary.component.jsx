import "./nutrition-tracker-summary.styles.scss"
// import { useContext } from "react";
// import { NutritionTrackerContext } from "../../../../../contexts/signed-out/nutrition-tracker/nutrition-tracker.context";
import NutritionTrackerGraphPie from "./nutrition-tracker-graph-pie/nutrition-tracker-graph-pie.component";
import { useSelector } from "react-redux";
import { selectNutritionTrackedDaysSummary } from "../../../../../store/signed-out/nutrition-tracker/nutrition-tracker.selector";

const date = new Date();
let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth()+1).padStart(2,"0");
let currentYear = date.getFullYear();
let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

const NutritionTrackerSummary = () => {
  const nutritionTrackedDaysSummary = useSelector(selectNutritionTrackedDaysSummary)

  return (
    <div className="nutrition-tracker-dashboard-summary-container">
      <div className="nutrition-tracker-dashboard-summary-info-container">
        <h3>{`As of ${currentDate}`}</h3>

        <h5>{`Average daily calories : ${nutritionTrackedDaysSummary.averageDailyCaloriesConsumption}`}</h5>
        <h5>{`Average daily carbohydrates : ${nutritionTrackedDaysSummary.averageDailyCarbohydratesConsumption} g`}</h5>
        <h5>{`Average daily protein : ${nutritionTrackedDaysSummary.averageDailyProteinConsumption} g`}</h5>
        <h5>{`Average daily fat : ${nutritionTrackedDaysSummary.averageDailyFatConsumption} g`}</h5>
      </div>
      <NutritionTrackerGraphPie></NutritionTrackerGraphPie>
    </div>
  )
}

export default NutritionTrackerSummary