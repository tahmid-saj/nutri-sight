import { errorOnGetNutritionTrackedDaysData, errorOnGetNutritionTrackedDaysSummaryData,
  errorOnPostNutritionTrackedDay, errorOnDeleteNutritionTrackedDay, errorOnPutNutritionTrackedDay,
  errorOnPutNutritionTrackedDays, errorOnPutNutritionTrackedDaysSummary } from "../errors/nutrition-tracker.errors";

// nutrition tracker api requests

// sign in
export const getNutritionTrackedDaysData = async (userId, email) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_NUTRITION_TRACKED_DAYS}/${userId}/${email}`);
    const response = await fetch(`${process.env.REACT_APP_API_URL_NUTRITION_TRACKED_DAYS}/${userId}/${email}`);

    return response.json();
  } catch (error) {
    console.log(error);
    errorOnGetNutritionTrackedDaysData();
  }
};

export const getNutritionTrackedDaysSummaryData = async (userId, email) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_NUTRITION_TRACKED_DAYS_SUMMARY}/${userId}/${email}`);
    const response = await fetch(`${process.env.REACT_APP_API_URL_NUTRITION_TRACKED_DAYS_SUMMARY}/${userId}/${email}`);

    return response.json();
  } catch (error) {
    console.log(error);
    errorOnGetNutritionTrackedDaysSummaryData();
  }
};

// nutrition tracked days operations
export const postNutritionTrackedDay = async (userId, email, nutritionTrackedDay) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_NUTRITION_TRACKED_DAYS}/${userId}/${email}/${process.env.REACT_APP_API_URL_POST_NUTRITION_TRACKED_DAY}`);
    const response = await fetch(`${process.env.REACT_APP_API_URL_NUTRITION_TRACKED_DAYS}/${userId}/${email}/${process.env.REACT_APP_API_URL_POST_NUTRITION_TRACKED_DAY}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nutritionTrackedDay)
    });

    return response.status;
  } catch (error) {
    console.log(error);
    errorOnPostNutritionTrackedDay();
  }
};

export const deleteNutritionTrackedDay = async (userId, email, trackedDay) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_NUTRITION_TRACKED_DAYS}/${userId}/${email}/${process.env.REACT_APP_API_URL_DELETE_NUTRITION_TRACKED_DAY}`)
    const response = await fetch(`${process.env.REACT_APP_API_URL_NUTRITION_TRACKED_DAYS}/${userId}/${email}/${process.env.REACT_APP_API_URL_DELETE_NUTRITION_TRACKED_DAY}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "text/plain"
      },
      body: String(trackedDay)
    })

    console.log("removed")

    return response.status
  } catch (error) {
    console.log(error)
    errorOnDeleteNutritionTrackedDay()
  }
}

export const putNutritionTrackedDay = async (userId, email, originalNutritionTrackedDay, updatedNutritionTrackedDay) => {
  try {
    const nutritionTrackedDayInfo = {
      originalNutritionTrackedDay: originalNutritionTrackedDay,
      updatedNutritionTrackedDay: updatedNutritionTrackedDay,
    }

    console.log(`${process.env.REACT_APP_API_URL_NUTRITION_TRACKED_DAYS}/${userId}/${email}/${process.env.REACT_APP_API_URL_PUT_NUTRITION_TRACKED_DAY}`);
    const response = await fetch(`${process.env.REACT_APP_API_URL_NUTRITION_TRACKED_DAYS}/${userId}/${email}/${process.env.REACT_APP_API_URL_PUT_NUTRITION_TRACKED_DAY}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nutritionTrackedDayInfo)
    });

    return response.status;
  } catch (error) {
    console.log(error);
    errorOnPutNutritionTrackedDay();
  }
};

// sign out
export const putNutritionTrackedDays = async (userId, email, nutritionTrackedDays) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_NUTRITION_TRACKED_DAYS}/${userId}/${email}`);
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
    console.log(error);
    errorOnPutNutritionTrackedDays();
  }
};

export const putNutritionTrackedDaysSummary = async (userId, email, nutritionTrackedDaysSummary) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_NUTRITION_TRACKED_DAYS_SUMMARY}/${userId}/${email}`);
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
    console.log(error);
    errorOnPutNutritionTrackedDaysSummary();
  }
};
