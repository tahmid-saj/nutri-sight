import "./calories-burned-table.styles.js"
import { FilterCaloriesBurnedActivitiesTableContainer, FilterCaloriesBurnedActivitiesTable } from "./calories-burned-table.styles.js";
import { useContext, useState, useRef, MouseEvent } from "react"

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { CaloriesBurnedContext } from "../../../../../contexts/signed-in/calories-burned/calories-burned.context.js";
import Button from "../../../../shared/button/button.component.js";

import { COLOR_CODES, COMMON_SPACING } from "../../../../../utils/constants/shared.constants.js";
import { Typography } from "@mui/material";
import SimplePaper from "../../../../shared/mui/paper/paper.component.js";

import { ColDef } from "ag-grid-community";
import { AgGridReact as AgGridReactType } from "ag-grid-react"; // Needed for typing

type CaloriesBurnedData = {
  Activity: string,
  DateTracked: string,
  TotalCaloriesBurned: string,
  CaloriesBurnedPerHour: string,
  DurationMinutes: string,
  Tag: string,
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["8"],
  padding: "2%",
}

const CaloriesBurnedTable = () => {
  const gridRef = useRef<AgGridReactType<CaloriesBurnedData>>(null)
  const { trackedCaloriesBurnedView, removeActivityDate, clearActivityDatesFilter } = useContext(CaloriesBurnedContext)
  const rowData = trackedCaloriesBurnedView.map((trackedCaloriesBurned) => {
    return {
      Activity: trackedCaloriesBurned.activity,
      DateTracked: trackedCaloriesBurned.dateTracked.toString(),
      CaloriesBurnedPerHour: trackedCaloriesBurned.caloriesBurnedPerHour.toString(),
      DurationMinutes: trackedCaloriesBurned.durationMinutes.toString(),
      TotalCaloriesBurned: trackedCaloriesBurned.totalCaloriesBurned.toString(),
      Tag: trackedCaloriesBurned.activityId.toString()
    }
  })

    // column definitions
    const columnDefs: ColDef<CaloriesBurnedData>[] = [
      { field: "Activity" },
      { field: "DateTracked" },
      { field: "TotalCaloriesBurned" },
      { field: "CaloriesBurnedPerHour" },
      { field: "DurationMinutes" },
      { field: "Tag" },
    ]
  
    const onRemoveSelected = async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      const selectedData = gridRef?.current?.api.getSelectedRows()
      // TODO: better manage selectedData[0] without the 0 in index
      if (!selectedData || !selectedData[0] || selectedData[0].Activity === undefined) {
        return;
      }
      
  
      await removeActivityDate(Number(selectedData[0].Tag))
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