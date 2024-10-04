import { createContext, FC, useEffect, useState } from "react";
import { calculateSummary } from "../../../utils/calculations/calories-burned.calculations";
import { validateSearchActivity, validateAddTrackedActivityDate, 
  validateFilterActivityDates, validateRemoveActivityDate 
} from "../../../utils/validations/calories-burned.validations"

import { getSearchActivity } from "../../../utils/api-requests/calories-burned.requests"

import { AddTrackedActivityInput, CaloriesBurnedContextType, CaloriesBurnedProviderProps, FilterConditions, SearchActivityInput, SearchActivityResult, TrackedCaloriesBurned, TrackedCaloriesBurnedSummary } from "./calories-burned.types"

// TODO: sort the records by date
// helper functions
const searchActivityHelper = async (trackedDayInfo: SearchActivityInput): Promise<SearchActivityResult[]> => {
  const resActivityResults = await getSearchActivity(trackedDayInfo)

  return resActivityResults
}

const addTrackedActivityDateHelper = (trackedCaloriesBurned: TrackedCaloriesBurned[], 
  trackedDayInfo: AddTrackedActivityInput, activityId: number): TrackedCaloriesBurned[] => {
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

const filterActivityDatesHelper = (trackedCaloriesBurned: TrackedCaloriesBurned[], filterConditions: FilterConditions): TrackedCaloriesBurned[] => {
  

  let filteredTrackedCaloriesBurned: TrackedCaloriesBurned[] = []
  trackedCaloriesBurned.map((trackedActivity) => {
    if (filterConditions.activity === "" || (trackedActivity.activity.toLowerCase().includes(filterConditions.activity.toLowerCase()))) {
      if (filterConditions && (filterConditions.dateTracked === "" || (filterConditions.dateTracked === trackedActivity.dateTracked))) {
        if (filterConditions && (filterConditions.durationMinutes === "" || (Number(filterConditions.durationMinutes) === Number(trackedActivity.durationMinutes)))) {
          filteredTrackedCaloriesBurned.push(trackedActivity)
        }
      }
    }
  })

  return filteredTrackedCaloriesBurned
}

const removeActivityDateHelper = (trackedCaloriesBurned: TrackedCaloriesBurned[], activityId: number): TrackedCaloriesBurned[] => {
  if (validateRemoveActivityDate(activityId)) return trackedCaloriesBurned

  return trackedCaloriesBurned.filter(trackedActivity => trackedActivity.activityId !== activityId)
}

const selectScheduledTrackedCaloriesBurnedHelper = (trackedCaloriesBurned: TrackedCaloriesBurned[], trackedDay: string | Date): TrackedCaloriesBurned[] | undefined => {
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
  //     weightPounds: 150,
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
  //   activity: "",
  //   durationMinutes: "",
  // }
  
  trackedCaloriesBurnedView: [],

  // scheduledTrackedCaloriesBurnedView is the selected selectedTrackedCaloriesBurned info from the calendar component
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

  trackedCaloriesBurnedSummary: undefined
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
})

// context provider
export const CaloriesBurnedProvider: FC<CaloriesBurnedProviderProps> = ({ children }) => {
  const [trackedCaloriesBurned, setTrackedCaloriesBurned] = useState<TrackedCaloriesBurned[]>([])
  const [trackedCaloriesBurnedLength, setTrackedCaloriesBurnedLength] = useState<number>(0)
  const [filterConditions, setFilterConditions] = useState<FilterConditions | undefined>(undefined)
  const [selectedTrackedCaloriesBurned, setSelectedTrackedCaloriesBurned] = useState<string | Date | undefined>(undefined)
  const [scheduledTrackedCaloriesBurnedView, setScheduledTrackedCaloriesBurnedView] = useState<TrackedCaloriesBurned[] | undefined>(undefined)
  const [searchActivityResults, setSearchActivityResults] = useState<SearchActivityResult[]>([])
  const [trackedCaloriesBurnedView, setTrackedCaloriesBurnedView] = useState<TrackedCaloriesBurned[]>(trackedCaloriesBurned)
  const [trackedCaloriesBurnedSummary, setTrackedCaloriesBurnedSummary] = useState<TrackedCaloriesBurnedSummary | undefined>(undefined)

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

  const addTrackedActivityDate = (trackedDayInfo: AddTrackedActivityInput): void => {
    if (validateAddTrackedActivityDate(trackedDayInfo)) {
      return
    } else {
      setTrackedCaloriesBurned(addTrackedActivityDateHelper(trackedCaloriesBurned, trackedDayInfo, trackedCaloriesBurnedLength + 1))
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

  const removeActivityDate = (activityId: number): void => {
    setTrackedCaloriesBurned(removeActivityDateHelper(trackedCaloriesBurned, activityId))
  }

  const clearActivityDatesFilter = () => {
    setFilterConditions(undefined)
    setTrackedCaloriesBurnedView(trackedCaloriesBurned)
  }

  const selectScheduledTrackedCaloriesBurned = (dayTracked: string | Date): void => {
    setSelectedTrackedCaloriesBurned(dayTracked)
    setScheduledTrackedCaloriesBurnedView(selectScheduledTrackedCaloriesBurnedHelper(trackedCaloriesBurned, dayTracked))
  }

  const value = { trackedCaloriesBurned, trackedCaloriesBurnedView, filterConditions, searchActivityResults,
    scheduledTrackedCaloriesBurnedView,
    searchActivity, addTrackedActivityDate, filterActivityDates, removeActivityDate, clearActivityDatesFilter,
    trackedCaloriesBurnedSummary, selectScheduledTrackedCaloriesBurned }
  
  return (
    <CaloriesBurnedContext.Provider
      value={ value }>
      { children }
    </CaloriesBurnedContext.Provider>
  )
}