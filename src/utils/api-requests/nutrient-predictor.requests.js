import { errorOnGetNutrientPredictions } from "../errors/nutrient-predictor.errors";

// nutrient predictor api requests

export const getMealPredictions = async (imageUrl) => {
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

export const getNutrientPredictions = async (mealDescription) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_NUTRIENT_PREDICTOR_PREDICT_NUTRIENTS}`)
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
    console.log(error)
    errorOnGetNutrientPredictions()
  }
}

export const getFoodObjectDetection = async (uploadedImage) => {
  try {
    console.log(uploadedImage)
    console.log(`${process.env.REACT_APP_API_URL_OBJECT_DETECTOR}${process.env.REACT_APP_API_URL_FOOD_OBJECT_DETECTION}`)

    let formData = new FormData();
    formData.append('image', uploadedImage);

    const resFoodObjectDetection = await fetch(`${process.env.REACT_APP_API_URL_OBJECT_DETECTOR}${process.env.REACT_APP_API_URL_FOOD_OBJECT_DETECTION}`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    })
    const { foodObject } = resFoodObjectDetection.json()
    return foodObject
  } catch (error) {
    console.log(error)
    errorOnGetNutrientPredictions()
  }
}