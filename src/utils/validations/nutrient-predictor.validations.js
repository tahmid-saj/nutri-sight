// import { readChunk } from "read-chunk";
// import imageType, { minimumBytes } from "image-type";

import { IMAGE_EXTENSIONS } from "../constants/nutrient-predictor.constants";
import { errorOnInvalidImageType } from "../errors/nutrient-predictor.errors";

// validation functions

export const validateImgPath = (imgPath) => {
  // const buffer = await readChunk(imgPath, { length: minimumBytes });
  // const imgType = await imageType(buffer);

  // if (!(imgType === "image/png" || imgType === "png" || 
  //       imgType === "image/jpeg" || imgType === "jpeg" || 
  //       imgType === "image/jpg" || imgType === "jpg")) {
  //   
  //   return true;
  // }

  const paths = imgPath.split(".");

  if (!(imgPath.split(".")[paths.length - 1] === IMAGE_EXTENSIONS.png || 
    imgPath.split(".")[paths.length - 1] === IMAGE_EXTENSIONS.jpeg ||
    imgPath.split(".")[paths.length - 1] === IMAGE_EXTENSIONS.jpg ||
    imgPath.split(".")[paths.length - 1] === IMAGE_EXTENSIONS.PNG || 
    imgPath.split(".")[paths.length - 1] === IMAGE_EXTENSIONS.JPEG ||
    imgPath.split(".")[paths.length - 1] === IMAGE_EXTENSIONS.JPG)) {
      
    errorOnInvalidImageType();

    return true;
  }

  return false;
};