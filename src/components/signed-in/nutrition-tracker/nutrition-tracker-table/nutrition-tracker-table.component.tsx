import "./nutrition-tracker-table.styles.tsx"
import { FilterNutritionTrackerTableContainer, FilterButtonsContainer } from "./nutrition-tracker-table.styles.tsx";
import { useContext, useState, useRef, MouseEvent } from "react"

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { NutritionTrackerContext } from "../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context.tsx";
import Button from "../../../shared/button/button.component.tsx";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.ts";
import { Typography } from "@mui/material";
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import { NutritionTrackedDay } from "../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.types.js";

import { ColDef } from "ag-grid-community";
import { AgGridReact as AgGridReactType } from "ag-grid-react"; // Needed for typing

type NutritionTrackedDayData = {
  DateTracked: string,
  Calories: string,
  Carbohydrates: string,
  Protein: string,
  Fat: string,
  Micronutrients: string
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["8"],
  margin: "0% 2% 0% 2%",
}

const NutritionTrackerTable = () => {
  const gridRef = useRef<AgGridReactType<NutritionTrackedDayData>>(null)
  const { nutritionTrackedDaysView, removeDayTracked, clearDayTrackedFilter } = useContext(NutritionTrackerContext)

  const rowData = nutritionTrackedDaysView.map((trackedDate: NutritionTrackedDay) => {
    return {
      DateTracked: trackedDate.dateTracked,
      Calories: trackedDate.calories,
      Carbohydrates: trackedDate.macronutrients.carbohydrates,
      Protein: trackedDate.macronutrients.protein,
      Fat: trackedDate.macronutrients.fat,
      Micronutrients: trackedDate.micronutrients.map((micronutrient) => {
        return `${micronutrient.name} (${micronutrient.amount} ${micronutrient.unit})\n`
      })
    }
  })

  // column definitions
  const columnDefs: ColDef<NutritionTrackedDayData>[] = [
    { field: "DateTracked" },
    { field: "Calories" },
    { field: "Carbohydrates" },
    { field: "Protein" },
    { field: "Fat" },
    { field: "Micronutrients" }
  ]

  const onRemoveSelected = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const selectedData = gridRef?.current?.api.getSelectedRows()
    // TODO: better manage selectedData[0] without the 0 in index
    if (!selectedData || !selectedData[0] || selectedData[0].DateTracked === undefined) {
      return;
    }

    await removeDayTracked(selectedData[0].DateTracked)
  }

  const onClearFilter = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    clearDayTrackedFilter()
  }

  return (
    // wrapping container with theme & size
    <div className="container">
      <SimplePaper styles={ paperStyles }>
        <Typography sx={{ color: COLOR_CODES.general["5"] }} variant="h6">Filter or remove tracked date</Typography>
        <FilterNutritionTrackerTableContainer>
          <div className="ag-theme-quartz-dark" // applying the grid theme
            style={{ height: 500, width: COMMON_SPACING.table.width }} // the grid will fill the size of the parent container
            >
              <AgGridReact rowData={ rowData } columnDefs={ columnDefs } ref={ gridRef } rowSelection={ "single" }/>
          </div>

        <FilterButtonsContainer>
          <div className="row">
            <div className="col-12">
              <div className="btn-group flex-wrap" role="group">
                <Button onClick={ (e) => onRemoveSelected(e) }>Remove Selected</Button>
                <Button type="button" onClick={ onClearFilter }>Clear Filter</Button>
              </div>
            </div>
          </div>
        </FilterButtonsContainer>
        </FilterNutritionTrackerTableContainer>
      </SimplePaper>
    </div>
  )
}

export default NutritionTrackerTable