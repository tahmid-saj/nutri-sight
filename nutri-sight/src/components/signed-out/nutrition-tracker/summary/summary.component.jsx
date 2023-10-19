import { useContext } from "react";

import "./summary.styles.scss";

import { NutritionTrackerContext } from "../../../../context/signed-out/nutrition-tracker/nutrition-tracker.context";

const date = new Date();
let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth()+1).padStart(2,"0");
let currentYear = date.getFullYear();
let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

const Summary = () => {
  const { nutritionTrackedDaysSummary } = useContext(NutritionTrackerContext);

  return (
    <div className="nutrition-tracker-summary">
      <h5>{`As of ${currentDate}`}</h5>

      <h4>{`Average daily calories consumption   `}<h3><strong>
        {`${nutritionTrackedDaysSummary.averageDailyCaloriesConsumption}`}
      </strong></h3></h4>
      <h4>{`Average daily carbohydrate consumption   `}<h3>
        <strong>{`${nutritionTrackedDaysSummary.averageDailyCarbohydratesConsumption}`}
      </strong></h3></h4>
      <h4>{`Average daily protein consumption   `}<h3><strong>
        {`${nutritionTrackedDaysSummary.averageDailyProteinConsumption}`}
      </strong></h3></h4>
      <h4>{`Average daily fat consumption   `}<h3><strong>
        {`${nutritionTrackedDaysSummary.averageDailyFatConsumption}`}
      </strong></h3></h4>
    </div>
  );
};

export default Summary;