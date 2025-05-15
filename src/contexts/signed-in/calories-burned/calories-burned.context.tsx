import { createContext, useEffect, useState, useContext, FC } from "react";
// import { UserContext } from "../../shared/user/user.context";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/shared/user/user.selector";

import { calculateSummary } from "../../../utils/calculations/calories-burned.calculations";
import { validateSearchActivity, validateAddTrackedActivityDate, 
  validateFilterActivityDates, validateRemoveActivityDate 
} from "../../../utils/validations/calories-burned.validations"

import { getSearchActivity,
  getTrackedCaloriesBurned,
  postAddActivity, deleteRemoveActivity,
  putTrackedCaloriesBurned
} from "../../../utils/api-requests/calories-burned.requests"

import { DEFAULT_TRACKED_CALORIES_BURNED, DEFAULT_TRACKED_CALORIES_BURNED_SUMMARY } from "../../../utils/constants/calories-burned.constants" 
import { TrackedCaloriesBurned, FilterConditions, TrackedCaloriesBurnedSummary, SearchActivityInput, SearchActivityResult, AddTrackedActivityInput, CaloriesBurnedContextType, CaloriesBurnedProviderProps } from "./calories-burned.types"

// TODO: sort the records by date
// helper functions
const searchActivityHelper = async (trackedDayInfo: SearchActivityInput): Promise<SearchActivityResult[]> => {
  const resActivityResults = await getSearchActivity(trackedDayInfo)

  return resActivityResults
}

const addTrackedActivityDateHelper = async (trackedCaloriesBurned: TrackedCaloriesBurned[], 
  trackedDayInfo: AddTrackedActivityInput, activityId: number, userId: string, email: string): Promise<TrackedCaloriesBurned[]> => {
  postAddActivity(userId, email, trackedDayInfo, activityId)
  

  return [ ...trackedCaloriesBurned,
    {
      dateTracked: String(trackedDayInfo.dateTracked),
      activity: String(trackedDayInfo.activity),
      durationMinutes: Number(trackedDayInfo.durationMinutes),
      caloriesBurnedPerHour: Number(trackedDayInfo.caloriesBurnedPerHour),
      totalCaloriesBurned: Number(trackedDayInfo.totalCaloriesBurned),
      activityId: Number(activityId)
    }
  ]
}

const filterActivityDatesHelper = (trackedCaloriesBurned: TrackedCaloriesBurned[], 
    filterConditions: FilterConditions): TrackedCaloriesBurned[] => {

  let filteredTrackedCaloriesBurned: TrackedCaloriesBurned[] = []
  trackedCaloriesBurned.map((trackedActivity) => {
    if (filterConditions.activity === "" || (trackedActivity.activity.toLowerCase().includes(filterConditions.activity.toLowerCase()))) {
      if (filterConditions.dateTracked === "" || (filterConditions.dateTracked === trackedActivity.dateTracked)) {
        if (filterConditions.durationMinutes === "" || (Number(filterConditions.durationMinutes) === Number(trackedActivity.durationMinutes))) {
          filteredTrackedCaloriesBurned.push(trackedActivity)
        }
      }
    }
  })

  return filteredTrackedCaloriesBurned
}

const removeActivityDateHelper = async (trackedCaloriesBurned: TrackedCaloriesBurned[], 
    activityId: number, userId: string, email: string): Promise<TrackedCaloriesBurned[]> => {
  if (validateRemoveActivityDate(activityId)) return trackedCaloriesBurned
   
  deleteRemoveActivity(userId, email, activityId)

  return trackedCaloriesBurned.filter(trackedActivity => trackedActivity.activityId !== activityId)
}

const setDefaultTrackedCaloriesBurnedValuesHelper = (): TrackedCaloriesBurned[] => {
  return DEFAULT_TRACKED_CALORIES_BURNED
}

const setDefaultTrackedCaloriesBurnedSummaryValuesHelper = (): TrackedCaloriesBurnedSummary => {
  return DEFAULT_TRACKED_CALORIES_BURNED_SUMMARY
}

const selectScheduledTrackedCaloriesBurnedHelper = (trackedCaloriesBurned: TrackedCaloriesBurned[], 
  trackedDay: string | Date): TrackedCaloriesBurned[] | undefined => {

  const filteredTrackedCaloriesBurned = trackedCaloriesBurned.filter((caloriesTrackedDay) => {
    return caloriesTrackedDay.dateTracked === trackedDay
  })

  if (!filteredTrackedCaloriesBurned) return undefined

  return filteredTrackedCaloriesBurned
}

// initial state
export const CaloriesBurnedContext = createContext<CaloriesBurnedContextType>({
  trackedCaloriesBurned: [],
  // trackedCaloriesBurned and trackedCaloriesBurnedView structure:
  // [
  //   {
  //     dateTracked: "2023-11-11",
  //     activity: "running",
  //     durationMinutes: 60,
  //     caloriesBurnedPerHour: 354,
  //     totalCaloriesBurned: 354,
  //     activityId: 123
  //   }
  // ]
  trackedCaloriesBurnedLength: 0,

  // selectedTrackedCaloriesBurned is the selected date from the calendar component
  selectedTrackedCaloriesBurned: undefined,

  filterConditions: undefined,
  // filterConditions structure:
  // {
  //   dateTracked: "",
  //   activity: ""
  // }
  
  trackedCaloriesBurnedView: [],

  // scheduledTrackedCaloriesBurnedView is the selected selectedTrackedCaloriesBurned info from the 
  // calendar component
  scheduledTrackedCaloriesBurnedView: undefined,

  searchActivity: () => {},
  addTrackedActivityDate: () => {},
  filterActivityDates: () => {},
  removeActivityDate: () => {},
  clearActivityDatesFilter: () => {},

  selectScheduledTrackedCaloriesBurned: () => {},

  searchActivityResults: [],
  // searchActivityResults
  // [
  //   from api
  // ]

  trackedCaloriesBurnedSummary: undefined,
  // trackedCaloriesBurnedSummary structure:
  // {
  //   dailyAverageCaloriesBurned: 300,
  //   mostCaloriesBurned: {
  //     date: "2023-11-11",
  //     caloriesBurned: 300,
  //     activity: "running"
  //   },
  //   totalTrackedDays: [],
  //   totalTrackedActivities: []
  // }

  setDefaultTrackedCaloriesBurnedValues: () => {},
  setDefaultTrackedCaloriesBurnedSummaryValues: () => {},
  updateTrackedCaloriesBurned: () => {}
})

// context provider
// TODO: manage length state better everywhere via backend as well (it currently is not pulled on sign in)
export const CaloriesBurnedProvider: FC<CaloriesBurnedProviderProps> = ({ children }) => {
  const [trackedCaloriesBurned, setTrackedCaloriesBurned] = useState<TrackedCaloriesBurned[]>([])
  const [trackedCaloriesBurnedLength, setTrackedCaloriesBurnedLength] = useState<number>(0)
  const [filterConditions, setFilterConditions] = useState<FilterConditions | undefined>(undefined)
  const [selectedTrackedCaloriesBurned, setSelectedTrackedCaloriesBurned] = useState<string | Date | undefined>(undefined)
  const [scheduledTrackedCaloriesBurnedView, setScheduledTrackedCaloriesBurnedView] = useState<TrackedCaloriesBurned[] | undefined>(undefined)
  const [searchActivityResults, setSearchActivityResults] = useState<SearchActivityResult[]>([])
  const [trackedCaloriesBurnedView, setTrackedCaloriesBurnedView] = useState<TrackedCaloriesBurned[]>(trackedCaloriesBurned)
  const [trackedCaloriesBurnedSummary, setTrackedCaloriesBurnedSummary] = useState<TrackedCaloriesBurnedSummary | undefined>({})

  // const { currentUser } = useContext(UserContext)
  const currentUser = useSelector(selectCurrentUser)

  // update trackedCaloriesBurnedSummary
  useEffect(() => {
    const summary = calculateSummary(trackedCaloriesBurned)

    setTrackedCaloriesBurnedSummary({
      dailyAverageCaloriesBurned: summary.dailyAverageCaloriesBurned,
      mostCaloriesBurned: {
        date: summary.mostCaloriesBurned.date,
        caloriesBurned: summary.mostCaloriesBurned.caloriesBurned,
        activity: summary.mostCaloriesBurned.activity
      },
      totalTrackedDays: summary.totalTrackedDays,
      totalTrackedActivities: summary.totalTrackedActivities
    })

    setTrackedCaloriesBurnedLength(trackedCaloriesBurned.length)
  }, [trackedCaloriesBurned])

  useEffect(() => {
    async function fetchTrackedCaloriesBurnedData() {
      if (currentUser) {
        const trackedCaloriesBurnedData = await getTrackedCaloriesBurned(currentUser.uid, currentUser.email)
        
        if (trackedCaloriesBurnedData) {
          const { trackedCaloriesBurned } = await trackedCaloriesBurnedData
          setTrackedCaloriesBurned(trackedCaloriesBurned)
        }
      } else if (!currentUser) {
        setDefaultTrackedCaloriesBurnedValues()
        setDefaultTrackedCaloriesBurnedSummaryValues()
      }
    }
    fetchTrackedCaloriesBurnedData()
  }, [currentUser])

  // update trackedCaloriesBurnedView when trackedCaloriesBurned or filterConditions change
  useEffect(() => {
    if (filterConditions) {
      setTrackedCaloriesBurnedView(filterActivityDatesHelper(trackedCaloriesBurned, filterConditions))
    } else {
      setTrackedCaloriesBurnedView(trackedCaloriesBurned)
    }
  }, [trackedCaloriesBurned, filterConditions])

  // update scheduledTrackedCaloriesBurnedView when trackedCaloriesBurned or selectedTrackedCaloriesBurned change
  useEffect(() => {
    if (selectedTrackedCaloriesBurned) {
      setScheduledTrackedCaloriesBurnedView(selectScheduledTrackedCaloriesBurnedHelper(trackedCaloriesBurned, selectedTrackedCaloriesBurned))
    } else {
      setScheduledTrackedCaloriesBurnedView(undefined)
    }
  }, [trackedCaloriesBurned, selectedTrackedCaloriesBurned])

  const searchActivity = async (trackedDayInfo: SearchActivityInput): Promise<void> => {
    if (validateSearchActivity(trackedDayInfo)) {
      return
    } else {
      const resSearchedActivities = await searchActivityHelper(trackedDayInfo)
      setSearchActivityResults(resSearchedActivities)
    }
  }

  const addTrackedActivityDate = async (trackedDayInfo: AddTrackedActivityInput): Promise<void> => {
    if (validateAddTrackedActivityDate(trackedDayInfo)) {
      return
    } else {
      const resAddTrackedActivity = await addTrackedActivityDateHelper(trackedCaloriesBurned, trackedDayInfo, trackedCaloriesBurnedLength + 1, currentUser?.uid!, currentUser?.email!)
      setTrackedCaloriesBurned(resAddTrackedActivity)
      // setTrackedCaloriesBurnedLength(trackedCaloriesBurnedLength + 1)
      
    }
  }

  const filterActivityDates = (filterConditions: FilterConditions): void => {
    if (validateFilterActivityDates(filterConditions)) {
      
      return
    } else {
      setFilterConditions(filterConditions)
      setTrackedCaloriesBurnedView(filterActivityDatesHelper(trackedCaloriesBurned, filterConditions))
      
    }
  }

  const removeActivityDate = async (activityId: number): Promise<void> => {
    const resRemoveActivityDate = await removeActivityDateHelper(trackedCaloriesBurned, activityId, currentUser?.uid!, currentUser?.email!)
    setTrackedCaloriesBurned(resRemoveActivityDate)
  }

  const clearActivityDatesFilter = () => {
    setFilterConditions(undefined)
    setTrackedCaloriesBurnedView(trackedCaloriesBurned)
  }

  const setDefaultTrackedCaloriesBurnedValues = (): void => {
    setTrackedCaloriesBurned(setDefaultTrackedCaloriesBurnedValuesHelper())
  }
  
  const setDefaultTrackedCaloriesBurnedSummaryValues = (): void => {
    setTrackedCaloriesBurnedSummary(setDefaultTrackedCaloriesBurnedSummaryValuesHelper())
  }

  // update trackedCaloriesBurned on sign out
  const updateTrackedCaloriesBurned = (): void => {
    putTrackedCaloriesBurned(currentUser?.uid!, currentUser?.email!, trackedCaloriesBurned)
  }

  const selectScheduledTrackedCaloriesBurned = (dayTracked: string | Date): void => {
    setSelectedTrackedCaloriesBurned(dayTracked)
    setScheduledTrackedCaloriesBurnedView(selectScheduledTrackedCaloriesBurnedHelper(trackedCaloriesBurned, dayTracked))
  }

  const value = { trackedCaloriesBurned, trackedCaloriesBurnedView, filterConditions, searchActivityResults,
    scheduledTrackedCaloriesBurnedView, trackedCaloriesBurnedLength, selectedTrackedCaloriesBurned,
    searchActivity, addTrackedActivityDate, filterActivityDates, removeActivityDate, clearActivityDatesFilter,
    trackedCaloriesBurnedSummary,
    setDefaultTrackedCaloriesBurnedValues, setDefaultTrackedCaloriesBurnedSummaryValues, updateTrackedCaloriesBurned,
    selectScheduledTrackedCaloriesBurned }
  
  return (
    <CaloriesBurnedContext.Provider
      value={ value }>
      { children }
    </CaloriesBurnedContext.Provider>
  )
}