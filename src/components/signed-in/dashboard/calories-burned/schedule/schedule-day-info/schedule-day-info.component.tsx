import "./schedule-day-info.styles.tsx"
import { CaloriesBurnedScheduleDayInfo } from "./schedule-day-info.styles.tsx"
import { Typography, Divider } from "@mui/material"
import { Fragment, useContext } from "react"
import SimplePaper from "../../../../../shared/mui/paper/paper.component.tsx"
import { COLOR_CODES, COMMON_SPACING } from "../../../../../../utils/constants/shared.constants.ts"
import { CaloriesBurnedContext } from "../../../../../../contexts/signed-in/calories-burned/calories-burned.context.tsx"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: COMMON_SPACING.calendarDayInfo.width
}

const ScheduleDayInfo = () => {
  const { scheduledTrackedCaloriesBurnedView } = useContext(CaloriesBurnedContext)

  if (!scheduledTrackedCaloriesBurnedView?.length) return <Fragment/>

  return (
    <CaloriesBurnedScheduleDayInfo>
    {
      scheduledTrackedCaloriesBurnedView.map((trackedCaloriesBurned) => {
        return (
          <SimplePaper styles={ paperStyles }>
            <Typography sx={{ display: "flex", justifyContent: "center" }} variant="h6">{`${trackedCaloriesBurned.dateTracked}`}</Typography>
            <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Activity - ${trackedCaloriesBurned.activity}`}</Typography>
            <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Total calories burned - ${trackedCaloriesBurned.totalCaloriesBurned}`}</Typography>

            <br/>
            <Divider/>
            <br/>

            <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Duration (mins) - ${trackedCaloriesBurned.durationMinutes}`}</Typography>
            <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Calories burned / hr - ${trackedCaloriesBurned.caloriesBurnedPerHour}`}</Typography>
          </SimplePaper>
        )
      })
    }
    </CaloriesBurnedScheduleDayInfo>
  )
}

export default ScheduleDayInfo