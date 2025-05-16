import "./schedule-day-info.styles.tsx"
import { FitnessScheduleDayInfoContainer,
  FitnessScheduleDayInfo
} from "./schedule-day-info.styles.tsx";
import { useState, useContext, useRef, Fragment, MouseEvent } from "react"
import { Typography } from "@mui/material";

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import Button from "../../../../shared/button/button.component.tsx";
import { ButtonsContainer } from "../../../../shared/button/button.styles.tsx";
import SimplePaper from "../../../../shared/mui/paper/paper.component.tsx";
import { COLOR_CODES, COMMON_SPACING } from "../../../../../utils/constants/shared.constants.ts";
import { FitnessContext } from "../../../../../contexts/signed-in/fitness/fitness.context.tsx";

import { ColDef } from "ag-grid-community";
import { AgGridReact as AgGridReactType } from "ag-grid-react"; // Needed for typing

type FitnessData = {
  Date: string,
  Exercise: string,
  Sets: string,
  Reps: string,
  Type: string,
  Muscle: string,
  Equipment: string,
  Difficulty: string,
  Instructions: string,
  Tag: string
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["8"],
  height: COMMON_SPACING.calendarDayInfo.height,
}

const ScheduleDayInfo = () => {
  const { exercisesView, removeExercise, unselectScheduledExercise } = useContext(FitnessContext)

  const gridRef = useRef<AgGridReactType<FitnessData>>(null)

  const rowData: FitnessData[] = exercisesView.map((exercise) => {
    return {
      Date: typeof exercise.exerciseDate === 'string'
        ? exercise.exerciseDate
        : new Date(exercise.exerciseDate).toISOString(), // or toLocaleDateString()
      Exercise: exercise.exerciseName,
      Sets: exercise.exerciseSets.toString(),
      Reps: exercise.exerciseReps.toString(),
      Type: exercise.exerciseType,
      Muscle: exercise.exerciseMuscle,
      Equipment: exercise.exerciseEquipment,
      Difficulty: exercise.exerciseDifficulty,
      Instructions: exercise.exerciseInstructions,
      Tag: exercise.exerciseTag.toString(),
    }
  })

  // column definitions
  const columnDefs: ColDef<FitnessData>[] = [
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
  ]

  const onRemoveSelected = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const selectedData = gridRef?.current?.api.getSelectedRows();
    if (!selectedData || !selectedData[0] || selectedData[0].Tag === undefined) {
      return;
    }
    
    removeExercise(Number(selectedData[0].Tag))
  }

  const handleUnselect = (event: MouseEvent<HTMLButtonElement>) => {
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