import CaloriesBurnedGraphPie from "../../../components/signed-in/dashboard/calories-burned/calories-burned-graph/calories-burned-graph-pie.component.jsx"
import CaloriesBurnedGraph from "../../../components/signed-in/dashboard/calories-burned/calories-burned-graph/calories-burned-graph.component.jsx"
import CaloriesBurnedSummary from "../../../components/signed-in/dashboard/calories-burned/calories-burned-summary/calories-burned-summary.component.jsx"
import "./dashboard.styles.js"
import { DashboardContainer } from "./dashboard.styles.js"
import NutritionTrackerGraphCalories from "../../../components/signed-in/dashboard/nutrition-tracker/nutrition-tracker-graph-calories/nutrition-tracker-graph-calories.component.jsx"
import NutritionTrackerGraphMacronutrients from "../../../components/signed-in/dashboard/nutrition-tracker/nutrition-tracker-graph-macronutrients/nutrition-tracker-graph-macronutrients.component.jsx"
import NutritionTrackerSummary from "../../../components/signed-in/dashboard/nutrition-tracker/nutrition-tracker-summary/nutrition-tracker-summary.component.jsx"

import { useContext, Fragment } from "react"
import { NutritionTrackerContext } from "../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context.js"
import { CaloriesBurnedContext } from "../../../contexts/signed-in/calories-burned/calories-burned.context.js"
import { FitnessContext } from "../../../contexts/signed-in/fitness/fitness.context.js"
import ChatBot from "../../shared/chatbot/chatbot.component.js"
import { Divider } from "@mui/material"

import ScheduleCalendarNutritionTracker from "../../../components/signed-in/dashboard/nutrition-tracker/schedule/schedule-calendar/schedule-calendar.component.jsx"
import ScheduleDayInfoNutritionTracker from "../../../components/signed-in/dashboard/nutrition-tracker/schedule/schedule-day-info/schedule-day-info.component.jsx"
import ScheduleCalendarCaloriesBurned from "../../../components/signed-in/dashboard/calories-burned/schedule/schedule-calendar/schedule-calendar.component.jsx"
import ScheduleDayInfoCaloriesBurned from "../../../components/signed-in/dashboard/calories-burned/schedule/schedule-day-info/schedule-day-info.component.jsx"
import ScheduleCalendarFitness from "../../../components/signed-in/dashboard/fitness/schedule/schedule-calendar/schedule-calendar.component.jsx"
import ScheduleDayInfoFitness from "../../../components/signed-in/dashboard/fitness/schedule/schedule-day-info/schedule-day-info.component.jsx"
import UpcomingExercises from "../../../components/signed-in/dashboard/fitness/upcoming-exercises/upcoming-exercises.component.jsx"
import ItemTabs from "../../../components/shared/mui/tabs/tabs.component.js"
import SmartToyIcon from '@mui/icons-material/SmartToy';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { COMMON_SPACING } from "../../../utils/constants/shared.constants.js"

const Dashboard = () => {
  const { nutritionTrackedDays, scheduledNutritionTrackedDaysView } = useContext(NutritionTrackerContext)
  const { trackedCaloriesBurned, scheduledTrackedCaloriesBurnedView } = useContext(CaloriesBurnedContext)
  const { exercises, selectedSearchedExercise, upcomingExercisesView } = useContext(FitnessContext)

  let tabList = [
    {
      value: "chatbot",
      icon: <SmartToyIcon/>,
      label: "Chatbot"
    }
  ]
  let panelList = [
    {
      value: "chatbot",
      children: <ChatBot/>
    }
  ]

  // if (nutritionTrackedDays.length === 0 && trackedCaloriesBurned.length === 0) {
  //   return (
  //     <Fragment>
  //       <ChatBot></ChatBot>
  //       <h4>Nothing yet, track nutrition and activities to get started!</h4>
  //     </Fragment>
  //   )
  // }

  if (nutritionTrackedDays.length === 0 && exercises.length === 0 && trackedCaloriesBurned.length === 0) {
    return (
      <DashboardContainer>
        <ItemTabs tabList={ tabList } panelList={ panelList }></ItemTabs>
      </DashboardContainer>
    )
  }

  if (nutritionTrackedDays.length !== 0) {
    tabList.push({
      value: "nutrition-tracker",
      icon: <RestaurantIcon/>,
      label: "Nutrition"
    })

    panelList.push({
      value: "nutrition-tracker",
      children: (
        <Fragment>
          <ScheduleCalendarNutritionTracker></ScheduleCalendarNutritionTracker>
          {
            scheduledNutritionTrackedDaysView ?
            <ScheduleDayInfoNutritionTracker></ScheduleDayInfoNutritionTracker> : null
          }

          <br/>
          <Divider/>
          <br/>

          <NutritionTrackerSummary></NutritionTrackerSummary>
          <NutritionTrackerGraphCalories></NutritionTrackerGraphCalories>
          <NutritionTrackerGraphMacronutrients></NutritionTrackerGraphMacronutrients>
        </Fragment>
      )
    })
  }

  if (exercises.length !== 0) {
    tabList.push({
      value: "fitness",
      icon: <FitnessCenterIcon/>,
      label: "Fitness"
    })

    panelList.push({
      value: "fitness",
      children: (
        <Fragment>
          <ScheduleCalendarFitness></ScheduleCalendarFitness>

          <br/>
          <Divider/>
          <br/>

          <ScheduleDayInfoFitness></ScheduleDayInfoFitness>

          <br/>
          <Divider/>
          <br/>

          {
            upcomingExercisesView.length !== 0 ?
            <UpcomingExercises></UpcomingExercises> : null
          }
        </Fragment>
      )
    })
  }

  if (trackedCaloriesBurned.length !== 0) {
    tabList.push({
      value: "calories-burned",
      icon: <DirectionsRunIcon/>,
      label: "Calories"
    })

    panelList.push({
      value: "calories-burned",
      children: (
        <Fragment>
            <ScheduleCalendarCaloriesBurned></ScheduleCalendarCaloriesBurned>
            {
              scheduledTrackedCaloriesBurnedView ?
              <ScheduleDayInfoCaloriesBurned></ScheduleDayInfoCaloriesBurned> : null
            }

            <br/>
            <Divider/>
            <br/>

            <CaloriesBurnedSummary></CaloriesBurnedSummary>
            <CaloriesBurnedGraphPie></CaloriesBurnedGraphPie>
            <CaloriesBurnedGraph></CaloriesBurnedGraph>
        </Fragment>
      )
    })
  }

  return (
    <DashboardContainer>
      <ItemTabs tabList={ tabList } panelList={ panelList }></ItemTabs>
    </DashboardContainer>
  )

  // return (
  //   <div className="dashboard-container">
  //     <ChatBot></ChatBot>
  //     {
  //       nutritionTrackedDays.length !== 0 &&
  //       <div className="nutrition-tracker-dashboard-container">
  //         <h3>Nutrition Tracker</h3>
  //         <ScheduleCalendarNutritionTracker></ScheduleCalendarNutritionTracker>
  //         {
  //           scheduledNutritionTrackedDaysView ?
  //           <ScheduleDayInfoNutritionTracker></ScheduleDayInfoNutritionTracker> : null
  //         }

  //         <NutritionTrackerSummary></NutritionTrackerSummary>
  //         <NutritionTrackerGraphCalories></NutritionTrackerGraphCalories>
  //         <NutritionTrackerGraphMacronutrients></NutritionTrackerGraphMacronutrients>
  //       </div>
  //     }

  //     {
  //       trackedCaloriesBurned.length !== 0 &&
  //       <Fragment>
  //         <div className="dashboard-separator-container">
  //           <hr className="rounded"/>
  //         </div>

  //         <div className="calories-burned-dashboard-container">
  //           <h3>Calories Burned</h3>
  //           <ScheduleCalendarCaloriesBurned></ScheduleCalendarCaloriesBurned>
  //           {
  //             scheduledTrackedCaloriesBurnedView ?
  //             <ScheduleDayInfoCaloriesBurned></ScheduleDayInfoCaloriesBurned> : null
  //           }
  //           <div className="calories-burned-dashboard-summary-graph-container">
  //             <CaloriesBurnedSummary></CaloriesBurnedSummary>
  //           </div>
  //           <CaloriesBurnedGraphPie></CaloriesBurnedGraphPie>
  //           <CaloriesBurnedGraph></CaloriesBurnedGraph>
  //         </div>
  //       </Fragment>
  //     }

  //     {
  //       exercises.length !== 0 &&
  //       <Fragment>
  //         <div className="fitness-dashboard-container">
  //         <div className="dashboard-separator-container">
  //           <hr className="rounded"/>
  //         </div>
  //         <h3>Fitness</h3>
  //         <ScheduleCalendarFitness></ScheduleCalendarFitness>

  //         <br/>
  //         <Divider/>
  //         <br/>

  //         <ScheduleDayInfoFitness></ScheduleDayInfoFitness>
  //         </div>
  //       </Fragment>
  //     }
  //   </div>
  // )
}

export default Dashboard