import "./summary-info.styles.scss"
import { useContext } from "react"
import { CaloriesBurnedContext } from "../../../../../contexts/signed-out/calories-burned/calories-burned.context"

const SummaryInfo = () => {
  const { trackedCaloriesBurnedSummary } = useContext(CaloriesBurnedContext)

  return (
    <div className="calories-burned-summary-info-container">
      <h3>{ `Daily average calories burned : ${trackedCaloriesBurnedSummary.dailyAverageCaloriesBurned}` }</h3>
      <br></br>
      <h3>Most calories burned</h3>
      <h5>{ `Date : ${trackedCaloriesBurnedSummary.mostCaloriesBurned.date}` }</h5>
      <h5>{ `Calories burned : ${trackedCaloriesBurnedSummary.mostCaloriesBurned.caloriesBurned}` }</h5>
      <h5>{ `Activity : ${trackedCaloriesBurnedSummary.mostCaloriesBurned.activity}` }</h5>
      <br></br>
      <h3>{ `Number of tracked days : ${trackedCaloriesBurnedSummary.totalTrackedDays.size}` }</h3>
      <h3>{ `Number of activities : ${trackedCaloriesBurnedSummary.totalTrackedActivities.size}` }</h3>
    </div>
  )
}

export default SummaryInfo