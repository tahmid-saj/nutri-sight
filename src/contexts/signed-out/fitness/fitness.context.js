import { useState, useEffect, createContext } from "react";
import { validateSearchedExercise, validateAddExercise,
  validateRemoveExercise
} from "../../../utils/validations/fitness.validations"
import { getSearchedExercise } from "../../../utils/api-requests/fitness.requests"

// helper functions
const searchExerciseHelper = async (exerciseQuery) => {
  const resSearchedExerciseResults = await getSearchedExercise(exerciseQuery)

  console.log(resSearchedExerciseResults)

  return resSearchedExerciseResults
}

const addExerciseHelper = (exercises, exercisesTagLimit, exercise, selectedSearchedExercise) => {
  return [
    ...exercises,
    {
      exerciseDate: String(exercise.exerciseDate),
      exerciseName: String(selectedSearchedExercise.exerciseName),
      exerciseSets: Number(exercise.exerciseSets),
      exerciseReps: Number(exercise.exerciseReps),
      exerciseType: String(selectedSearchedExercise.exerciseType),
      exerciseMuscle: String(selectedSearchedExercise.exerciseMuscle),
      exerciseEquipment: String(selectedSearchedExercise.exerciseEquipment),
      exerciseDifficulty: String(selectedSearchedExercise.exerciseDifficulty),
      exerciseInstructions: String(selectedSearchedExercise.exerciseInstructions),
      exerciseTag: Number(exercisesTagLimit),
    }
  ]
}

const selectScheduledExerciseHelper = (exercises, exerciseDate) => {
  let selectedScheduledExercises = []
  
  exercises.map((exercise) => {
    if (exercise.exerciseDate === exerciseDate) {
      console.log(exerciseDate)
      selectedScheduledExercises.push(exercise)
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

  // selectedSearchedExercise is the exercise clicked on in the search results
  selectedSearchedExercise: null,

  // exercisesView is the filtered version of exercises
  exercisesView: [],

  // upcomingExercisesView is a list of all exercises in the next scheduled date from the current date
  upcomingExercisesView: [],

  searchExercise: () => {},
  addExercise: () => {},

  selectScheduledExercise: () => {},
  unselectScheduledExercise: () => {},
  selectSearchedExercises: () => {},

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
  const [selectedSearchedExercise, setSelectedSearchedExercise] = useState(null)
  const [exercisesView, setExercisesView] = useState(exercises)
  const [upcomingExercisesView, setUpcomingExercisesView] = useState([])

  // update exercisesTagLimit when exercises change and also update upcomingExercisesView
  // TODO: need to better manage tags
  useEffect(() => {
    setExercisesTagLimit(exercises.length)

    let today = new Date()
    today = today.toISOString().split('T')[0]

    let firstScheduledNextDate;
    exercises.map((exercise) => {
      if (exercise.exerciseDate >= today) {
        firstScheduledNextDate = exercise.exerciseDate
      }
    })

    let newUpcomingExercises = []
    exercises.map((exercise) => {
      if (exercise.exerciseDate === firstScheduledNextDate) {
        newUpcomingExercises.push(exercise)
      }
    })

    setUpcomingExercisesView(newUpcomingExercises)
  }, [exercises])

  // update exercisesView when exercises or selectedScheduledExerciseDate change
  useEffect(() => {
    if (selectedScheduledExerciseDate) {
      setExercisesView(selectScheduledExerciseHelper(exercises, selectedScheduledExerciseDate))
    } else {
      setExercisesView(exercises)
    }
  }, [exercises, selectedScheduledExerciseDate])

  const searchExercise = async (exerciseQuery) => {
    if (validateSearchedExercise(exerciseQuery)) {
      return
    } else {
      const resSearchedExercises = await searchExerciseHelper(exerciseQuery)
      setExercisesSearchResults(resSearchedExercises)
      console.log(resSearchedExercises)
    }
  }

  const addExercise = (exercise) => {
    if (validateAddExercise(exercise)) {
      return
    } else {
      setExercises(addExerciseHelper(exercises, exercisesTagLimit + 1, exercise, selectedSearchedExercise))
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
  
  const selectSearchedExercises = (exercise) => {
    setSelectedSearchedExercise(exercise)
  }

  const removeExercise = (exerciseTag) => {
    if (validateRemoveExercise(exerciseTag)) {
      return
    } else {
      setExercises(removeExerciseHelper(exercises, exerciseTag))
    }
  }

  const value = { exercises, exercisesSearchResults, exercisesView, selectedSearchedExercise, upcomingExercisesView,
    searchExercise, addExercise, 
    selectScheduledExercise, unselectScheduledExercise, selectSearchedExercises,
    removeExercise }

  return (
    <FitnessContext.Provider value={ value }>
      { children }
    </FitnessContext.Provider>
  )
}