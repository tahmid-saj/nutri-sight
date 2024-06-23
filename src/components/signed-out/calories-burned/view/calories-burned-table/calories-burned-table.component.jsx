import "./calories-burned-table.styles.jsx"
import { FilterCaloriesBurnedActivitiesTableContainer, FilterCaloriesBurnedActivitiesTable } from "./calories-burned-table.styles.jsx";
import { useContext, useState, useRef } from "react"

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { CaloriesBurnedContext } from "../../../../../contexts/signed-out/calories-burned/calories-burned.context";
import Button from "../../../../shared/button/button.component";

import { COLOR_CODES, COMMON_SPACING } from "../../../../../utils/constants/shared.constants.js";
import { Typography } from "@mui/material";
import SimplePaper from "../../../../shared/mui/paper/paper.component.jsx";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["8"],
  padding: "2%",
}

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
  
      
  
      removeActivityDate(selectedData[0].Tag)
    }

  return (
    // wrapping container with theme & size
    <FilterCaloriesBurnedActivitiesTableContainer>
      <div className="container">
        <Typography sx={{ color: COLOR_CODES.general["0"], marginLeft: "2%" }} variant="h6">Filter or remove activity</Typography>
        <SimplePaper styles={ paperStyles }>
          <FilterCaloriesBurnedActivitiesTable>
            <div className="ag-theme-quartz-dark"
              style={{ height: COMMON_SPACING.table.height, width: COMMON_SPACING.table.width }}>
              <AgGridReact rowData={ rowData } columnDefs={ columnDefs } ref={ gridRef } rowSelection={ "single" }/>
            </div>
          </FilterCaloriesBurnedActivitiesTable>

            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <Button onClick={ (e) => onRemoveSelected(e) }>Remove Selected</Button>
                  <Button type="button" onClick={ clearActivityDatesFilter }>Clear Filter</Button>
                </div>
              </div>
            </div>
        </SimplePaper>
      </div>
    </FilterCaloriesBurnedActivitiesTableContainer>
  )
}

export default CaloriesBurnedTable