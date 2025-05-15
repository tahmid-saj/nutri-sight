import { useState, useEffect, createContext, FC } from "react";
import { validateSearchedExercise, validateAddExercise,
  validateRemoveExercise
} from "../../../utils/validations/fitness.validations"
import { getSearchedExercise } from "../../../utils/api-requests/fitness.requests"

import { FitnessContextType, FitnessProviderProps, Exercise, ExerciseQueryInput, AddExerciseInput, ExerciseSearchResult } from "./fitness.types"

// helper functions
const searchExerciseHelper = async (exerciseQuery: ExerciseQueryInput): Promise<ExerciseSearchResult[]> => {
  const resSearchedExerciseResults = await getSearchedExercise(exerciseQuery)

  return resSearchedExerciseResults
}

const addExerciseHelper = (exercises: Exercise[], exercisesTagLimit: number, 
  exercise: AddExerciseInput, selectedSearchedExercise: ExerciseSearchResult): Exercise[] => {
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

const selectScheduledExerciseHelper = (exercises: Exercise[], exerciseDate: string | Date): Exercise[] => {
  let selectedScheduledExercises: Exercise[] = []
  
  exercises.map((exercise) => {
    if (exercise.exerciseDate === exerciseDate) {
      
      selectedScheduledExercises.push(exercise)
    }
  })

  return selectedScheduledExercises
}

const removeExerciseHelper = (exercises: Exercise[], exerciseTag: number): Exercise[] => {
  return exercises.filter(exercise => exercise.exerciseTag !== exerciseTag)
}

// initial state
export const FitnessContext = createContext<FitnessContextType>({
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

  selectedScheduledExerciseDate: undefined,

  // exercisesSearchResults is a list of exercises from the API
  exercisesSearchResults: [],

  // selectedSearchedExercise is the exercise clicked on in the search results
  selectedSearchedExercise: undefined,

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
export const FitnessProvider: FC<FitnessProviderProps> = ({ children }) => {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [exercisesTagLimit, setExercisesTagLimit] = useState<number>(0)
  const [selectedScheduledExerciseDate, setSelectedScheduledExerciseDate] = useState<string | Date | undefined>(undefined)
  const [exercisesSearchResults, setExercisesSearchResults] = useState<ExerciseSearchResult[]>([])
  const [selectedSearchedExercise, setSelectedSearchedExercise] = useState<ExerciseSearchResult | undefined>(undefined)
  const [exercisesView, setExercisesView] = useState<Exercise[]>(exercises)
  const [upcomingExercisesView, setUpcomingExercisesView] = useState<Exercise[]>([])

  // update exercisesTagLimit when exercises change and also update upcomingExercisesView
  // TODO: need to better manage tags
  useEffect(() => {
    setExercisesTagLimit(exercises.length)

    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]

    let firstScheduledNextDate: string | Date;
    exercises.map((exercise) => {
      if (exercise.exerciseDate >= todayStr) {
        firstScheduledNextDate = exercise.exerciseDate
      }
    })

    let newUpcomingExercises: Exercise[] = []
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

  const searchExercise = async (exerciseQuery: ExerciseQueryInput): Promise<void> => {
    if (validateSearchedExercise(exerciseQuery)) {
      return
    } else {
      const resSearchedExercises = await searchExerciseHelper(exerciseQuery)
      setExercisesSearchResults(resSearchedExercises)
      
    }
  }

  const addExercise = (exercise: AddExerciseInput): void => {
    if (validateAddExercise(exercise)) {
      return
    } else {
      setExercises(addExerciseHelper(exercises, exercisesTagLimit + 1, exercise, selectedSearchedExercise!))
    }
  }

  const selectScheduledExercise = (exerciseDate: string | Date): void => {
    setSelectedScheduledExerciseDate(exerciseDate)
    setExercisesView(selectScheduledExerciseHelper(exercises, exerciseDate))
  }

  const unselectScheduledExercise = (): void => {
    setSelectedScheduledExerciseDate(undefined)
    setExercisesView(exercises)
  }
  
  const selectSearchedExercises = (exercise: ExerciseSearchResult): void => {
    setSelectedSearchedExercise(exercise)
  }

  const removeExercise = (exerciseTag: number): void => {
    if (validateRemoveExercise(exerciseTag)) {
      return
    } else {
      setExercises(removeExerciseHelper(exercises, exerciseTag))
    }
  }

  const value = { exercises, exercisesSearchResults, exercisesView, selectedSearchedExercise, upcomingExercisesView,
    searchExercise, addExercise, exercisesTagLimit, selectedScheduledExerciseDate,
    selectScheduledExercise, unselectScheduledExercise, selectSearchedExercises,
    removeExercise }

  return (
    <FitnessContext.Provider value={ value }>
      { children }
    </FitnessContext.Provider>
  )
}