import "./schedule-day-info.styles.scss"
import { useSelector } from "react-redux"
import { selectScheduledNutritionTrackedDaysView } from "../../../../../store/signed-out/nutrition-tracker/nutrition-tracker.selector"
import { Typography, Divider } from "@mui/material"
import { Fragment } from "react"
import SimplePaper from "../../../../shared/mui/paper/paper.component"
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: 400
}

const ScheduleDayInfo = () => {
  const scheduledNutritionTrackedDaysView = useSelector(selectScheduledNutritionTrackedDaysView)

  return (
    <div className="nutrition-tracker-schedule-day-info">
      <SimplePaper styles={ paperStyles }>
        <Typography sx={{ display: "flex", justifyContent: "center" }} variant="h6">{`${scheduledNutritionTrackedDaysView.dateTracked}`}</Typography>
        <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Calories - ${scheduledNutritionTrackedDaysView.calories}`}</Typography>

        <br/>
        <Divider/>
        <br/>

        <strong><h4>Macronutrients</h4></strong>
        <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Carbohydrates - ${scheduledNutritionTrackedDaysView.macronutrients.carbohydrates} g`}</Typography>
        <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Protein - ${scheduledNutritionTrackedDaysView.macronutrients.protein} g`}</Typography>
        <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Fat - ${scheduledNutritionTrackedDaysView.macronutrients.fat} g`}</Typography>

        {
          scheduledNutritionTrackedDaysView.micronutrients && scheduledNutritionTrackedDaysView.micronutrients.length !== 0 ? 
          <Fragment>
            <br/>
            <Divider/>
            <br/>

            <strong><h4>Micronutrients</h4></strong>
            {
              scheduledNutritionTrackedDaysView.micronutrients.map((micronutrient) => {
                return (
                  <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`${micronutrient.name} - ${micronutrient.amount} ${micronutrient.unit}`}</Typography>
                )
              })
            }
          </Fragment> : null
        }
      </SimplePaper>
    </div>
  )
}

export default ScheduleDayInfo