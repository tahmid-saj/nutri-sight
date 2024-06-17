import { create } from "@mui/material/styles/createTransitions";
import { useState, useEffect, createContext } from "react";

// helper functions
const searchExerciseHelper = (exerciseQuery) => {

}

const addExerciseHelper = (exercises, exercisesTagLimit, exercise) => {

}

const selectScheduledExerciseHelper = (exercises, exerciseDate) => {

}

const removeExerciseHelper = (exercises, exerciseTag) => {

}

// initial state
export const FitnessContext = create({
  exercises: [],
  // exercises structure:
  // [
  //   {
  //     exerciseDate: "",
  //     exerciseName: "",
  //     exerciseSets: "",
  //     exerciseReps: "",
  //     exerciseType: "",
  //     exerciseMuscle: "",
  //     exerciseEquipment: "",
  //     exerciseDifficulty: "",
  //     exerciseInstructions: "",
  //     exerciseTag: "",
  //   }
  // ]

  exercisesTagLimit: 0,

  // exercisesSearchResults is a list of exercises from the API
  exercisesSearchResults: [],

  // exercisesView is the filtered version of exercises
  exercisesView: [],

  searchExercise: () => {},
  addExercise: () => {},
  selectScheduledExercise: () => {},
  removeExercise: () => {},
})

// actual context
export const ExerciseProvider = ({ children }) => {
  const [exercises, setExercises] = useState([])
  const [exercisesTagLimit, setExercisesTagLimit] = useState(0)
  const [exercisesSearchResults, setExercisesSearchResults] = useState([])
  const [exercisesView, setExercisesView] = useState(exercises)

  const searchExercise = (exerciseQuery) => {
    // TODO: validation
    setExercisesSearchResults(searchExerciseHelper(exerciseQuery))
  }

  const addExercise = (exercise) => {
    // TODO: validation
    setExercises(addExerciseHelper(exercises, exercisesTagLimit + 1, exercise))
  }

  const selectScheduledExercise = (exerciseDate) => {
    setExercisesView(selectScheduledExerciseHelper(exercises, exerciseDate))
  }

  const removeExercise = (exerciseTag) => {
    setExercises(removeExerciseHelper(exercises, exerciseTag))
  }

  const value = { exercises, exercisesSearchResults, exercisesView,
    searchExercise, addExercise, selectScheduledExercise, removeExercise  }

  return (
    <FitnessContext.Provider value={ value }>
      { children }
    </FitnessContext.Provider>
  )
}