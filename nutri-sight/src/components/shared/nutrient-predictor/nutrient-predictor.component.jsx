import React, { Component, useContext } from "react";

import "./nutrient-predictor.styles.scss";
import UploadFoodImage from "./upload-food-image/upload-food-image.component";
import NutrientsInfo from "./nutrients-info/nutrients-info.component";

import { NutrientPredictorContext } from "../../../contexts/shared/nutrient-predictor/nutrient-predictor.context";

const NutrientPredictor = () => {
  const { imageAndPrediction } = useContext(NutrientPredictorContext);

  return (
    <div className="upload-food-image-nutrients-info-container">
      <UploadFoodImage 
        // displayNutrients={ this.displayNutrients }
      ></UploadFoodImage>

      {
        imageAndPrediction.prediction &&
        <NutrientsInfo></NutrientsInfo>
      }
    </div>
  );
};

export default NutrientPredictor;
