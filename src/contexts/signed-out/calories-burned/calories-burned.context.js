import { createContext, useEffect, useState } from "react";
import { calculateSummary } from "../../../utils/calculations/calories-burned.calculations";
import { validateSearchActivity, validateAddTrackedActivityDate, 
  validateFilterActivityDates, validateRemoveActivityDate 
} from "../../../utils/validations/calories-burned.validations"

import { getSearchActivity } from "../../../utils/api-requests/calories-burned.requests"

// TODO: sort the records by date
// helper functions
const searchActivityHelper = async (trackedDayInfo) => {
  const resActivityResults = await getSearchActivity(trackedDayInfo)

  return resActivityResults
}

const addTrackedActivityDateHelper = (trackedCaloriesBurned, trackedDayInfo, activityId) => {
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

const filterActivityDatesHelper = (trackedCaloriesBurned, filterConditions) => {
  console.log(filterConditions)

  let filteredTrackedCaloriesBurned = []
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

const removeActivityDateHelper = (trackedCaloriesBurned, activityId) => {
  if (validateRemoveActivityDate(activityId)) return trackedCaloriesBurned

  return trackedCaloriesBurned.filter(trackedActivity => trackedActivity.activityId !== activityId)
}

const selectScheduledTrackedCaloriesBurnedHelper = (trackedCaloriesBurned, trackedDay) => {
  console.log(trackedDay)

  const filteredTrackedCaloriesBurned = trackedCaloriesBurned.find((caloriesTrackedDay) => {
    return caloriesTrackedDay.dateTracked === trackedDay
  })

  if (!filteredTrackedCaloriesBurned) return null

  return filteredTrackedCaloriesBurned
}

// initial state
export const CaloriesBurnedContext = createContext({
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
  selectedTrackedCaloriesBurned: null,

  filterConditions: {},
  // filterConditions structure:
  // {
  //   dateTracked: "",
  //   activity: "",
  //   durationMinutes: "",
  // }
  
  trackedCaloriesBurnedView: [],

  // scheduledTrackedCaloriesBurnedView is the selected selectedTrackedCaloriesBurned info from the calendar component
  scheduledTrackedCaloriesBurnedView: null,

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

  trackedCaloriesBurnedSummary: {}
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
export const CaloriesBurnedProvider = ({ children }) => {
  const [trackedCaloriesBurned, setTrackedCaloriesBurned] = useState([])
  const [trackedCaloriesBurnedLength, setTrackedCaloriesBurnedLength] = useState(0)
  const [filterConditions, setFilterConditions] = useState(null)
  const [selectedTrackedCaloriesBurned, setSelectedTrackedCaloriesBurned] = useState(null)
  const [scheduledTrackedCaloriesBurnedView, setScheduledTrackedCaloriesBurnedView] = useState(null)
  const [searchActivityResults, setSearchActivityResults] = useState([])
  const [trackedCaloriesBurnedView, setTrackedCaloriesBurnedView] = useState(trackedCaloriesBurned)
  const [trackedCaloriesBurnedSummary, setTrackedCaloriesBurnedSummary] = useState({})

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
    if (filterConditions !== null) {
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
      setScheduledTrackedCaloriesBurnedView(null)
    }
  }, [trackedCaloriesBurned, selectedTrackedCaloriesBurned])

  const searchActivity = async (trackedDayInfo) => {
    if (validateSearchActivity(trackedDayInfo)) {
      return
    } else {
      const resSearchedActivities = await searchActivityHelper(trackedDayInfo)
      setSearchActivityResults(resSearchedActivities)
    }
  }

  const addTrackedActivityDate = (trackedDayInfo) => {
    if (validateAddTrackedActivityDate(trackedDayInfo)) {
      return
    } else {
      setTrackedCaloriesBurned(addTrackedActivityDateHelper(trackedCaloriesBurned, trackedDayInfo, trackedCaloriesBurnedLength + 1))
      // setTrackedCaloriesBurnedLength(trackedCaloriesBurnedLength + 1)
      console.log("created")
    }
  }

  const filterActivityDates = (filterConditions) => {
    if (validateFilterActivityDates(filterConditions)) {
      console.log("invalid")
      return
    } else {
      setFilterConditions(filterConditions)
      setTrackedCaloriesBurnedView(filterActivityDatesHelper(trackedCaloriesBurned, filterConditions))
      console.log("set")
    }
  }

  const removeActivityDate = (activityId) => {
    setTrackedCaloriesBurned(removeActivityDateHelper(trackedCaloriesBurned, activityId))
  }

  const clearActivityDatesFilter = () => {
    setFilterConditions(null)
    setTrackedCaloriesBurnedView(trackedCaloriesBurned)
  }

  const selectScheduledTrackedCaloriesBurned = (dayTracked) => {
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