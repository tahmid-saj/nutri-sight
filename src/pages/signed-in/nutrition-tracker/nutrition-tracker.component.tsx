import React, { Component, useContext, Fragment } from "react";

import Summary from "../../../components/signed-in/nutrition-tracker/summary/summary.component.tsx";

import "./nutrition-tracker.styles.tsx";
import { NutritionTrackerContainer, UpdateConsumptionContainer } from "./nutrition-tracker.styles.tsx";
import SearchDays from "../../../components/signed-in/nutrition-tracker/search-days/search-days.component.tsx";
import UpdateConsumptionForm from "../../../components/signed-in/nutrition-tracker/update-consumption-form/update-consumption-form.component.tsx";
import ConsumptionInfo from "../../../components/signed-in/nutrition-tracker/consumption-info/consumption-info.component.tsx";

import TopSearch from "../../../components/signed-in/nutrition-tracker/top-search/top-search.component.tsx";

import { NutritionTrackerContext } from "../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context.tsx";
import ScheduleCalendar from "../../../components/signed-in/nutrition-tracker/schedule/schedule-calendar/schedule-calendar.component.tsx";
import ScheduleDayInfo from "../../../components/signed-in/nutrition-tracker/schedule/schedule-day-info/schedule-day-info.component.tsx";
import { Divider } from "@mui/material";

import SummarizeIcon from '@mui/icons-material/Summarize';
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ItemTabs from "../../../components/shared/mui/tabs/tabs.component.tsx";

const NutritionTracker = () => {
  const { nutritionTrackedDays, scheduledNutritionTrackedDaysView } = useContext(NutritionTrackerContext);

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
  //   <div className="nutrition-tracker-container">
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
  //       <h2 className="nutrition-tracker-summary-header">Summary</h2>
  //         <TopSearch></TopSearch>

  //         <div className="form-view-separator-container">
  //           <hr className="rounded"/>
  //         </div>
  //       </Fragment>
  //     }

  //     <div className="update-consumption-container">
  //       <UpdateConsumptionForm></UpdateConsumptionForm>
  //     </div>

  //   </div>
  // );
};

export default NutritionTracker;