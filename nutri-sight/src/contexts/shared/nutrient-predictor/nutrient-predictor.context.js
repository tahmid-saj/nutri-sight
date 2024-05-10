import { createContext, useState, useEffect } from "react";

import { validateImgPath } from "../../../utils/validations/nutrient-predictor.validations";
import { getMealPredictions, getNutrientPredictions } from "../../../utils/api-requests/nutrient-predictor.requests";

import { NUTRIENT_PREDICTOR_ENUMS } from "../../../utils/constants/nutrient-predictor.constants"

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
  const predictionResponse = await getMealPredictions(img);

  return {
    imagePath: String(imgPath),
    image: img,
    predictions: predictionResponse
  };
}

const detectNutrientsHelper = async (mealDescription) => {
  return getNutrientPredictions(mealDescription)
}

export const NutrientPredictorContext = createContext({
  predictionInputType: "",
  imageAndPrediction: {},
  // imageAndPrediction structure
  // {
  //   imagePath: "path to image",
  //   image: "image itself",
  //   predictionDescription: "1 pound of steak with mashed potatoes and a can of sprite"
  // }

  nutrientPredictions: [],
  // nutrientPredictions structure
  // [
  //   {
  //     name: "steak",
  //     servingSizeG: 453,
  //     calories: 1240,
  //     macronutrients: {
  //       carbohydratesTotalG: 0,
  //       proteinG: 117,
  //       fatTotalG: 85,
  //       fatSaturatedG: 32,
  //     },
  //     micronutrients: {
  //       sodiumMG: 236,
  //       potassiumMG: 880,
  //       cholesterolMg: 434,
  //       fiberG: 0,
  //       sugarG: 0
  //     }
  //   }
  // ]

  updateImage: () => {},
  updateImageAndPrediction: () => {},
});

export const NutrientPredictorProvider = ({ children }) => {
  const [predictionInputType, setPredictionInputType] = useState("")
  const [imageAndPrediction, setImageAndPrediction] = useState({});
  const [nutrientPredictions, setNutrientPredictions] = useState([])

  useEffect(() => {
    console.log(imageAndPrediction);
  }, [imageAndPrediction]);

  const updateImage = (imgPath) => {
    setImageAndPrediction(updateImageHelper(imageAndPrediction, imgPath));
  };

  const updateImageAndPrediction = async (imgPath, img) => {
    setPredictionInputType(NUTRIENT_PREDICTOR_ENUMS.image)
    const updateImageAndPredictionResponse = await updateImageAndPredictionHelper(imageAndPrediction, imgPath, img)
    setImageAndPrediction({
      ...imageAndPrediction,
      predictionDescription: updateImageAndPredictionResponse
    });
    await detectNutrients(updateImageAndPredictionResponse, NUTRIENT_PREDICTOR_ENUMS.image)
  };

  const detectNutrients = async (mealDescription, inputType) => {
    setPredictionInputType(inputType)
    const resNutrientPredictions = await detectNutrientsHelper(mealDescription)
    setNutrientPredictions(resNutrientPredictions)
  }

  const value = { imageAndPrediction, nutrientPredictions,
    updateImage, updateImageAndPrediction, detectNutrients };

  return (
    <NutrientPredictorContext.Provider
      value={ value }>
      { children }
    </NutrientPredictorContext.Provider>
  );
};
