import "./schedule-day-info.styles.jsx"
import { FitnessScheduleDayInfoContainer,
  FitnessScheduleDayInfo
} from "./schedule-day-info.styles.jsx";
import { useState, useContext, useRef, Fragment } from "react"
import { Typography } from "@mui/material";

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import Button from "../../../../shared/button/button.component";
import { ButtonsContainer } from "../../../../shared/button/button.styles";
import SimplePaper from "../../../../shared/mui/paper/paper.component";
import { COLOR_CODES, COMMON_SPACING } from "../../../../../utils/constants/shared.constants";
import { FitnessContext } from "../../../../../contexts/signed-out/fitness/fitness.context";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["8"],
  height: COMMON_SPACING.calendarDayInfo.height,
}

const ScheduleDayInfo = () => {
  const { exercisesView, removeExercise, unselectScheduledExercise } = useContext(FitnessContext)
  

  const gridRef = useRef()

  const rowData = exercisesView.map((exercise) => {
    return {
      // AddToExpenses: "",
      Date: exercise.exerciseDate,
      Exercise: exercise.exerciseName,
      Sets: exercise.exerciseSets,
      Reps: exercise.exerciseReps,
      Type: exercise.exerciseType,
      Muscle: exercise.exerciseMuscle,
      Equipment: exercise.exerciseEquipment,
      Difficulty: exercise.exerciseDifficulty,
      Instructions: exercise.exerciseInstructions,
      Tag: exercise.exerciseTag
    }
  })

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
    { field: "Tag" },
  ])

  const onRemoveSelected = (event) => {
    event.preventDefault()
    const selectedData = gridRef.current.api.getSelectedRows();
    // TODO: better manage selectedData[0] without the 0 in index
    if (!selectedData[0] || selectedData[0] === null || !selectedData[0].Tag || selectedData[0] === undefined) {
      return
    }

    
    removeExercise(selectedData[0].Tag)
  }

  const handleUnselect = (event) => {
    event.preventDefault()
    unselectScheduledExercise()
  }

  return (
    <FitnessScheduleDayInfoContainer>
      <Typography sx={{ display: "flex", marginLeft: "2%", color: COLOR_CODES.general["0"] }} 
          variant="h6">{`Exercises planned`}</Typography>

      <SimplePaper styles={ paperStyles }>
        <FitnessScheduleDayInfo>
          <div className="ag-theme-quartz-dark" // applying the grid theme
            style={{ height: 475, width: '100%' }} // the grid will fill the size of the parent container
            >
            <AgGridReact 
              rowData={ rowData } 
              columnDefs={ columnDefs } rowSelection={ "multiple" }/>
          </div>
        </FitnessScheduleDayInfo>

        <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap" role="group">
                  <Button type="button" onClick={ (e) => onRemoveSelected(e) }>Remove Selected</Button>
                  <Button type="button" onClick={ (e) => handleUnselect(e) }>Unselect</Button>
                </div>
              </div>
            </div>
          </div>
      </SimplePaper>
    </FitnessScheduleDayInfoContainer>
  )
}

export default ScheduleDayInfo