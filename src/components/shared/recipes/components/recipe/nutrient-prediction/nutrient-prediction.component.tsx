import { Fragment, useContext } from "react"
import "./nutrient-prediction.styles.js"
import { NutrientsInfoContainer } from "./nutrient-prediction.styles.js"

import { RecipesContext } from "../../../../../../contexts/shared/recipes/recipes.context.js"
import { Typography } from "@mui/material"
import OutlinedCard from "../../../../mui/card/card.component.js"
import { Divider } from "@mui/material"
import Button from "../../../../button/button.component.js"
import { ButtonsContainer } from "../../../../button/button.styles.js"
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../../../store/shared/user/user.selector.js"
import { NutritionTrackerContext } from "../../../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context.js"
import { addDayTrackedFromPrediction, setFormInputMicronutrients } from "../../../../../../store/signed-out/nutrition-tracker/nutrition-tracker.action.js";
import { selectNutritionTrackedDays } from "../../../../../../store/signed-out/nutrition-tracker/nutrition-tracker.selector.js";

import { COLOR_CODES } from "../../../../../../utils/constants/shared.constants.js"

const outlinedCardStyles = {
  backgroundColor: COLOR_CODES.general["0"]
}

const NutrientPrediction = () => {
  const { displayedRecipe } = useContext(RecipesContext)

  const currentUser = useSelector(selectCurrentUser)

  const { addDayTrackedFromPrediction: addDayTrackedFromPredictionSignedIn } = useContext(NutritionTrackerContext)
  
  const dispatch = useDispatch()
  const nutritionTrackedDays = useSelector(selectNutritionTrackedDays)
  
  const handleAddToTracker = (prediction) => {
    const currentDate = new Date()
    const predictionNutritionInfo = {
      dateTracked: currentDate.toISOString().split('T')[0],
      calories: Number(prediction.calories),
      macronutrients: {
        carbohydrates: Number(prediction.macronutrients.carbohydratesTotalG),
        protein: Number(prediction.macronutrients.proteinG),
        fat: Number(prediction.macronutrients.fatTotalG)
      },
      micronutrients: [
        {
          name: "Sodium",
          amount: Number(prediction.micronutrients.sodiumMG),
          unit: "mg"
        },
        {
          name: "Potassium",
          amount: Number(prediction.micronutrients.potassiumMG),
          unit: "mg"
        },
        {
          name: "Cholesterol",
          amount: Number(prediction.micronutrients.cholesterolMg),
          unit: "mg"
        },
        {
          name: "Fiber",
          amount: Number(prediction.micronutrients.fiberG),
          unit: "g"
        },
        {
          name: "Sugar",
          amount: Number(prediction.micronutrients.sugarG),
          unit: "g"
        },
      ]
    }

    // signed in
    if (currentUser) {
      addDayTrackedFromPredictionSignedIn(predictionNutritionInfo)

    // signed out
    } else {
      dispatch(addDayTrackedFromPrediction(nutritionTrackedDays, predictionNutritionInfo))
      dispatch(setFormInputMicronutrients([]))
    }
  }

  return (
    <Fragment>
      <Typography>
        { displayedRecipe.nutrientPredictions.map((prediction, index) => {
          return (
          <NutrientsInfoContainer key={ index }>
            <OutlinedCard styles={ outlinedCardStyles }>
              <Typography sx={{ display: "flex", justifyContent: "center" }} variant="h5">{`${prediction.name.toUpperCase()}`}</Typography>
              <br></br>

              <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Calories - ${prediction.calories}`}</Typography>
              <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Serving size - ${prediction.servingSizeG} g`}</Typography>

              <br></br>
              <Divider/>
              <br></br>

              <Typography sx={{ display: "flex", justifyContent: "center" }} variant="h6">Macronutrients</Typography>
              <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Carbohydrates - ${prediction.macronutrients.carbohydratesTotalG} g`}</Typography>
              <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Protein - ${prediction.macronutrients.proteinG} g`}</Typography>
              <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Fat - ${prediction.macronutrients.fatTotalG} g`}</Typography>
              <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Saturated fat - ${prediction.macronutrients.fatSaturatedG} g`}</Typography>

              <br></br>
              <Divider/>
              <br></br>

              <Typography sx={{ display: "flex", justifyContent: "center" }} variant="h6">Micronutrients</Typography>
              <Fragment key={ index }>
                <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Sodium - ${prediction.micronutrients.sodiumMG} mg`}</Typography>
                <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Potassium - ${prediction.micronutrients.potassiumMG} mg`}</Typography>
                <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Cholesterol - ${prediction.micronutrients.cholesterolMg} mg`}</Typography>
                <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Fiber - ${prediction.micronutrients.fiberG} g`}</Typography>
                <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Sugar - ${prediction.micronutrients.sugarG} g`}</Typography>
              </Fragment>

              <br></br>
              <Divider/>
              <br></br>

              <ButtonsContainer>
                <Button buttonType="regular-button" type="button" onClick={ () => handleAddToTracker(prediction) }>Add to tracker</Button>
              </ButtonsContainer>
            </OutlinedCard>
          </NutrientsInfoContainer>
          )
        }) }
      </Typography>
    </Fragment>
  )
}

export default NutrientPrediction