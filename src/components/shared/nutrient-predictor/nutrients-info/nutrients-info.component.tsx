import "./nutrients-info.styles.jsx";
import { NutrientsInfoContainer } from "./nutrients-info.styles.jsx";

import React, { useContext, Fragment } from "react";
import { NutrientPredictorContext } from "../../../../contexts/shared/nutrient-predictor/nutrient-predictor.context.js";
import { Divider, Typography } from "@mui/material";
import OutlinedCard from "../../mui/card/card.component.js";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.js";
import Button from "../../button/button.component.js";
import { ButtonsContainer } from "../../button/button.styles.js";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../store/shared/user/user.selector.js"
import { NutritionTrackerContext } from "../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context.js";
import { addDayTrackedFromPrediction, setFormInputMicronutrients } from "../../../../store/signed-out/nutrition-tracker/nutrition-tracker.action.js";
import { selectNutritionTrackedDays } from "../../../../store/signed-out/nutrition-tracker/nutrition-tracker.selector.js";
import { NutrientPrediction } from "../../../../contexts/shared/nutrient-predictor/nutrient-predictor.types.js";

const outlinedCardStyles = {
  backgroundColor: COLOR_CODES.general["1"]
}

const NutrientsInfo = () => {
  const { nutrientPredictions } = useContext(NutrientPredictorContext);
  
  const currentUser = useSelector(selectCurrentUser)

  const { addDayTrackedFromPrediction: addDayTrackedFromPredictionSignedIn } = useContext(NutritionTrackerContext)
  
  const dispatch = useDispatch()
  const nutritionTrackedDays = useSelector(selectNutritionTrackedDays)
  
  const handleAddToTracker = (prediction: NutrientPrediction) => {
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
          amount: Number(prediction.micronutrients.sodiumG),
          unit: "mg"
        },
        {
          name: "Potassium",
          amount: Number(prediction.micronutrients.potassiumG),
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
    <div className="container">
      {
        nutrientPredictions.map((prediction, index) => {
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
        })
      }
    </div>
  )
};

export default NutrientsInfo;