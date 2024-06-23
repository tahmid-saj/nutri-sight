import "./activity-date-table.styles.jsx"
import { SearchedCaloriesBurnedActivitiesTableContainer,
  SearchedCaloriesBurnedActivitiesTable
} from "./activity-date-table.styles.jsx";
import { useState, useContext, useRef } from "react"

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { CaloriesBurnedContext } from "../../../../../contexts/signed-in/calories-burned/calories-burned.context";
import Button from "../../../../shared/button/button.component";
import { COLOR_CODES, COMMON_SPACING } from "../../../../../utils/constants/shared.constants.js";
import { Typography } from "@mui/material";
import SimplePaper from "../../../../shared/mui/paper/paper.component.jsx";
import { ButtonsContainer } from "../../../../shared/button/button.styles.jsx";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["8"],
  padding: "2%",
}

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

  const onAddSelected = async (event) => {
    event.preventDefault()
    const selectedData = gridRef.current.api.getSelectedRows()
    // TODO: better manage selectedData[0] without the 0 in index
    if (!selectedData[0] || selectedData[0] === null || !selectedData[0].Activity || selectedData[0] === undefined) {
      return
    }

    

    await addTrackedActivityDate({
      dateTracked: selectedData[0].DateTracked,
      activity: selectedData[0].SearchedActivity,
      durationMinutes: selectedData[0].DurationMinutes,
      caloriesBurnedPerHour: selectedData[0].CaloriesBurnedPerHour,
      totalCaloriesBurned: selectedData[0].TotalCaloriesBurned
    })
  }

  return (
    // wrapping container with theme & size
    <SearchedCaloriesBurnedActivitiesTableContainer>
      <div className="container">
        <Typography sx={{ color: COLOR_CODES.general["0"], marginLeft: "2%" }} variant="h6">Select the searched activities to track</Typography>
        <SimplePaper styles={ paperStyles }>
          <SearchedCaloriesBurnedActivitiesTable>
            <div className="ag-theme-quartz-dark"
              style={{ height: COMMON_SPACING.table.height, width: COMMON_SPACING.table.width }}>
              <AgGridReact rowData={ rowData } columnDefs={ columnDefs } ref={ gridRef } rowSelection={ "single" }/>
            </div>
          </SearchedCaloriesBurnedActivitiesTable>

          <div className="row">
            <div className="col-12">
              <div className="btn-group flex-wrap">
                <Button onClick={ (e) => onAddSelected(e) }>Add Selected</Button>
              </div>
            </div>
          </div>
        </SimplePaper>
      </div>
    </SearchedCaloriesBurnedActivitiesTableContainer>
  )
}

export default ActivityDateTable