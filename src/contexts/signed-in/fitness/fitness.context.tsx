import { useState, useEffect, createContext, FC } from "react";
import { validateSearchedExercise, validateAddExercise,
  validateRemoveExercise
} from "../../../utils/validations/fitness.validations"
import { getSearchedExercise,
  getExercises, postAddExercise, deleteRemoveExercise, putExercises
} from "../../../utils/api-requests/fitness.requests"
import { DEFAULT_EXERCISES } from "../../../utils/constants/fitness.constants";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/shared/user/user.selector";

import { ExerciseQueryInput, ExerciseSearchResult, AddExerciseInput, Exercise, FitnessContextType, FitnessProviderProps } from "./fitness.types"

// helper functions
const searchExerciseHelper = async (exerciseQuery: ExerciseQueryInput): Promise<ExerciseSearchResult[]> => {
  const resSearchedExerciseResults = await getSearchedExercise(exerciseQuery)

  return resSearchedExerciseResults
}

const addExerciseHelper = async (exercises: Exercise[], exercisesTagLimit: number, 
  exercise: AddExerciseInput, selectedSearchedExercise: ExerciseSearchResult, userId: string, email: string): Promise<Exercise[]> => {
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

const selectScheduledExerciseHelper = (exercises: Exercise[], exerciseDate: string | Date): Exercise[] => {
  let selectedScheduledExercises: Exercise[] = []
  
  exercises.map((exercise) => {
    if (exercise.exerciseDate === exerciseDate) {
      
      selectedScheduledExercises.push(exercise)
    }
  })

  return selectedScheduledExercises
}

const removeExerciseHelper = async (exercises: Exercise[], exerciseTag: number, userId: string, email: string): Promise<Exercise[]> => {
  await deleteRemoveExercise(userId, email, exerciseTag)

  return exercises.filter(exercise => exercise.exerciseTag !== exerciseTag)
}

const setDefaultExercisesValuesHelper = (): Exercise[] => {
  return DEFAULT_EXERCISES
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

  setDefaultExercisesValues: () => {},
  updateExercises: () => {},
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

  // update exercisesTagLimit when exercises change and also update upcomingExercisesView
  // TODO: need to better manage tags
  useEffect(() => {
    setExercisesTagLimit(exercises.length)

    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]

    let firstScheduledNextDate: string | Date;
    exercises.map((exercise) => {
      if (exercise.exerciseDate! >= todayStr) {
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

  const addExercise = async (exercise: AddExerciseInput): Promise<void> => {
    if (validateAddExercise(exercise)) {
      return
    } else {
      const resAddExercise = await addExerciseHelper(exercises, exercisesTagLimit + 1, exercise, selectedSearchedExercise!, currentUser?.uid!, currentUser?.email!)
      setExercises(resAddExercise)
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

  const removeExercise = async (exerciseTag: number): Promise<void> => {
    if (validateRemoveExercise(exerciseTag)) {
      return
    } else {
      const resRemoveExercise = await removeExerciseHelper(exercises, exerciseTag, currentUser?.uid!, currentUser?.email!)
      setExercises(resRemoveExercise)
    }
  }

  const setDefaultExercisesValues = (): void => {
    setExercises(setDefaultExercisesValuesHelper())
  }

  const updateExercises = (): void => {
    putExercises(currentUser?.uid, currentUser?.email, exercises)
  }

  const value = { exercises, exercisesSearchResults, exercisesView, selectedSearchedExercise, upcomingExercisesView,
    searchExercise, addExercise, exercisesTagLimit, selectedScheduledExerciseDate, 
    selectScheduledExercise, unselectScheduledExercise, selectSearchedExercises, setDefaultExercisesValues,
    removeExercise,
    updateExercises }

  return (
    <FitnessContext.Provider value={ value }>
      { children }
    </FitnessContext.Provider>
  )
}