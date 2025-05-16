import "./activity-date-table.styles.js"
import { SearchedCaloriesBurnedActivitiesTableContainer,
  SearchedCaloriesBurnedActivitiesTable
} from "./activity-date-table.styles.js";
import { useState, useContext, useRef, MouseEvent } from "react"

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { CaloriesBurnedContext } from "../../../../../contexts/signed-in/calories-burned/calories-burned.context.js";
import Button from "../../../../shared/button/button.component.js";
import { COLOR_CODES, COMMON_SPACING } from "../../../../../utils/constants/shared.constants.js";
import { Typography } from "@mui/material";
import SimplePaper from "../../../../shared/mui/paper/paper.component.js";
import { ButtonsContainer } from "../../../../shared/button/button.styles.js";
import { ColDef } from "ag-grid-community";
import { AgGridReact as AgGridReactType } from "ag-grid-react"; // Needed for typing

type CaloriesBurnedData = {
  Activity: string,
  CaloriesBurnedPerHour: string,
  SearchedActivity: string,
  DurationMinutes: string,
  TotalCaloriesBurned: string,
  DateTracked: string
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["8"],
  padding: "2%",
}

const ActivityDateTable = () => {
  const gridRef = useRef<AgGridReactType<CaloriesBurnedData>>(null)
  const { searchActivityResults, addTrackedActivityDate } = useContext(CaloriesBurnedContext)
  
  const rowData: CaloriesBurnedData[] = searchActivityResults.map((activityResult) => {
    return {
      Activity: activityResult.activity,
      SearchedActivity: activityResult.searchedActivity,
      DateTracked: activityResult.dateTracked.toString(), // if it's a Date, convert to string
      CaloriesBurnedPerHour: activityResult.caloriesBurnedPerHour.toString(),
      DurationMinutes: activityResult.durationMinutes.toString(),
      TotalCaloriesBurned: activityResult.totalCaloriesBurned.toString()
    };
  });

  // column definitions
  const columnDefs: ColDef<CaloriesBurnedData>[] = [
    { field: "Activity" },
    { field: "CaloriesBurnedPerHour" },
    { field: "DurationMinutes" },
    { field: "TotalCaloriesBurned" },
    { field: "DateTracked" }
  ]

  const onAddSelected = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const selectedData = gridRef?.current?.api.getSelectedRows()
    // TODO: better manage selectedData[0] without the 0 in index
    if (!selectedData || !selectedData[0] || selectedData[0].Activity === undefined) {
      return;
    }

    

    await addTrackedActivityDate({
      dateTracked: selectedData[0]?.DateTracked,
      activity: selectedData[0]?.SearchedActivity,
      durationMinutes: selectedData[0]?.DurationMinutes,
      caloriesBurnedPerHour: selectedData[0]?.CaloriesBurnedPerHour,
      totalCaloriesBurned: selectedData[0]?.TotalCaloriesBurned,
      searchActivity: selectedData[0]?.SearchedActivity
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