import "./schedule-day-info.styles.scss"
import { useState, useContext, Fragment } from "react"
import { Typography } from "@mui/material";

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import SimplePaper from "../../../../../shared/mui/paper/paper.component";
import { COLOR_CODES, COMMON_SPACING } from "../../../../../../utils/constants/shared.constants";
import { FitnessContext } from "../../../../../../contexts/signed-out/fitness/fitness.context";
import Button from "../../../../../shared/button/button.component";
import { ButtonsContainer } from "../../../../../shared/button/button.styles";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["8"],
  height: COMMON_SPACING.calendarDayInfo.height
}

const ScheduleDayInfo = () => {
  const { exercisesView, removeExercise, unselectScheduledExercise } = useContext(FitnessContext)
  console.log(exercisesView)

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

  const handleUnselect = (event) => {
    event.preventDefault()
    unselectScheduledExercise()
  }

  return (
    <div className="fitness-schedule-day-info-container">
      <Typography sx={{ display: "flex", marginLeft: "2%", color: COLOR_CODES.general["0"] }} 
        variant="h6">{`Exercises planned`}</Typography>

      <SimplePaper styles={ paperStyles }>
        <div className="ag-theme-quartz-dark fitness-schedule-day-info" // applying the grid theme
          style={{ height: 500, width: '100%' }} // the grid will fill the size of the parent container
          >
          <AgGridReact 
            rowData={ rowData } 
            columnDefs={ columnDefs } rowSelection={ "multiple" }/>
            <ButtonsContainer>
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