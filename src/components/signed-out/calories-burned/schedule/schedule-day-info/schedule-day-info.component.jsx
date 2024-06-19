import "./schedule-day-info.styles.scss"
import { Typography, Divider } from "@mui/material"
import { Fragment, useContext } from "react"
import SimplePaper from "../../../../shared/mui/paper/paper.component"
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants"
import { CaloriesBurnedContext } from "../../../../../contexts/signed-out/calories-burned/calories-burned.context"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: 400
}

const ScheduleDayInfo = () => {
  const { scheduledTrackedCaloriesBurnedView } = useContext(CaloriesBurnedContext)

  return (
    <div className="calories-burned-schedule-day-info">
      <SimplePaper styles={ paperStyles }>
        <Typography sx={{ display: "flex", justifyContent: "center" }} variant="h6">{`${scheduledTrackedCaloriesBurnedView.dateTracked}`}</Typography>
        <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Activity - ${scheduledTrackedCaloriesBurnedView.activity}`}</Typography>
        <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Total calories burned - ${scheduledTrackedCaloriesBurnedView.totalCaloriesBurned}`}</Typography>

        <br/>
        <Divider/>
        <br/>

        <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Duration (mins) - ${scheduledTrackedCaloriesBurnedView.durationMinutes}`}</Typography>
        <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Calories burned / hr - ${scheduledTrackedCaloriesBurnedView.caloriesBurnedPerHour}`}</Typography>
      </SimplePaper>
    </div>
  )
}

export default ScheduleDayInfo