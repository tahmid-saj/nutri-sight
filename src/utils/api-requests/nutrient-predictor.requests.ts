import { errorOnGetNutrientPredictions } from "../errors/nutrient-predictor.errors";
import { v4 as uuid } from "uuid";

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

// upload prediction image onto s3
export const uploadPredictionImage = async (uploadedImage: string): Promise<any> => {
  try {
    // retrieve pre-signed URL from nutri-prediction-api
    const resPresignedURL = await fetch(`${process.env.REACT_APP_API_URL_NUTRI_PRED}${process.env.REACT_APP_API_PRE_SIGNED_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        objectKey: uuid()
      })
    })

    const presignedUrl = resPresignedURL.json().toString()

    // upload image using pre-signed URL
    if (resPresignedURL) {
      const resUploadImage = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/octet-stream"
        },
        body: uploadedImage
      })

      if (!resUploadImage.ok) {
        errorOnGetNutrientPredictions()
      }
    } else {
      errorOnGetNutrientPredictions()
    }
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