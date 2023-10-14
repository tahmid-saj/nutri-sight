import React from "react";

import "./upload-food-image.styles.scss";
import UploadImage from "./upload-image/upload-image.component";
import DetectNutrients from "./detect-nutrients/detect-nutrients.component";

const UploadFoodImage = ({ displayNutrients }) => {
  return (
    <div className="upload-image-detect-nutrients-container">
      <UploadImage displayNutrients={ displayNutrients }></UploadImage>
      <DetectNutrients></DetectNutrients>
    </div>
  )
};

export default UploadFoodImage;