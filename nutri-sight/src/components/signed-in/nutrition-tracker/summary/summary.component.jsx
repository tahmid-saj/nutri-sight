import { useContext } from "react";

import "./summary.styles.scss";

import { NutritionTrackerContext } from "../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context";

const date = new Date();
let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth()+1).padStart(2,"0");
let currentYear = date.getFullYear();
let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

const Summary = () => {
  const { nutritionTrackedDaysSummary } = useContext(NutritionTrackerContext);

  return (
    <div className="nutrition-tracker-summary">
      <h3>{`As of ${currentDate}`}</h3>

      <h5>{`Average daily calories : ${nutritionTrackedDaysSummary.averageDailyCaloriesConsumption}`}</h5>
      <h5>{`Average daily carbohydrates : ${nutritionTrackedDaysSummary.averageDailyCarbohydratesConsumption} g`}</h5>
      <h5>{`Average daily protein : ${nutritionTrackedDaysSummary.averageDailyProteinConsumption} g`}</h5>
      <h5>{`Average daily fat : ${nutritionTrackedDaysSummary.averageDailyFatConsumption} g`}</h5>
    </div>
  );
};

export default Summary;