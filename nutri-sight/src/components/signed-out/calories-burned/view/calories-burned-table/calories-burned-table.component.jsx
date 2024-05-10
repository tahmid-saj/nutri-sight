import "./calories-burned-table.styles.scss"
import { useContext, useState, useRef } from "react"

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { CaloriesBurnedContext } from "../../../../../contexts/signed-out/calories-burned/calories-burned.context";
import Button from "../../../../shared/button/button.component";

const CaloriesBurnedTable = () => {
  const gridRef = useRef()
  const { trackedCaloriesBurnedView, removeActivityDate, clearActivityDatesFilter } = useContext(CaloriesBurnedContext)
  const rowData = trackedCaloriesBurnedView.map((trackedCaloriesBurned) => {
    return {
      Activity: trackedCaloriesBurned.activity,
      DateTracked: trackedCaloriesBurned.dateTracked,
      CaloriesBurnedPerHour: trackedCaloriesBurned.caloriesBurnedPerHour,
      DurationMinutes: trackedCaloriesBurned.durationMinutes,
      TotalCaloriesBurned: trackedCaloriesBurned.totalCaloriesBurned,
      Tag: trackedCaloriesBurned.activityId
    }
  })

    // column definitions
    const [columnDefs, setColumnDefs] = useState([
      { field: "Activity" },
      { field: "DateTracked" },
      { field: "TotalCaloriesBurned" },
      { field: "CaloriesBurnedPerHour" },
      { field: "DurationMinutes" },
      { field: "Tag" },
    ])
  
    const onRemoveSelected = (event) => {
      event.preventDefault()
      const selectedData = gridRef.current.api.getSelectedRows()
      // TODO: better manage selectedData[0] without the 0 in index
      if (!selectedData[0] || selectedData[0] === null || !selectedData[0].Activity || selectedData[0] === undefined) {
        return
      }
  
      console.log(selectedData[0])
  
      removeActivityDate(selectedData[0].Tag)
    }

  return (
    // wrapping container with theme & size
    <div className="ag-theme-quartz-dark filter-calories-burned-activities-table-container" // applying the grid theme
      style={{ height: 700, width: '65%' }} // the grid will fill the size of the parent container
      >
      <h3>Filter or remove activity</h3>

      <AgGridReact rowData={ rowData } columnDefs={ columnDefs } ref={ gridRef } rowSelection={ "single" }/>
      <div className="remove-activity-selected-button">
        <Button onClick={ (e) => onRemoveSelected(e) }>Remove Selected</Button>
        <Button type="button" onClick={ clearActivityDatesFilter }>Clear Filter</Button>
      </div>
    </div>
  )
}

export default CaloriesBurnedTable