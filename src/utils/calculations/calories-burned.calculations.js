// calories burned calculations

export const calculateSummary = (trackedCaloriesBurned) => {
  

  let dailyAverageCaloriesBurned = 0
  let mostBurned = {
    date: "",
    caloriesBurned: 0,
    activity: "",
  }
  let totalTrackedDays = new Set()
  let totalTrackedActivities = new Set()

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