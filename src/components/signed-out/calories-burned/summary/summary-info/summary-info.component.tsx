import "./summary-info.styles.tsx"
import { CaloriesBurnedSummaryInfoContainer } from "./summary-info.styles.tsx"
import { useContext } from "react"
import { CaloriesBurnedContext } from "../../../../../contexts/signed-out/calories-burned/calories-burned.context.tsx"
import { COLOR_CODES, COMMON_SPACING } from "../../../../../utils/constants/shared.constants.ts"
import { Typography, Divider } from "@mui/material"
import SimplePaper from "../../../../shared/mui/paper/paper.component.tsx"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: COMMON_SPACING.summaryInfoCard.width
}

const SummaryInfo = () => {
  const { trackedCaloriesBurnedSummary } = useContext(CaloriesBurnedContext)

  // TODO: round displayed numbers via a helper function under utils
  return (
    <CaloriesBurnedSummaryInfoContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="h6">{ `Daily average calories burned : ${trackedCaloriesBurnedSummary?.dailyAverageCaloriesBurned?.toFixed(2)}` }</Typography>

        <br/>
        <Divider/>
        <br/>

        <Typography variant="h6">Most calories burned</Typography>
        <Typography variant="body1">{ `Date : ${trackedCaloriesBurnedSummary?.mostCaloriesBurned?.date}` }</Typography>
        <Typography variant="body1">{ `Calories burned : ${trackedCaloriesBurnedSummary?.mostCaloriesBurned?.caloriesBurned.toFixed(2)}` }</Typography>
        <Typography variant="body1">{ `Activity : ${trackedCaloriesBurnedSummary?.mostCaloriesBurned?.activity}` }</Typography>

        <br/>
        <Divider/>
        <br/>

        <Typography variant="body1">{ `Number of tracked days : ${trackedCaloriesBurnedSummary?.totalTrackedDays?.size}` }</Typography>
        <Typography variant="body1">{ `Number of activities : ${trackedCaloriesBurnedSummary?.totalTrackedActivities?.size}` }</Typography>
      </SimplePaper>
    </CaloriesBurnedSummaryInfoContainer>
  )
}

export default SummaryInfo