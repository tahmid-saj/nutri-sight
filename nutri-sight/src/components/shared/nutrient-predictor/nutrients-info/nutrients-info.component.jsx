import React, { useContext } from "react";

import "./nutrients-info.styles.scss";

import { NutrientPredictorContext } from "../../../../context/shared/nutrient-predictor/nutrient-predictor.context";

const NutrientsInfo = () => {
  const { prediction } = useContext(NutrientPredictorContext).imageAndPrediction;

  return (
    <div className="nutrients-info-container">
      <strong><h1>{`${prediction.food}`}</h1></strong>

      <strong><h2>Macronutrients</h2></strong>
      <h4>{`Calories - ${prediction.calories}`}</h4>
      <h4>{`Carb - ${prediction.macronutrients.carbohydrates.amount}`}</h4>
      <h4>{`Protein - ${prediction.macronutrients.protein.amount}`}</h4>
      <h4>{`Fat - ${prediction.macronutrients.fat.amount}`}</h4>

      <strong><h2>Micronutrients</h2></strong>

      {
        prediction.micronutrients.map((micronutrient, index) => {
          return <h4 key={index}>{`${micronutrient.name} - ${micronutrient.amount} ${micronutrient.unit}`}</h4>
        })
      }

    </div>
  )
};

export default NutrientsInfo;