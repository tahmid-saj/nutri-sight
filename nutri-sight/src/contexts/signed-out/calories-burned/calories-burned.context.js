import { createContext, useEffect, useState } from "react";

// helper functions

// initial state
export const CaloriesBurnedContext = createContext({
  trackedCaloriesBurned: [],
  trackedCaloriesBurnedView: [],
  // trackedCaloriesBurned and trackedCaloriesBurnedView structure:
  // [
  //   {
  //     dateTracked: "2023-11-11",
  //     activity: "running",
  //     duration: 60,
  //     caloriesBurnedPerHour: 354,
  //     totalCaloriesBurned: 354,
  //     activityId: 123
  //   }
  // ]

  searchActivity: () => {},
  addTrackedActivityDate: () => {},
  filterActivityDates: () => {},
  removeActivityDate: () => {},

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
  //     caloriesBurned: 300
  //   },
  //   totalTrackedDays: [],
  //   totalTrackedActivities: []
  // }
})

// context provider
export const CaloriesBurnedProvider = ({ children }) => {
  const [trackedCaloriesBurned, setTrackedCaloriesBurned] = useState([])
  const [searchActivityResults, setSearchActivityResults] = useState([])
  const [trackedCaloriesBurnedSummary, setTrackedCaloriesBurnedSummary] = useState({})
  const [trackedCaloriesBurnedView, setTrackedCaloriesBurnedView] = useState([])

  useEffect(() => {
    const summary = calculateSummary(trackedCaloriesBurned)

    setTrackedCaloriesBurnedSummary({
      dailyAverageCaloriesBurned: summary.dailyAverageCaloriesBurned,
      mostCaloriesBurned: {
        date: summary.mostCaloriesBurned.date,
        caloriesBurned: summary.mostCaloriesBurned.caloriesBurned
      },
      totalTrackedDays: summary.totalTrackedDays,
      totalTrackedActivities: summary.totalTrackedActivities
    })
  }, [trackedCaloriesBurned])

  const searchActivity = (trackedDayInfo) => {
    setSearchActivityResults(searchActivityHelper(trackedDayInfo))
  }

  const addTrackedActivityDate = (trackedDayInfo) => {
    setTrackedCaloriesBurned(addTrackedActivityDateHelper(trackedDayInfo))
  }

  const filterActivityDates = (filterConditions) => {

  }

  const removeActivityDate = (activityId) => {

  }
}