import "./summary-info.styles.scss"
import { useContext } from "react"
import { CaloriesBurnedContext } from "../../../../../contexts/signed-in/calories-burned/calories-burned.context"

const SummaryInfo = () => {
  const { trackedCaloriesBurnedSummary } = useContext(CaloriesBurnedContext)

  // TODO: round displayed numbers via a helper function under utils
  return (
    <div className="calories-burned-summary-info-container">
      <h3>{ `Daily average calories burned : ${trackedCaloriesBurnedSummary.dailyAverageCaloriesBurned}` }</h3>
      <br></br>
      <h3>Most calories burned</h3>
      <h4>{ `Date : ${trackedCaloriesBurnedSummary.mostCaloriesBurned.date}` }</h4>
      <h4>{ `Calories burned : ${trackedCaloriesBurnedSummary.mostCaloriesBurned.caloriesBurned}` }</h4>
      <h4>{ `Activity : ${trackedCaloriesBurnedSummary.mostCaloriesBurned.activity}` }</h4>
      <br></br>
      <h3>{ `Number of tracked days : ${trackedCaloriesBurnedSummary.totalTrackedDays.size}` }</h3>
      <h3>{ `Number of activities : ${trackedCaloriesBurnedSummary.totalTrackedActivities.size}` }</h3>
    </div>
  )
}

export default SummaryInfo