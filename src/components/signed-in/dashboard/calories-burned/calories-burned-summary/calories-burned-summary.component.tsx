import "./calories-burned-summary.styles.js"
import { CaloriesBurnedDashboardSummaryContainer } from "./calories-burned-summary.styles.js"
import { useContext } from "react"
import { CaloriesBurnedContext } from "../../../../../contexts/signed-in/calories-burned/calories-burned.context.js"
import { Divider, Typography } from "@mui/material"
import SimplePaper from "../../../../shared/mui/paper/paper.component.js"
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants.js"

const paperStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: COLOR_CODES.general["1"],
  marginLeft: "2%",
  marginRight: "2%"
}

const CaloriesBurnedSummary = () => {
  const { trackedCaloriesBurnedSummary } = useContext(CaloriesBurnedContext)

  return (
    <SimplePaper styles={ paperStyles }>
      <CaloriesBurnedDashboardSummaryContainer>
        <Typography variant="h6">{ `Daily average burned : ${trackedCaloriesBurnedSummary?.dailyAverageCaloriesBurned}` }</Typography>

        <br/>
        <Divider/>
        <br/>

        <Typography variant="h6">Most calories burned</Typography>
        <Typography variant="body1">{ `Date : ${trackedCaloriesBurnedSummary?.mostCaloriesBurned?.date}` }</Typography>
        <Typography variant="body1">{ `Calories burned : ${trackedCaloriesBurnedSummary?.mostCaloriesBurned?.caloriesBurned}` }</Typography>
        <Typography variant="body1">{ `Activity : ${trackedCaloriesBurnedSummary?.mostCaloriesBurned?.activity}` }</Typography>
      </CaloriesBurnedDashboardSummaryContainer>
    </SimplePaper>
  )
}

export default CaloriesBurnedSummary