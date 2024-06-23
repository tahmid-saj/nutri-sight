import React, { Component, useEffect, Fragment } from "react";

import Summary from "../../../components/signed-out/nutrition-tracker/summary/summary.component";

import "./nutrition-tracker.styles.jsx";
import { NutritionTrackerContainer, UpdateConsumptionContainer } from "./nutrition-tracker.styles";
import SearchDays from "../../../components/signed-out/nutrition-tracker/search-days/search-days.component";
import UpdateConsumptionForm from "../../../components/signed-out/nutrition-tracker/update-consumption-form/update-consumption-form.component";
import ConsumptionInfo from "../../../components/signed-out/nutrition-tracker/consumption-info/consumption-info.component";

import TopSearch from "../../../components/signed-out/nutrition-tracker/top-search/top-search.component";

// import { NutritionTrackerContext } from "../../../contexts/signed-out/nutrition-tracker/nutrition-tracker.context";
import { useDispatch, useSelector } from "react-redux"
import { selectNutritionTrackedDays, selectFilterConditions, selectNutritionTrackedDaysView,
  selectSelectedNutritionTrackedDay, selectScheduledNutritionTrackedDaysView
} from "../../../store/signed-out/nutrition-tracker/nutrition-tracker.selector";
import { setNutritionTrackedDaysSummary, setNutritionTrackedDaysView, 
  filterDayTrackedHelper, selectScheduledNutritionTrackedDayHelper, setScheduledNutritionTrackedDaysView
} from "../../../store/signed-out/nutrition-tracker/nutrition-tracker.action";
import { calculateSummary } from "../../../utils/calculations/nutrition-tracker.calculations";
import ScheduleCalendar from "../../../components/signed-out/nutrition-tracker/schedule/schedule-calendar/schedule-calendar.component";
import { Divider } from "rsuite";
import ScheduleDayInfo from "../../../components/signed-out/nutrition-tracker/schedule/schedule-day-info/schedule-day-info.component";
import { Typography } from "@mui/material";

import SummarizeIcon from '@mui/icons-material/Summarize';
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ItemTabs from "../../../components/shared/mui/tabs/tabs.component";


const NutritionTracker = () => {
  // const { nutritionTrackedDays } = useContext(NutritionTrackerContext);
  const nutritionTrackedDays = useSelector(selectNutritionTrackedDays)
  const filterConditions = useSelector(selectFilterConditions)
  const selectedNutritionTrackedDay = useSelector(selectSelectedNutritionTrackedDay)
  const scheduledNutritionTrackedDaysView = useSelector(selectScheduledNutritionTrackedDaysView)
  const nutritionTrackedDaysView = useSelector(selectNutritionTrackedDaysView)
  const dispatch = useDispatch()

  // update summary if nutritionTrackedDays changes
  useEffect(() => {
    if (nutritionTrackedDays && nutritionTrackedDays.length) {
      // update nutritionTrackedDaysSummary with average consumptions
      
  
      const summary = calculateSummary(nutritionTrackedDays);
  
      dispatch(setNutritionTrackedDaysSummary({
        averageDailyCaloriesConsumption: summary.averageDailyCalories,
        averageDailyCarbohydratesConsumption: summary.averageDailyCarbohydrates,
        averageDailyProteinConsumption: summary.averageDailyProtein,
        averageDailyFatConsumption: summary.averageDailyFat,
      }))
    }
  }, [nutritionTrackedDays, dispatch])

  // update nutritionTrackedDaysView when nutritionTrackedDays or filterConditions change
  useEffect(() => {
    if (filterConditions) {
      const filteredTrackedDays = filterDayTrackedHelper(nutritionTrackedDays, filterConditions)
      dispatch(setNutritionTrackedDaysView(filteredTrackedDays))
    } else {
      dispatch(setNutritionTrackedDaysView(nutritionTrackedDays))
    }
  }, [nutritionTrackedDays, filterConditions, dispatch])

  // update scheduledNutritionTrackedDaysView when nutritionTrackedDays or selectedNutritionTrackedDay change
  useEffect(() => {
    if (selectedNutritionTrackedDay) {
      
      dispatch(setScheduledNutritionTrackedDaysView(selectScheduledNutritionTrackedDayHelper(nutritionTrackedDays, selectedNutritionTrackedDay)))
    } else {
      dispatch(setScheduledNutritionTrackedDaysView(null))
    }
  }, [nutritionTrackedDays, selectedNutritionTrackedDay, dispatch])

  let tabList = []
  let panelList = []
  
  if (nutritionTrackedDays && nutritionTrackedDays.length !== 0) {
    tabList.push({
      value: "summary",
      icon: <SummarizeIcon/>,
      label: "Summary"
    })
    tabList.push({
      value: "filter",
      icon: <FilterAltIcon/>,
      label: "Filter"
    })
    
    panelList.push({
      value: "summary",
      children: <Summary/>
    })
    panelList.push({
      value: "filter",
      children: <TopSearch/>
    })
  }

  tabList.push({
    value: "edit",
    icon: <EditIcon/>,
    label: "Edit"
  })

  panelList.push({
    value: "edit",
    children: (
      <UpdateConsumptionContainer>
        <UpdateConsumptionForm></UpdateConsumptionForm>
      </UpdateConsumptionContainer>
    )
  })

  return (
    <NutritionTrackerContainer>
      <ScheduleCalendar></ScheduleCalendar>
      {
        scheduledNutritionTrackedDaysView ?
        <ScheduleDayInfo></ScheduleDayInfo> : null
      }

      <br/>

      <ItemTabs tabList={ tabList } panelList={ panelList }></ItemTabs>
    </NutritionTrackerContainer>
  )

  // return (
  //   <NutritionTrackerContainer>
  //     <ScheduleCalendar></ScheduleCalendar>
  //     {
  //       scheduledNutritionTrackedDaysView ?
  //       <ScheduleDayInfo></ScheduleDayInfo> : null
  //     }

  //     <br/>
  //     <Divider/>
  //     <br/>

  //     {
  //       nutritionTrackedDays && nutritionTrackedDays.length !== 0 &&
  //       <Fragment>
  //         <TopSearch></TopSearch>
  //       </Fragment>
  //     }

  //     <UpdateConsumptionContainer>
  //       <UpdateConsumptionForm></UpdateConsumptionForm>
  //     </UpdateConsumptionContainer>

  //   </NutritionTrackerContainer>
  // );
};

export default NutritionTracker;