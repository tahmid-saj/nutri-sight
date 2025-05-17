import { Fragment, useContext } from "react"
import "./nutrient-prediction.styles.tsx"
import { NutrientsInfoContainer } from "./nutrient-prediction.styles.tsx"

import { RecipesContext } from "../../../../../../contexts/shared/recipes/recipes.context.tsx"
import { Typography } from "@mui/material"
import OutlinedCard from "../../../../mui/card/card.component.tsx"
import { Divider } from "@mui/material"
import Button from "../../../../button/button.component.tsx"
import { ButtonsContainer } from "../../../../button/button.styles.tsx"
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../../../store/shared/user/user.selector.ts"
import { NutritionTrackerContext } from "../../../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context.tsx"
import { addDayTrackedFromPrediction, setFormInputMicronutrients } from "../../../../../../store/signed-out/nutrition-tracker/nutrition-tracker.action.ts";
import { selectNutritionTrackedDays } from "../../../../../../store/signed-out/nutrition-tracker/nutrition-tracker.selector.ts";

import { COLOR_CODES } from "../../../../../../utils/constants/shared.constants.ts"

const outlinedCardStyles = {
  backgroundColor: COLOR_CODES.general["0"]
}

const NutrientPrediction = () => {
  const { displayedRecipe } = useContext(RecipesContext)

  const currentUser = useSelector(selectCurrentUser)

  const { addDayTrackedFromPrediction: addDayTrackedFromPredictionSignedIn } = useContext(NutritionTrackerContext)
  
  const dispatch = useDispatch()
  const nutritionTrackedDays = useSelector(selectNutritionTrackedDays)
  
  const handleAddToTracker = (prediction: any) => {
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
      dispatch(addDayTrackedFromPrediction(nutritionTrackedDays!, predictionNutritionInfo))
      dispatch(setFormInputMicronutrients([]))
    }
  }

  return (
    <Fragment>
      <Typography>
        { displayedRecipe?.nutrientPredictions?.map((prediction, index) => {
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
                <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Sodium - ${prediction.micronutrients.sodiumG} mg`}</Typography>
                <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Potassium - ${prediction.micronutrients.potassiumG} mg`}</Typography>
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