import { errorOnGetNutritionTrackedDaysData, errorOnGetNutritionTrackedDaysSummaryData,
  errorOnPostNutritionTrackedDay, errorOnDeleteNutritionTrackedDay, errorOnPutNutritionTrackedDay,
  errorOnPutNutritionTrackedDays, errorOnPutNutritionTrackedDaysSummary } from "../errors/nutrition-tracker.errors";

// nutrition tracker api requests

// sign in
export const getNutritionTrackedDaysData = async (userId, email) => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_NUTRITION_TRACKED_DAYS}/${userId}/${email}`);

    return response.json();
  } catch (error) {
    
    errorOnGetNutritionTrackedDaysData();
  }
};

export const getNutritionTrackedDaysSummaryData = async (userId, email) => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_NUTRITION_TRACKED_DAYS_SUMMARY}/${userId}/${email}`);

    return response.json();
  } catch (error) {
    
    errorOnGetNutritionTrackedDaysSummaryData();
  }
};

// nutrition tracked days operations
export const postNutritionTrackedDay = async (userId, email, nutritionTrackedDay) => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_NUTRITION_TRACKED_DAYS}/${userId}/${email}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nutritionTrackedDay)
    });

    return response.status;
  } catch (error) {
    
    errorOnPostNutritionTrackedDay();
  }
};

export const deleteNutritionTrackedDay = async (userId, email, trackedDay) => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_NUTRITION_TRACKED_DAYS}/${userId}/${email}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "text/plain"
      },
      body: String(trackedDay)
    })

    

    return response.status
  } catch (error) {
    
    errorOnDeleteNutritionTrackedDay()
  }
}

export const putNutritionTrackedDay = async (userId, email, originalNutritionTrackedDay, updatedNutritionTrackedDay) => {
  try {
    const nutritionTrackedDayInfo = {
      originalNutritionTrackedDay: originalNutritionTrackedDay,
      updatedNutritionTrackedDay: updatedNutritionTrackedDay,
    }

    
    const response = await fetch(`${process.env.REACT_APP_API_URL_NUTRITION_TRACKED_DAYS}/${userId}/${email}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nutritionTrackedDayInfo)
    });

    return response.status;
  } catch (error) {
    
    errorOnPutNutritionTrackedDay();
  }
};

// sign out
export const putNutritionTrackedDays = async (userId, email, nutritionTrackedDays) => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_NUTRITION_TRACKED_DAYS}/${userId}/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nutritionTrackedDays: nutritionTrackedDays
      })
    });

    return response.status;
  } catch (error) {
    
    errorOnPutNutritionTrackedDays();
  }
};

export const putNutritionTrackedDaysSummary = async (userId, email, nutritionTrackedDaysSummary) => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_NUTRITION_TRACKED_DAYS_SUMMARY}/${userId}/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nutritionTrackedDaysSummary: nutritionTrackedDaysSummary
      })
    });

    return response.status;
  } catch (error) {
    
    errorOnPutNutritionTrackedDaysSummary();
  }
};
