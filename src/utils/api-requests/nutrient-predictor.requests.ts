import { errorOnGetNutrientPredictions } from "../errors/nutrient-predictor.errors";

// nutrient predictor api requests

export const getMealPredictions = async (imageUrl: string): Promise<any> => {
  try {
    const resNutrientPrediction = await fetch(`${process.env.REACT_APP_API_URL_NUTRIENT_PREDICTOR}${process.env.REACT_APP_API_URL_NUTRIENT_PREDICTION}`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: String(imageUrl)
    })

    const { message } = await resNutrientPrediction.json()
    return message
  } catch (error) {
    errorOnGetNutrientPredictions()

    if (error) {
      return console.error("Request failed: ", error)
    }
  }
};

export const getNutrientPredictions = async (mealDescription: string): Promise<any> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_NUTRIENT_PREDICTOR_PREDICT_NUTRIENTS}`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: String(mealDescription)
    })
    const resJSON = await response.json()

    return resJSON.predictionResults
  } catch (error) {
    
    errorOnGetNutrientPredictions()
  }
}

export const getFoodObjectDetection = async (uploadedImage: string): Promise<any> => {
  try {
    
    

    let formData = new FormData();
    formData.append('image', uploadedImage);

    const resFoodObjectDetection = await fetch(`${process.env.REACT_APP_API_URL_OBJECT_DETECTOR}${process.env.REACT_APP_API_URL_FOOD_OBJECT_DETECTION}`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
      },
      body: formData
    })
    const { foodObject } = await resFoodObjectDetection.json()
    return foodObject
  } catch (error) {
    
    errorOnGetNutrientPredictions()
  }
}