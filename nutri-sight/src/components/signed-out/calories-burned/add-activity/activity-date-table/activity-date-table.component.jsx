import "./activity-date-table.styles.scss"
import { useState, useContext, useRef } from "react"

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { CaloriesBurnedContext } from "../../../../../contexts/signed-out/calories-burned/calories-burned.context";
import Button from "../../../../shared/button/button.component";

const ActivityDateTable = () => {
  const gridRef = useRef()
  const { searchActivityResults, addTrackedActivityDate } = useContext(CaloriesBurnedContext)
  
  const rowData = searchActivityResults.map((activityResult) => {
    return {
      Activity: activityResult.activity,
      SearchedActivity: activityResult.searchedActivity,
      DateTracked: activityResult.dateTracked,
      CaloriesBurnedPerHour: activityResult.caloriesBurnedPerHour,
      DurationMinutes: activityResult.durationMinutes,
      TotalCaloriesBurned: activityResult.totalCaloriesBurned
    }
  })

  // column definitions
  const [columnDefs, setColumnDefs] = useState([
    { field: "Activity" },
    { field: "CaloriesBurnedPerHour" },
    { field: "DurationMinutes" },
    { field: "TotalCaloriesBurned" },
    { field: "DateTracked" }
  ])

  const onAddSelected = (event) => {
    event.preventDefault()
    const selectedData = gridRef.current.api.getSelectedRows()
    // TODO: better manage selectedData[0] without the 0 in index
    if (!selectedData[0] || selectedData[0] === null || !selectedData[0].Activity || selectedData[0] === undefined) {
      return
    }

    console.log(selectedData[0])

    addTrackedActivityDate({
      dateTracked: selectedData[0].DateTracked,
      activity: selectedData[0].SearchedActivity,
      durationMinutes: selectedData[0].DurationMinutes,
      caloriesBurnedPerHour: selectedData[0].CaloriesBurnedPerHour,
      totalCaloriesBurned: selectedData[0].TotalCaloriesBurned
    })
  }

  return (
    // wrapping container with theme & size
    <div className="ag-theme-quartz-dark searched-calories-burned-activities-table-container" // applying the grid theme
      style={{ height: 700, width: '65%' }} // the grid will fill the size of the parent container
      >
      <h3>Select the searched activities to track</h3>
      <AgGridReact rowData={ rowData } columnDefs={ columnDefs } ref={ gridRef } rowSelection={ "single" }/>
      <div className="add-activity-selected-button buttons-container">
        <Button onClick={ (e) => onAddSelected(e) }>Add Selected</Button>
      </div>
    </div>
  )
}

export default ActivityDateTable