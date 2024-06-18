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
import { FitnessContext } from "../../../../../contexts/signed-in/fitness/fitness.context";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["8"],
  height: 600
}

const ScheduleDayInfo = () => {
  const { exercisesView, removeExercise, unselectScheduledExercise } = useContext(FitnessContext)
  console.log(exercisesView)

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

    console.log(selectedData[0])
    removeExercise(selectedData[0].Tag)
  }

  const handleUnselect = (event) => {
    event.preventDefault()
    unselectScheduledExercise()
  }

  return (
    <div className="fitness-schedule-day-info-container">
      <Typography sx={{ display: "flex", marginLeft: "2%" }} 
        variant="h6">{`Exercises planned`}</Typography>

      <SimplePaper styles={ paperStyles }>
        <div className="ag-theme-quartz-dark fitness-schedule-day-info" // applying the grid theme
          style={{ height: 500, width: '100%' }} // the grid will fill the size of the parent container
          >
          <AgGridReact 
            rowData={ rowData } 
            columnDefs={ columnDefs } ref={ gridRef } rowSelection={ "multiple" }/>
            <ButtonsContainer>
              <div className="remove-exercise-selected-button">
                <Button type="button" onClick={ (e) => onRemoveSelected(e) }>Remove</Button>
              </div>
              <div className="unselect-exercise-button">
                <Button type="button" onClick={ (e) => handleUnselect(e) }>Unselect</Button>
              </div>
            </ButtonsContainer>
        </div>
      </SimplePaper>
    </div>
  )
}

export default ScheduleDayInfo