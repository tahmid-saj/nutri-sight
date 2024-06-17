import "./schedule-day-info.styles.scss"
import { useState, useContext, useRef, Fragment } from "react"
import { Typography } from "@mui/material";

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import Button from "../../../../shared/button/button.component";
import { ButtonsContainer } from "../../../../shared/button/button.styles";
import SimplePaper from "../../../../shared/mui/paper/paper.component";
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants";

const paperStyles = {
  backgroundColor: COLOR_CODES.paper.formPaper,
  height: 600
}

const ScheduleDayInfo = () => {
  const gridRef = useRef()

  // column definitions
  const [columnDefs, setColumnDefs] = useState([
    { field: "Date" },
    { field: "Exercise" },
    { field: "Sets" },
    { field: "Reps" },
    { field: "Type" },
    { field: "Muscle" },
    { field: "Equipment" },
    { field: "Difficulty" },
    { field: "Instructions" },
  ])

  const onRemoveSelected = (event) => {
    event.preventDefault()
    const selectedData = gridRef.current.api.getSelectedRows();
    // TODO: better manage selectedData[0] without the 0 in index
    if (!selectedData[0] || selectedData[0] === null || !selectedData[0].Tag || selectedData[0] === undefined) {
      return
    }

    console.log(selectedData[0])
    // removeInsurance(selectedData[0].For)
  }

  return (
    <Fragment>
      <Typography sx={{ display: "flex", marginLeft: "2%" }} 
        variant="h6">{`Exercises planned`}</Typography>

      <SimplePaper styles={ paperStyles }>
        <div className="ag-theme-quartz-dark fitness-schedule-day-info" // applying the grid theme
          style={{ height: 500, width: '100%' }} // the grid will fill the size of the parent container
          >
          <AgGridReact 
            // rowData={ rowData } 
            columnDefs={ columnDefs } ref={ gridRef } rowSelection={ "multiple" }/>
            <ButtonsContainer>
              <div className="remove-exercise-selected-button">
                <Button onClick={ (e) => onRemoveSelected(e) }>Remove Selected</Button>
              </div>
            </ButtonsContainer>
        </div>
      </SimplePaper>
    </Fragment>
  )
}

export default ScheduleDayInfo