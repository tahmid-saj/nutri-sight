import { createContext, useState, useEffect } from "react";

import { validateImgPath } from "../../../utils/validations/nutrient-predictor.validations";
import { getNutrientPrediction } from "../../../utils/api-requests/nutrient-predictor.requests";

// helper functions

const updateImageHelper = (imageAndPrediction, imgPath) => {
  // TODO: need validation to check if imgPath is valid and an image
  if (validateImgPath(imgPath) === true) {
    return imageAndPrediction
  }

  console.log(imgPath);

  return {
    ...imageAndPrediction,

    imagePath: String(imgPath),
  };
};

const updateImageAndPredictionHelper = async (imageAndPrediction, imgPath, img) => {
  console.log(img);

  // TODO: need validation to check if imgPath and img are valid and an image
  if (validateImgPath(imgPath) === true) {
    return imageAndPrediction
  }

  // TODO: need to implement separate prediction function call
  const predictionResponse = await getNutrientPrediction(img);

  return {
    imagePath: String(imgPath),
    image: img,
    prediction: {
      food: String(predictionResponse.food),
      calories: Number(predictionResponse.calories),
      macronutrients: {
        carbohydrates: {
          amount: Number(predictionResponse.macronutrients.carbohydrates.amount),
          unit: String(predictionResponse.macronutrients.carbohydrates.unit)
        },
        protein: {
          amount: Number(predictionResponse.macronutrients.protein.amount),
          unit: String(predictionResponse.macronutrients.protein.unit),
        },
        fat: {
          amount: Number(predictionResponse.macronutrients.fat.amount),
          unit: String(predictionResponse.macronutrients.fat.unit),
        }
      },

      micronutrients: predictionResponse.micronutrients,
    }
  };
}

export const NutrientPredictorContext = createContext({
  imageAndPrediction: {},
  // imageAndPrediction structure
  // {
  //   imagePath: "path to image",
  //   image: "image itself",
  //   prediction: {
  //     food: "pizza",
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

  const updateImageAndPrediction = async (imgPath, img) => {
    const updateImageAndPredictionResponse = await updateImageAndPredictionHelper(imageAndPrediction, imgPath, img)
    setImageAndPrediction(updateImageAndPredictionResponse);
  };

  const value = { imageAndPrediction, updateImage, updateImageAndPrediction };

  return (
    <NutrientPredictorContext.Provider
      value={ value }>
      { children }
    </NutrientPredictorContext.Provider>
  );
};
