import React from "react";

import "./nutrient-predictor.styles.scss";
import UploadFoodImage from "./upload-food-image/upload-food-image.component";
import NutrientsInfo from "./nutrients-info/nutrients-info.component";

const NutrientPredictor = () => {
  return (
    <div className="upload-food-image-nutrients-info-container">
      <UploadFoodImage></UploadFoodImage>

      <NutrientsInfo></NutrientsInfo>
    </div>
  )
};

export default NutrientPredictor;
