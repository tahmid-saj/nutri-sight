import { createContext, useState } from "react";

// helper functions

export const updateImageHelper = (imageAndPrediction, imgPath) => {
  // TODO: need validation to check if imgPath is valid and an image

  return {
    ...imageAndPrediction,

    imagePath: imgPath,
  };
};

export const updateImageAndPredictionHelper = (imageAndPrediction, imgPath, img) => {
  // TODO: need validation to check if imgPath and img are valid and an image

  // TODO: need to implement separate prediction function call

  return {
    ...imageAndPrediction,

    imagePath: imgPath,
    image: img,
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
