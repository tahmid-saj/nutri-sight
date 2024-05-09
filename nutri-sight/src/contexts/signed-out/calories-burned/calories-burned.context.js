import { createContext, useEffect, useState } from "react";

// helper functions

// initial state
export const CaloriesBurnedContext = createContext({
  trackedCaloriesBurned: [],
  // trackedCaloriesBurned structure:
  // [
  //   {
  //     dateTracked: "2023-11-11",
  //     activity: "running",
  //     duration: 60,
  //     caloriesBurnedPerHour: 354,
  //     totalCaloriesBurned: 354
  //   }
  // ]

  searchActivity: () => {},
  addTrackedActivityDate: () => {},
  filterActivityDates: () => {},
  removeActivityDates: () => {},

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
  const [trackedCaloriesBurnedSummary, setTrackedCaloriesBurnedSummary] = useState({})

  
}