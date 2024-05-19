import "./calories-burned.styles.scss"

import SummaryInfo from "./summary/summary-info/summary-info.component"
import ActivityDateFilter from "./summary/activity-date-filter/activity-date-filter.component"

import CaloriesBurnedGraphPie from "./view/calories-burned-graph/calories-burned-graph-pie.component"
import CaloriesBurnedGraphLine from "./view/calories-burned-graph/calories-burned-graph-line.component"
import CaloriesBurnedTable from "./view/calories-burned-table/calories-burned-table.component"

import ActivityDateForm from "./add-activity/activity-date-form/activity-date-form.component"
import ActivityDateTable from "./add-activity/activity-date-table/activity-date-table.component"

import { Fragment, useContext } from "react"
import { CaloriesBurnedContext } from "../../../contexts/signed-in/calories-burned/calories-burned.context"

const CaloriesBurned = () => {
  const { trackedCaloriesBurned } = useContext(CaloriesBurnedContext)

  return (
    <div className="calories-burned-container">
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