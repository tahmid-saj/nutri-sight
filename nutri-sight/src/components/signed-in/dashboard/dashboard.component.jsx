import CaloriesBurnedGraphPie from "./calories-burned/calories-burned-graph/calories-burned-graph-pie.component"
import CaloriesBurnedGraph from "./calories-burned/calories-burned-graph/calories-burned-graph.component"
import CaloriesBurnedSummary from "./calories-burned/calories-burned-summary/calories-burned-summary.component"
import "./dashboard.styles.scss"
import NutritionTrackerGraphCalories from "./nutrition-tracker/nutrition-tracker-graph-calories/nutrition-tracker-graph-calories.component"
import NutritionTrackerGraphMacronutrients from "./nutrition-tracker/nutrition-tracker-graph-macronutrients/nutrition-tracker-graph-macronutrients.component"
import NutritionTrackerSummary from "./nutrition-tracker/nutrition-tracker-summary/nutrition-tracker-summary.component"

import { useContext, Fragment } from "react"
import { NutritionTrackerContext } from "../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context"
import { CaloriesBurnedContext } from "../../../contexts/signed-in/calories-burned/calories-burned.context"

const Dashboard = () => {
  const { nutritionTrackedDays } = useContext(NutritionTrackerContext)
  const { trackedCaloriesBurned } = useContext(CaloriesBurnedContext)

  if (nutritionTrackedDays.length === 0 && trackedCaloriesBurned.length === 0) {
    return (
      <h4>Nothing yet, track nutrition and activities to get started!</h4>
    )
  }

  return (
    <div className="dashboard-container">
      {
        nutritionTrackedDays.length !== 0 &&
        <div className="nutrition-tracker-dashboard-container">
          <h3>Nutrition Tracker</h3>
          <NutritionTrackerSummary></NutritionTrackerSummary>
          <NutritionTrackerGraphCalories></NutritionTrackerGraphCalories>
          <NutritionTrackerGraphMacronutrients></NutritionTrackerGraphMacronutrients>
        </div>
      }

      {
        trackedCaloriesBurned.length !== 0 &&
        <Fragment>
          <div className="dashboard-separator-container">
            <hr className="rounded"/>
          </div>

          <div className="calories-burned-dashboard-container">
            <h3>Calories Burned</h3>
            <div className="calories-burned-dashboard-summary-graph-container">
              <CaloriesBurnedSummary></CaloriesBurnedSummary>
            </div>
            <CaloriesBurnedGraphPie></CaloriesBurnedGraphPie>
            <CaloriesBurnedGraph></CaloriesBurnedGraph>
          </div>
        </Fragment>
      }
    </div>
  )
}

export default Dashboard