import "./nutrition-tracker-table.styles.scss"
import { useContext, useState, useRef } from "react"

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { NutritionTrackerContext } from "../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context";
import Button from "../../../shared/button/button.component";

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

  return (
    // wrapping container with theme & size
    <div className="ag-theme-quartz-dark filter-nutrition-tracker-table-container" // applying the grid theme
      style={{ height: 700, width: '85%' }} // the grid will fill the size of the parent container
      >
      <h3>Filter or remove tracked date</h3>

      <AgGridReact rowData={ rowData } columnDefs={ columnDefs } ref={ gridRef } rowSelection={ "single" }/>
      <div className="remove-tracked-date-selected-button">
        <Button onClick={ (e) => onRemoveSelected(e) }>Remove Selected</Button>
        <Button type="button" onClick={ clearDayTrackedFilter }>Clear Filter</Button>
      </div>
    </div>
  )
}

export default NutritionTrackerTable