import "./calories-burned-summary.styles.scss"
import { useContext } from "react"
import { CaloriesBurnedContext } from "../../../../../contexts/signed-out/calories-burned/calories-burned.context"

const CaloriesBurnedSummary = () => {
  const { trackedCaloriesBurnedSummary } = useContext(CaloriesBurnedContext)

  return (
    <div className="calories-burned-dashboard-summary-container">
      <h3>{ `Daily average burned : ${trackedCaloriesBurnedSummary.dailyAverageCaloriesBurned}` }</h3>
      <br></br>
      <h3>Most calories burned</h3>
      <h4>{ `Date : ${trackedCaloriesBurnedSummary.mostCaloriesBurned.date}` }</h4>
      <h4>{ `Calories burned : ${trackedCaloriesBurnedSummary.mostCaloriesBurned.caloriesBurned}` }</h4>
      <h4>{ `Activity : ${trackedCaloriesBurnedSummary.mostCaloriesBurned.activity}` }</h4>
    </div>
  )
}

export default CaloriesBurnedSummary