import { createContext, useState, useEffect } from "react";

// import { readChunk } from "read-chunk";
// import imageType, { minimumBytes } from "image-type";

// helper functions

// validation functions

const validateImgPath = async (imgPath) => {
  // const buffer = await readChunk(imgPath, { length: minimumBytes });
  // const imgType = await imageType(buffer);

  // if (!(imgType === "image/png" || imgType === "png" || 
  //       imgType === "image/jpeg" || imgType === "jpeg" || 
  //       imgType === "image/jpg" || imgType === "jpg")) {
  //   console.log("Invalid image type", imgPath.type);
  //   return true;
  // }

  const paths = imgPath.split(".");

  if (!(imgPath.split(".")[paths.length - 1] === "png" || imgPath.split(".")[paths.length - 1] === "jpeg" ||
    imgPath.split(".")[paths.length - 1] === "jpg")) {
    console.log("Invalid image type");
    return true;
  }

  return false;
};

export const updateImageHelper = (imageAndPrediction, imgPath) => {
  // TODO: need validation to check if imgPath is valid and an image
  if (validateImgPath(imgPath) === true) {
    return imageAndPrediction
  }

  console.log(imgPath);

  return {
    ...imageAndPrediction,

    imagePath: imgPath,
  };
};

export const updateImageAndPredictionHelper = (imageAndPrediction, imgPath, img) => {
  console.log(img);

  // TODO: need validation to check if imgPath and img are valid and an image
  if (validateImgPath(imgPath) === true) {
    return imageAndPrediction
  }

  // TODO: need to implement separate prediction function call

  return {
    ...imageAndPrediction,

    imagePath: imgPath,
    image: String(img),
  };
};

export const NutrientPredictorContext = createContext({
  imageAndPrediction: {},
  // imageAndPrediction structure
  // {
  //   imagePath: "path to image",
  //   image: "image itself",
  //   prediction: {
  //     calories: 2000,
  //     macronutrients: {
  //       carbohydrates: {
  //         amount: 1000,
  //         unit: "g",
  //       },
  //       protein: {
  //         amount: 500,
  //         unit: "g",
  //       },
  //       fat: {
  //         amount: 600,
  //         unit: "g",
  //       }
  //     },
  //     micronutrients: [
  //       {
  //         name: "Vitamin C",
  //         amount: 60,
  //         unit: "mg"
  //       },
  //       {
  //         name: "Minerals",
  //         amount: 300,
  //         unit: "mg"
  //       }
  //     ]
  //   }
  // }

  updateImage: () => {},
  updateImageAndPrediction: () => {},
});

export const NutrientPredictorProvider = ({ children }) => {
  const [imageAndPrediction, setImageAndPrediction] = useState({});

  useEffect(() => {
    console.log(imageAndPrediction);
  }, [imageAndPrediction]);

  const updateImage = (imgPath) => {
    setImageAndPrediction(updateImageHelper(imageAndPrediction, imgPath));
  };

  const updateImageAndPrediction = (imgPath, img) => {
    setImageAndPrediction(updateImageAndPredictionHelper(imageAndPrediction, imgPath, img));
  };

  const value = { imageAndPrediction, updateImage, updateImageAndPrediction };

  return (
    <NutrientPredictorContext.Provider
      value={ value }>
      { children }
    </NutrientPredictorContext.Provider>
  );
};
