import CaloriesBurnedGraphPie from "../../../components/signed-out/dashboard/calories-burned/calories-burned-graph/calories-burned-graph-pie.component"
import CaloriesBurnedGraph from "../../../components/signed-out/dashboard/calories-burned/calories-burned-graph/calories-burned-graph.component"
import CaloriesBurnedSummary from "../../../components/signed-out/dashboard/calories-burned/calories-burned-summary/calories-burned-summary.component"
import "./dashboard.styles"
import { DashboardContainer } from "./dashboard.styles"
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
import { Divider, Typography } from "@mui/material"

import ScheduleCalendarNutritionTracker from "../../../components/signed-out/dashboard/nutrition-tracker/schedule/schedule-calendar/schedule-calendar.component"
import ScheduleDayInfoNutritionTracker from "../../../components/signed-out/dashboard/nutrition-tracker/schedule/schedule-day-info/schedule-day-info.component"
import ScheduleCalendarCaloriesBurned from "../../../components/signed-out/dashboard/calories-burned/schedule/schedule-calendar/schedule-calendar.component"
import ScheduleDayInfoCaloriesBurned from "../../../components/signed-out/dashboard/calories-burned/schedule/schedule-day-info/schedule-day-info.component"
import ScheduleCalendarFitness from "../../../components/signed-out/dashboard/fitness/schedule/schedule-calendar/schedule-calendar.component"
import ScheduleDayInfoFitness from "../../../components/signed-out/dashboard/fitness/schedule/schedule-day-info/schedule-day-info.component"
import UpcomingExercises from "../../../components/signed-out/dashboard/fitness/upcoming-exercises/upcoming-exercises.component"
import ItemTabs from "../../../components/shared/mui/tabs/tabs.component"
import SmartToyIcon from '@mui/icons-material/SmartToy';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { COMMON_SPACING } from "../../../utils/constants/shared.constants"

const Dashboard = () => {
  const dispatch = useDispatch()
  const nutritionTrackedDays = useSelector(selectNutritionTrackedDays)
  const scheduledNutritionTrackedDaysView = useSelector(selectScheduledNutritionTrackedDaysView)
  const selectedNutritionTrackedDay = useSelector(selectSelectedNutritionTrackedDay)

  const { trackedCaloriesBurned, scheduledTrackedCaloriesBurnedView } = useContext(CaloriesBurnedContext)
  const { exercises, upcomingExercisesView } = useContext(FitnessContext)

  // update scheduledNutritionTrackedDaysView when nutritionTrackedDays or selectedNutritionTrackedDay change
  useEffect(() => {
    if (selectedNutritionTrackedDay) {
      
      dispatch(setScheduledNutritionTrackedDaysView(selectScheduledNutritionTrackedDayHelper(nutritionTrackedDays!, selectedNutritionTrackedDay)!))
    } else {
      dispatch(setScheduledNutritionTrackedDaysView(undefined))
    }
  }, [nutritionTrackedDays, selectedNutritionTrackedDay, dispatch])

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

  if (nutritionTrackedDays?.length === 0 && exercises.length === 0 && trackedCaloriesBurned.length === 0) {
    return (
      <DashboardContainer>
        <ItemTabs tabList={ tabList } panelList={ panelList }></ItemTabs>
      </DashboardContainer>
    )
  }

  if (nutritionTrackedDays?.length !== 0) {
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