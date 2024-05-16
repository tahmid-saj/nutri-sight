import { Fragment, useContext } from "react"
import "./nutrient-prediction.styles.jsx"
import { NutrientsInfoContainer } from "./nutrient-prediction.styles.jsx"

import { RecipesContext } from "../../../../../../contexts/shared/recipes/recipes.context"
import { Typography } from "@mui/material"
import OutlinedCard from "../../../../mui/card/card.component"
import { Divider } from "@mui/material"

import { COLOR_CODES } from "../../../../../../utils/constants/shared.constants"

const outlinedCardStyles = {
  backgroundColor: COLOR_CODES.card.infoCard
}

const NutrientPrediction = () => {
  const { displayedRecipe } = useContext(RecipesContext)

  return (
    <Fragment>
      <Typography>
        { displayedRecipe.nutrientPredictions.map((prediction, index) => {
          return (
          <NutrientsInfoContainer key={ index }>
            <OutlinedCard styles={ outlinedCardStyles }>
            <strong><Typography sx={{ display: "flex", justifyContent: "center" }} variant="h6">{`${prediction.name.toUpperCase()}`}</Typography></strong>
            <br></br>

            <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Calories - ${prediction.calories}`}</Typography>
            <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Serving size - ${prediction.servingSizeG} g`}</Typography>

            <br></br>
            <Divider/>
            <br></br>

            <strong><h4>Macronutrients</h4></strong>
            <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Carbohydrates - ${prediction.macronutrients.carbohydratesTotalG} g`}</Typography>
            <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Protein - ${prediction.macronutrients.proteinG} g`}</Typography>
            <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Fat - ${prediction.macronutrients.fatTotalG} g`}</Typography>
            <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Saturated fat - ${prediction.macronutrients.fatSaturatedG} g`}</Typography>

            <br></br>
            <Divider/>
            <br></br>

            <strong><h4>Micronutrients</h4></strong>
              <Fragment key={ index }>
                <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Sodium - ${prediction.micronutrients.sodiumMG} mg`}</Typography>
                <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Potassium - ${prediction.micronutrients.potassiumMG} mg`}</Typography>
                <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Cholesterol - ${prediction.micronutrients.cholesterolMg} mg`}</Typography>
                <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Fiber - ${prediction.micronutrients.fiberG} g`}</Typography>
                <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Sugar - ${prediction.micronutrients.sugarG} g`}</Typography>
              </Fragment>
            </OutlinedCard>
          </NutrientsInfoContainer>
          )
        }) }
      </Typography>
    </Fragment>
  )
}

export default NutrientPrediction