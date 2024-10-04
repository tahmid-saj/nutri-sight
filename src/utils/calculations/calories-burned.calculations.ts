// calories burned calculations

import { TrackedCaloriesBurned } from "../../contexts/signed-out/calories-burned/calories-burned.types"

export const calculateSummary = (trackedCaloriesBurned: TrackedCaloriesBurned[]) => {
  let dailyAverageCaloriesBurned = 0
  let mostBurned = {
    date: "",
    caloriesBurned: 0,
    activity: "",
  }
  let totalTrackedDays: Set<string | Date> = new Set()
  let totalTrackedActivities: Set<string> = new Set()

  trackedCaloriesBurned.map((trackedActivity) => {
    dailyAverageCaloriesBurned += trackedActivity.totalCaloriesBurned

    if (trackedActivity.totalCaloriesBurned >= mostBurned.caloriesBurned) {
      mostBurned = {
        date: String(trackedActivity.dateTracked),
        caloriesBurned: Number(trackedActivity.totalCaloriesBurned),
        activity: String(trackedActivity.activity)
      }
    }

    totalTrackedDays.add(trackedActivity.dateTracked)
    totalTrackedActivities.add(trackedActivity.activity)
  })

  return {
    dailyAverageCaloriesBurned: dailyAverageCaloriesBurned / totalTrackedDays.size,
    mostCaloriesBurned: {
      date: mostBurned.date,
      caloriesBurned: mostBurned.caloriesBurned,
      activity: mostBurned.activity
    },
    totalTrackedDays: totalTrackedDays,
    totalTrackedActivities: totalTrackedActivities
  }
}