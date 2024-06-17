import { useState, useEffect, createContext } from "react";
import { validateSearchExercise, validateAddExercise,
  validateRemoveExercise
} from "../../../utils/validations/fitness.validations"
import { getSearchedExercise } from "../../../utils/api-requests/fitness.requests"

// helper functions
const searchExerciseHelper = async (exerciseQuery) => {
  const resSearchedExerciseResults = await getSearchedExercise(exerciseQuery)

  return resSearchedExerciseResults
}

const addExerciseHelper = (exercises, exercisesTagLimit, exercise) => {
  return [
    ...exercises,
    {
      exerciseDate: String(exercise.exerciseDate),
      exerciseName: String(exercise.exerciseName),
      exerciseSets: Number(exercise.exerciseSets),
      exerciseReps: Number(exercise.exerciseReps),
      exerciseType: String(exercise.exerciseType),
      exerciseMuscle: String(exercise.exerciseMuscle),
      exerciseEquipment: String(exercise.exerciseEquipment),
      exerciseDifficulty: String(exercise.exerciseDifficulty),
      exerciseInstructions: String(exercise.exerciseInstructions),
      exerciseTag: Number(exercisesTagLimit),
    }
  ]
}

const selectScheduledExerciseHelper = (exercises, exerciseDate) => {
  const selectedScheduledExercises = exercises.map((exercise) => {
    if (exercise.exerciseDate === exerciseDate) {
      return exercise
    }
  })

  return selectedScheduledExercises
}

const removeExerciseHelper = (exercises, exerciseTag) => {
  return exercises.filter(exercise => exercise.exerciseTag !== exerciseTag)
}

// initial state
export const FitnessContext = createContext({
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

  selectedScheduledExerciseDate: null,

  // exercisesSearchResults is a list of exercises from the API
  exercisesSearchResults: [],

  // exercisesView is the filtered version of exercises
  exercisesView: [],

  searchExercise: () => {},
  addExercise: () => {},
  selectScheduledExercise: () => {},
  unselectScheduledExercise: () => {},
  removeExercise: () => {},

  // exerciseQuery structure:
  // {
  //   exerciseName:,
  //   exerciseType: (optional),
  //   exerciseMuscle: (optional),
  //   exerciseDifficulty: (optional),
  // }
})

// actual context
export const FitnessProvider = ({ children }) => {
  const [exercises, setExercises] = useState([])
  const [exercisesTagLimit, setExercisesTagLimit] = useState(0)
  const [selectedScheduledExerciseDate, setSelectedScheduledExerciseDate] = useState(null)
  const [exercisesSearchResults, setExercisesSearchResults] = useState([])
  const [exercisesView, setExercisesView] = useState(exercises)

  // update exercisesTagLimit when exercises change
  // TODO: need to better manage tags
  useEffect(() => {
    setExercisesTagLimit(exercises.length)
  }, [exercises])

  // update exercisesView when exercises or selectedScheduledExerciseDate change
  useEffect(() => {
    if (selectedScheduledExerciseDate) {
      setExercisesView(selectScheduledExerciseHelper(exercises, selectedScheduledExerciseDate))
    } else {
      setExercisesView(exercises)
    }
  }, [exercises, selectedScheduledExerciseDate])

  const searchExercise = (exerciseQuery) => {
    if (validateSearchExercise(exerciseQuery)) {
      return
    } else {
      const resSearchedExercises = searchExerciseHelper(exerciseQuery)
      setExercisesSearchResults(resSearchedExercises)
    }
  }

  const addExercise = (exercise) => {
    if (validateAddExercise(exercise)) {
      return
    } else {
      setExercises(addExerciseHelper(exercises, exercisesTagLimit + 1, exercise))
    }
  }

  const selectScheduledExercise = (exerciseDate) => {
    setSelectedScheduledExerciseDate(exerciseDate)
    setExercisesView(selectScheduledExerciseHelper(exercises, exerciseDate))
  }

  const unselectScheduledExercise = () => {
    setSelectedScheduledExerciseDate(null)
    setExercisesView(exercises)
  }

  const removeExercise = (exerciseTag) => {
    if (validateRemoveExercise(exerciseTag)) {
      return
    } else {
      setExercises(removeExerciseHelper(exercises, exerciseTag))
    }
  }

  const value = { exercises, exercisesSearchResults, exercisesView,
    searchExercise, addExercise, selectScheduledExercise, unselectScheduledExercise, removeExercise }

  return (
    <FitnessContext.Provider value={ value }>
      { children }
    </FitnessContext.Provider>
  )
}