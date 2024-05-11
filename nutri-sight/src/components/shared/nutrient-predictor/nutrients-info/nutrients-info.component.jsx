import React, { useContext, Fragment } from "react";

import "./nutrients-info.styles.scss";

import { NutrientPredictorContext } from "../../../../contexts/shared/nutrient-predictor/nutrient-predictor.context";

const NutrientsInfo = () => {
  const { nutrientPredictions } = useContext(NutrientPredictorContext);

  console.log(nutrientPredictions)

  return (
    nutrientPredictions.map((prediction, index) => {
      return (
        <div key={ index } className="nutrients-info-container">
          <strong><h3>{`${prediction.name.toUpperCase()}`}</h3></strong>
          <br></br>

          <h4>{`Calories - ${prediction.calories}`}</h4>
          <h4>{`Serving size - ${prediction.servingSizeG} g`}</h4>

          <div className="nutrient-info-separator-container">
            <hr className="rounded"/>
          </div>
          <br></br>

          <strong><h4>Macronutrients</h4></strong>
          <h5>{`Carbohydrates - ${prediction.macronutrients.carbohydratesTotalG} g`}</h5>
          <h5>{`Protein - ${prediction.macronutrients.proteinG} g`}</h5>
          <h5>{`Fat - ${prediction.macronutrients.fatTotalG} g`}</h5>
          <h5>{`Saturated fat - ${prediction.macronutrients.fatSaturatedG} g`}</h5>

          <div className="nutrient-info-separator-container">
            <hr className="rounded"/>
          </div>
          <br></br>

          <strong><h4>Micronutrients</h4></strong>
            <Fragment key={ index }>
              <h5>{`Sodium - ${prediction.micronutrients.sodiumMG} mg`}</h5>
              <h5>{`Potassium - ${prediction.micronutrients.potassiumMG} mg`}</h5>
              <h5>{`Cholesterol - ${prediction.micronutrients.cholesterolMg} mg`}</h5>
              <h5>{`Fiber - ${prediction.micronutrients.fiberG} g`}</h5>
              <h5>{`Sugar - ${prediction.micronutrients.sugarG} g`}</h5>
            </Fragment>
        </div>
      )
    })
  )
};

export default NutrientsInfo;