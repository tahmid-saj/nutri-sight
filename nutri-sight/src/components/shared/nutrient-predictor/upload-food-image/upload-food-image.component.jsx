import React from "react";

import "./upload-food-image.styles.scss";
import UploadImage from "./upload-image/upload-image.component";
import DetectNutrients from "./detect-nutrients/detect-nutrients.component";

const UploadFoodImage = () => {
  return (
    <div className="upload-image-detect-nutrients-container">
      <UploadImage></UploadImage>
      <DetectNutrients></DetectNutrients>
    </div>
  )
};

export default UploadFoodImage;