import { ReactNode } from "react";

// nutrient predictor types

export interface NutrientPredictorContextType {
  predictionInputType: string;
  imageAndPrediction: ImageWithPrediction | undefined;
  nutrientPredictions: NutrientPrediction[];

  detectNutrients: (mealDescription: string, inputType: string) => Promise<void> | undefined,

  updateImage: (mealDescription: string, inputType: string) => void;
  updateImageAndPrediction: (imgPath: string, imageInputType: string, uploadedImage?: string) => void;
}

export interface NutrientPredictorProviderProps {
  children: ReactNode;
}

export type ImageWithPrediction = {
  imagePath: string;
  image: string;
  predictionDescription: string;
}

export type NutrientPrediction = {
  name: string;
  servingSizeG: number;
  calories: number;
  macronutrients: Macronutrients;
  micronutrients: Micronutrients;
}

export type Macronutrients = {
  carbohydratesTotalG: number;
  proteinG: number;
  fatTotalG: number;
  fatSaturatedG: number;
}

export type Micronutrients = {
  sodiumG: number;
  potassiumG: number;
  cholesterolMg: number;
  fiberG: number;
  sugarG: number;
}