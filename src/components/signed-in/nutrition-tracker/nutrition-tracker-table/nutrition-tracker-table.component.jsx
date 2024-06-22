import "./nutrition-tracker-table.styles.jsx"
import { FilterNutritionTrackerTableContainer, FilterButtonsContainer } from "./nutrition-tracker-table.styles.jsx";
import { useContext, useState, useRef } from "react"

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { NutritionTrackerContext } from "../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context";
import Button from "../../../shared/button/button.component";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js";
import { Typography } from "@mui/material";
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["8"],
  margin: "0% 2% 0% 2%",
  height: COMMON_SPACING.filterTable.height
}

const NutritionTrackerTable = () => {
  const gridRef = useRef()
  const { nutritionTrackedDaysView, removeDayTracked, clearDayTrackedFilter } = useContext(NutritionTrackerContext)

  const rowData = nutritionTrackedDaysView.map((trackedDate) => {
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
  const [columnDefs, setColumnDefs] = useState([
    { field: "DateTracked" },
    { field: "Calories" },
    { field: "Carbohydrates" },
    { field: "Protein" },
    { field: "Fat" },
    { field: "Micronutrients" }
  ])

  const onRemoveSelected = async (event) => {
    event.preventDefault()
    const selectedData = gridRef.current.api.getSelectedRows()
    // TODO: better manage selectedData[0] without the 0 in index
    if (!selectedData[0] || selectedData[0] === null || !selectedData[0].DateTracked || selectedData[0] === undefined) {
      return
    }

    console.log(selectedData[0])

    await removeDayTracked(selectedData[0].DateTracked)
  }

  const onClearFilter = (event) => {
    event.preventDefault()
    clearDayTrackedFilter()
  }

  return (
    // wrapping container with theme & size
    <SimplePaper styles={ paperStyles }>
      <Typography sx={{ color: COLOR_CODES.general["5"] }} variant="h6">Filter or remove tracked date</Typography>
      <FilterNutritionTrackerTableContainer>
        <div className="ag-theme-quartz-dark" // applying the grid theme
          style={{ height: 475, width: COMMON_SPACING.table.width }} // the grid will fill the size of the parent container
          >

          <AgGridReact rowData={ rowData } columnDefs={ columnDefs } ref={ gridRef } rowSelection={ "single" }/>
          <FilterButtonsContainer>
            <div className="container">
              <div className="row justify-content-left align-items-center">
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <Button onClick={ (e) => onRemoveSelected(e) }>Remove Selected</Button>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <Button type="button" onClick={ onClearFilter }>Clear Filter</Button>
                </div>
              </div>
            </div>
          </FilterButtonsContainer>
        </div>
      </FilterNutritionTrackerTableContainer>
    </SimplePaper>
  )
}

export default NutritionTrackerTable