import "./calories-burned.styles.scss"

import SummaryInfo from "../../../components/signed-in/calories-burned/summary/summary-info/summary-info.component"
import ActivityDateFilter from "../../../components/signed-in/calories-burned/summary/activity-date-filter/activity-date-filter.component"

import CaloriesBurnedGraphPie from "../../../components/signed-in/calories-burned/view/calories-burned-graph/calories-burned-graph-pie.component"
import CaloriesBurnedGraphLine from "../../../components/signed-in/calories-burned/view/calories-burned-graph/calories-burned-graph-line.component"
import CaloriesBurnedTable from "../../../components/signed-in/calories-burned/view/calories-burned-table/calories-burned-table.component"

import ActivityDateForm from "../../../components/signed-in/calories-burned/add-activity/activity-date-form/activity-date-form.component"
import ActivityDateTable from "../../../components/signed-in/calories-burned/add-activity/activity-date-table/activity-date-table.component"

import { Fragment, useContext } from "react"
import { CaloriesBurnedContext } from "../../../contexts/signed-in/calories-burned/calories-burned.context"

import ScheduleCalendar from "../../../components/signed-in/calories-burned/schedule/schedule-calendar/schedule-calendar.component"
import ScheduleDayInfo from "../../../components/signed-in/calories-burned/schedule/schedule-day-info/schedule-day-info.component"

const CaloriesBurned = () => {
  const { trackedCaloriesBurned, scheduledTrackedCaloriesBurnedView } = useContext(CaloriesBurnedContext)
  console.log(scheduledTrackedCaloriesBurnedView)

  return (
    <div className="calories-burned-container">
      <ScheduleCalendar></ScheduleCalendar>
      {
        scheduledTrackedCaloriesBurnedView ?
        <ScheduleDayInfo></ScheduleDayInfo> : null
      }

      {
        trackedCaloriesBurned.length ? 
          <Fragment>
            <h2>Summary</h2>
            <div className="calories-burned-summary-container">
              <SummaryInfo></SummaryInfo> 
              <ActivityDateFilter></ActivityDateFilter>
            </div>

            <div className="calories-burned-summary-separator-container">
              <hr className="calories-burned-rounded"/>
            </div>

            <h2>Tracked Summary</h2>
            <div className="calories-burned-view-container">
              <div className="calories-burned-graph-container">
                <CaloriesBurnedGraphLine></CaloriesBurnedGraphLine>
                <CaloriesBurnedGraphPie></CaloriesBurnedGraphPie>
              </div>
              <CaloriesBurnedTable></CaloriesBurnedTable>
            </div>

            <div className="calories-burned-summary-separator-container">
              <hr className="calories-burned-rounded"/>
            </div>
          </Fragment>
          : null
        }

      <div className="add-activity-container">
        <h3>Add an activity</h3>
        <ActivityDateForm></ActivityDateForm>
        <ActivityDateTable></ActivityDateTable>
      </div>
    </div>
  )
}

export default CaloriesBurned