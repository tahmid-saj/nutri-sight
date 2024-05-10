import React, { useContext, Fragment } from "react";

import "./nutrients-info.styles.scss";

import { NutrientPredictorContext } from "../../../../contexts/shared/nutrient-predictor/nutrient-predictor.context";

const NutrientsInfo = () => {
  const { nutrientPredictions } = useContext(NutrientPredictorContext);

  return (
    nutrientPredictions.map((prediction, index) => {
      return (
        <div key={ index } className="nutrients-info-container">
          <strong><h1>{`${prediction.name}`}</h1></strong>
          <h4>{`Calories - ${prediction.calories}`}</h4>
          <h5>{`Serving size - ${prediction.servingSizeG} g`}</h5>
          <br></br>
          <strong><h2>Macronutrients</h2></strong>
          <h4>{`Carbohydrates - ${prediction.macronutrients.carbohydratesTotalG} g`}</h4>
          <h4>{`Protein - ${prediction.macronutrients.proteinG} g`}</h4>
          <h4>{`Fat - ${prediction.macronutrients.fatTotalG} g`}</h4>
          <h4>{`Saturated fat - ${prediction.macronutrients.fatSaturatedG} g`}</h4>

          <strong><h2>Micronutrients</h2></strong>
          {
            prediction.micronutrients.map((micronutrient, index) => {
              return (
                <Fragment key={ index }>
                  <h4>{`Sodium - ${micronutrient.sodiumMG} mg`}</h4>
                  <h4>{`Potassium - ${micronutrient.potassiumMG} mg`}</h4>
                  <h4>{`Cholesterol - ${micronutrient.cholesterolMg} mg`}</h4>
                  <h4>{`Fiber - ${micronutrient.fiberG} g`}</h4>
                  <h4>{`Sugar - ${micronutrient.sugarG} g`}</h4>
                </Fragment>
              )
            })
          }

        </div>
      )
    })
  )
};

export default NutrientsInfo;