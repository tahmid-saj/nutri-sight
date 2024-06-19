import "./schedule-day-info.styles.scss"
import { Typography, Divider } from "@mui/material"
import { Fragment, useContext } from "react"
import SimplePaper from "../../../../../shared/mui/paper/paper.component"
import { COLOR_CODES } from "../../../../../../utils/constants/shared.constants"
import { NutritionTrackerContext } from "../../../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: 400
}

const ScheduleDayInfo = () => {
  const { scheduledNutritionTrackedDaysView } = useContext(NutritionTrackerContext)

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