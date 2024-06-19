import CaloriesBurnedGraphPie from "../../../components/signed-out/dashboard/calories-burned/calories-burned-graph/calories-burned-graph-pie.component"
import CaloriesBurnedGraph from "../../../components/signed-out/dashboard/calories-burned/calories-burned-graph/calories-burned-graph.component"
import CaloriesBurnedSummary from "../../../components/signed-out/dashboard/calories-burned/calories-burned-summary/calories-burned-summary.component"
import "./dashboard.styles.scss"
import NutritionTrackerGraphCalories from "../../../components/signed-out/dashboard/nutrition-tracker/nutrition-tracker-graph-calories/nutrition-tracker-graph-calories.component"
import NutritionTrackerGraphMacronutrients from "../../../components/signed-out/dashboard/nutrition-tracker/nutrition-tracker-graph-macronutrients/nutrition-tracker-graph-macronutrients.component"
import NutritionTrackerSummary from "../../../components/signed-out/dashboard/nutrition-tracker/nutrition-tracker-summary/nutrition-tracker-summary.component"

import { useContext, Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectNutritionTrackedDays, selectScheduledNutritionTrackedDaysView,
  selectSelectedNutritionTrackedDay
} from "../../../store/signed-out/nutrition-tracker/nutrition-tracker.selector"
import { selectScheduledNutritionTrackedDayHelper, setScheduledNutritionTrackedDaysView } from "../../../store/signed-out/nutrition-tracker/nutrition-tracker.action"

import { CaloriesBurnedContext } from "../../../contexts/signed-out/calories-burned/calories-burned.context"
import { FitnessContext } from "../../../contexts/signed-out/fitness/fitness.context"
import ChatBot from "../../shared/chatbot/chatbot.component"
import { Divider } from "@mui/material"

import ScheduleCalendarNutritionTracker from "../../../components/signed-out/dashboard/nutrition-tracker/schedule/schedule-calendar/schedule-calendar.component"
import ScheduleDayInfoNutritionTracker from "../../../components/signed-out/dashboard/nutrition-tracker/schedule/schedule-day-info/schedule-day-info.component"
import ScheduleCalendarCaloriesBurned from "../../../components/signed-out/dashboard/calories-burned/schedule/schedule-calendar/schedule-calendar.component"
import ScheduleDayInfoCaloriesBurned from "../../../components/signed-out/dashboard/calories-burned/schedule/schedule-day-info/schedule-day-info.component"
import ScheduleCalendarFitness from "../../../components/signed-out/dashboard/fitness/schedule/schedule-calendar/schedule-calendar.component"
import ScheduleDayInfoFitness from "../../../components/signed-out/dashboard/fitness/schedule/schedule-day-info/schedule-day-info.component"

const Dashboard = () => {
  const dispatch = useDispatch()
  const nutritionTrackedDays = useSelector(selectNutritionTrackedDays)
  const scheduledNutritionTrackedDaysView = useSelector(selectScheduledNutritionTrackedDaysView)
  const selectedNutritionTrackedDay = useSelector(selectSelectedNutritionTrackedDay)

  const { trackedCaloriesBurned, scheduledTrackedCaloriesBurnedView } = useContext(CaloriesBurnedContext)
  const { exercises, selectedSearchedExercise } = useContext(FitnessContext)

    // update scheduledNutritionTrackedDaysView when nutritionTrackedDays or selectedNutritionTrackedDay change
    useEffect(() => {
      if (selectedNutritionTrackedDay) {
        console.log(nutritionTrackedDays, selectedNutritionTrackedDay)
        dispatch(setScheduledNutritionTrackedDaysView(selectScheduledNutritionTrackedDayHelper(nutritionTrackedDays, selectedNutritionTrackedDay)))
      } else {
        dispatch(setScheduledNutritionTrackedDaysView(null))
      }
    }, [nutritionTrackedDays, selectedNutritionTrackedDay, dispatch])

  if (nutritionTrackedDays.length === 0 && trackedCaloriesBurned.length === 0) {
    return (
      <Fragment>
        <ChatBot></ChatBot>
        <h4>Nothing yet, track nutrition, exercises or activities to get started!</h4>
      </Fragment>
    )
  }

  return (
    <div className="dashboard-container">
      <ChatBot></ChatBot>
      {
        nutritionTrackedDays.length !== 0 &&
        <div className="nutrition-tracker-dashboard-container">
          <h3>Nutrition Tracker</h3>
          <ScheduleCalendarNutritionTracker></ScheduleCalendarNutritionTracker>
          {
            scheduledNutritionTrackedDaysView ?
            <ScheduleDayInfoNutritionTracker></ScheduleDayInfoNutritionTracker> : null
          }

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
            <ScheduleCalendarCaloriesBurned></ScheduleCalendarCaloriesBurned>
            {
              scheduledTrackedCaloriesBurnedView ?
              <ScheduleDayInfoCaloriesBurned></ScheduleDayInfoCaloriesBurned> : null
            }
            <div className="calories-burned-dashboard-summary-graph-container">
              <CaloriesBurnedSummary></CaloriesBurnedSummary>
            </div>

            <CaloriesBurnedGraphPie></CaloriesBurnedGraphPie>
            <CaloriesBurnedGraph></CaloriesBurnedGraph>
          </div>
        </Fragment>
      }

      {
        exercises.length !== 0 &&
        <Fragment>
          <div className="fitness-dashboard-container">
          <div className="dashboard-separator-container">
            <hr className="rounded"/>
          </div>
          <h3>Fitness</h3>
          <ScheduleCalendarFitness></ScheduleCalendarFitness>

          <br/>
          <Divider/>
          <br/>

          <ScheduleDayInfoFitness></ScheduleDayInfoFitness>
          </div>
        </Fragment>
      }
    </div>
  )
}

export default Dashboard