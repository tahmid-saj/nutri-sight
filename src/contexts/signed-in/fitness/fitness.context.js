import { useState, useEffect, createContext } from "react";
import { validateSearchedExercise, validateAddExercise,
  validateRemoveExercise
} from "../../../utils/validations/fitness.validations"
import { getSearchedExercise,
  getExercises, postAddExercise, deleteRemoveExercise, putExercises
} from "../../../utils/api-requests/fitness.requests"
import { DEFAULT_EXERCISES } from "../../../utils/constants/fitness.constants";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/shared/user/user.selector";

// helper functions
const searchExerciseHelper = async (exerciseQuery) => {
  const resSearchedExerciseResults = await getSearchedExercise(exerciseQuery)

  console.log(resSearchedExerciseResults)

  return resSearchedExerciseResults
}

const addExerciseHelper = async (exercises, exercisesTagLimit, exercise, selectedSearchedExercise, userId, email) => {
  await postAddExercise(userId, email, exercise, exercisesTagLimit, selectedSearchedExercise)

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

const removeExerciseHelper = async (exercises, exerciseTag, userId, email) => {
  await deleteRemoveExercise(userId, email, exerciseTag)

  return exercises.filter(exercise => exercise.exerciseTag !== exerciseTag)
}

const setDefaultExercisesValuesHelper = () => {
  return DEFAULT_EXERCISES
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

  setDefaultExercisesValues: () => {},
  updateExercises: () => {},
})

// actual context
export const FitnessProvider = ({ children }) => {
  const [exercises, setExercises] = useState([])
  const [exercisesTagLimit, setExercisesTagLimit] = useState(0)
  const [selectedScheduledExerciseDate, setSelectedScheduledExerciseDate] = useState(null)
  const [exercisesSearchResults, setExercisesSearchResults] = useState([])
  const [selectedSearchedExercise, setSelectedSearchedExercise] = useState(null)
  const [exercisesView, setExercisesView] = useState(exercises)

  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    async function fetchExercisesData() {
      if (currentUser) {
        const exercisesData = await getExercises(currentUser.uid, currentUser.email)

        if (exercisesData) {
          const { exercises } = await exercisesData
          setExercises(exercises)
        }
      } else if (!currentUser) {
        setDefaultExercisesValues()
      }
    }

    fetchExercisesData()
  }, [currentUser])

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

  const searchExercise = async (exerciseQuery) => {
    if (validateSearchedExercise(exerciseQuery)) {
      return
    } else {
      const resSearchedExercises = await searchExerciseHelper(exerciseQuery)
      setExercisesSearchResults(resSearchedExercises)
      console.log(resSearchedExercises)
    }
  }

  const addExercise = async (exercise) => {
    if (validateAddExercise(exercise)) {
      return
    } else {
      const resAddExercise = await addExerciseHelper(exercises, exercisesTagLimit + 1, exercise, selectedSearchedExercise, currentUser.uid, currentUser.email)
      setExercises(resAddExercise)
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

  const removeExercise = async (exerciseTag) => {
    if (validateRemoveExercise(exerciseTag)) {
      return
    } else {
      const resRemoveExercise = await removeExerciseHelper(exercises, exerciseTag)
      setExercises(resRemoveExercise)
    }
  }

  const setDefaultExercisesValues = () => {
    setExercises(setDefaultExercisesValuesHelper())
  }

  const updateExercises = () => {
    putExercises(currentUser.uid, currentUser.email, exercises)
  }

  const value = { exercises, exercisesSearchResults, exercisesView, selectedSearchedExercise,
    searchExercise, addExercise, 
    selectScheduledExercise, unselectScheduledExercise, selectSearchedExercises,
    removeExercise,
    updateExercises }

  return (
    <FitnessContext.Provider value={ value }>
      { children }
    </FitnessContext.Provider>
  )
}