import "./calories-burned.styles.tsx"
import { CaloriesBurnedContainer, CaloriesBurnedFilterContainer,
  AddActivityContainer
} from "./calories-burned.styles.tsx"

import SummaryInfo from "../../../components/signed-in/calories-burned/summary/summary-info/summary-info.component.tsx"
import ActivityDateFilter from "../../../components/signed-in/calories-burned/activity-date-filter/activity-date-filter.component.tsx"

import CaloriesBurnedGraphPie from "../../../components/signed-in/calories-burned/view/calories-burned-graph/calories-burned-graph-pie.component.tsx"
import CaloriesBurnedGraphLine from "../../../components/signed-in/calories-burned/view/calories-burned-graph/calories-burned-graph-line.component.tsx"
import CaloriesBurnedTable from "../../../components/signed-in/calories-burned/view/calories-burned-table/calories-burned-table.component.tsx"

import ActivityDateForm from "../../../components/signed-in/calories-burned/add-activity/activity-date-form/activity-date-form.component.tsx"
import ActivityDateTable from "../../../components/signed-in/calories-burned/add-activity/activity-date-table/activity-date-table.component.tsx"

import { Fragment, useContext } from "react"
import { CaloriesBurnedContext } from "../../../contexts/signed-in/calories-burned/calories-burned.context.tsx"

import ScheduleCalendar from "../../../components/signed-in/calories-burned/schedule/schedule-calendar/schedule-calendar.component.tsx"
import ScheduleDayInfo from "../../../components/signed-in/calories-burned/schedule/schedule-day-info/schedule-day-info.component.tsx"

import SummarizeIcon from '@mui/icons-material/Summarize';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import ItemTabs from "../../../components/shared/mui/tabs/tabs.component.tsx"

const CaloriesBurned = () => {
  const { trackedCaloriesBurned, scheduledTrackedCaloriesBurnedView } = useContext(CaloriesBurnedContext)

  let tabList = []
  let panelList = []

  if (trackedCaloriesBurned && trackedCaloriesBurned.length !== 0) {
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
      children: <SummaryInfo/>
    })
    panelList.push({
      value: "filter",
      children: (
        <CaloriesBurnedFilterContainer>
          <ActivityDateFilter></ActivityDateFilter>
          <CaloriesBurnedGraphLine></CaloriesBurnedGraphLine>
          <CaloriesBurnedGraphPie></CaloriesBurnedGraphPie>
          <CaloriesBurnedTable></CaloriesBurnedTable>
        </CaloriesBurnedFilterContainer>
      )
    })
  }

  tabList.push({
    value: "add-activity",
    icon: <AddIcon/>,
    label: "Add Activity"
  })

  panelList.push({
    value: "add-activity",
    children: (
      <AddActivityContainer>
        <ActivityDateForm></ActivityDateForm>
        <ActivityDateTable></ActivityDateTable>
      </AddActivityContainer>
    )
  })

  return (
    <CaloriesBurnedContainer>
      <ScheduleCalendar></ScheduleCalendar>
      {
        scheduledTrackedCaloriesBurnedView ?
        <ScheduleDayInfo></ScheduleDayInfo> : null
      }

      <br/>

      <ItemTabs tabList={ tabList } panelList={ panelList }></ItemTabs>
    </CaloriesBurnedContainer>
  )

  // return (
  //   <div className="calories-burned-container">
  //     <ScheduleCalendar></ScheduleCalendar>
  //     {
  //       scheduledTrackedCaloriesBurnedView ?
  //       <ScheduleDayInfo></ScheduleDayInfo> : null
  //     }

  //     {
  //       trackedCaloriesBurned.length ? 
  //         <Fragment>
  //           <h2>Summary</h2>
  //           <div className="calories-burned-summary-container">
  //             <SummaryInfo></SummaryInfo> 
  //             <ActivityDateFilter></ActivityDateFilter>
  //           </div>

  //           <div className="calories-burned-summary-separator-container">
  //             <hr className="calories-burned-rounded"/>
  //           </div>

  //           <h2>Tracked Summary</h2>
  //           <div className="calories-burned-view-container">
  //             <div className="calories-burned-graph-container">
  //               <CaloriesBurnedGraphLine></CaloriesBurnedGraphLine>
  //               <CaloriesBurnedGraphPie></CaloriesBurnedGraphPie>
  //             </div>
  //             <CaloriesBurnedTable></CaloriesBurnedTable>
  //           </div>

  //           <div className="calories-burned-summary-separator-container">
  //             <hr className="calories-burned-rounded"/>
  //           </div>
  //         </Fragment>
  //         : null
  //       }

  //     <div className="add-activity-container">
  //       <h3>Add an activity</h3>
  //       <ActivityDateForm></ActivityDateForm>
  //       <ActivityDateTable></ActivityDateTable>
  //     </div>
  //   </div>
  // )
}

export default CaloriesBurned