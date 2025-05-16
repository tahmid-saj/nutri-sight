import "./schedule-day-info.styles.tsx"
import { NutritionTrackerScheduleDayInfo } from "./schedule-day-info.styles.tsx"
import { Typography, Divider } from "@mui/material"
import { Fragment, useContext } from "react"
import SimplePaper from "../../../../../shared/mui/paper/paper.component.tsx"
import { COLOR_CODES, COMMON_SPACING } from "../../../../../../utils/constants/shared.constants.ts"
import { NutritionTrackerContext } from "../../../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context.tsx"
import { Micronutrient } from "../../../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.types.js"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: COMMON_SPACING.calendarDayInfo.width
}

const ScheduleDayInfo = () => {
  const { scheduledNutritionTrackedDaysView } = useContext(NutritionTrackerContext)

  return (
    <NutritionTrackerScheduleDayInfo>
      <SimplePaper styles={ paperStyles }>
        <Typography sx={{ display: "flex", justifyContent: "center" }} variant="h6">{`${scheduledNutritionTrackedDaysView.dateTracked}`}</Typography>
        <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Calories - ${scheduledNutritionTrackedDaysView.calories}`}</Typography>

        <br/>
        <Divider/>
        <br/>

        <Typography sx={{ display: "flex", justifyContent: "center" }} variant="h6">Macronutrients</Typography>
        <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Carbohydrates - ${scheduledNutritionTrackedDaysView.macronutrients.carbohydrates} g`}</Typography>
        <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Protein - ${scheduledNutritionTrackedDaysView.macronutrients.protein} g`}</Typography>
        <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Fat - ${scheduledNutritionTrackedDaysView.macronutrients.fat} g`}</Typography>

        {
          scheduledNutritionTrackedDaysView.micronutrients && scheduledNutritionTrackedDaysView.micronutrients.length !== 0 ? 
          <Fragment>
            <br/>
            <Divider/>
            <br/>

            <Typography sx={{ display: "flex", justifyContent: "center" }} variant="h6">Micronutrients</Typography>
            {
              scheduledNutritionTrackedDaysView.micronutrients.map((micronutrient: Micronutrient) => {
                return (
                  <Typography sx={{ display: "flex", justifyContent: "center" }} 
                    variant="body1">{`${micronutrient.name} - ${micronutrient.amount} ${micronutrient.unit}`}</Typography>
                )
              })
            }
          </Fragment> : null
        }
      </SimplePaper>
    </NutritionTrackerScheduleDayInfo>
  )
}

export default ScheduleDayInfo