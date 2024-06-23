import { errorOnGetSearchActivity,
  errorOnGetTrackedCaloriesBurned,
  errorOnPostAddActivity, errorOnDeleteRemoveActivity,
  errorOnPutTrackedCaloriesBurned
 } from "../errors/calories-burned.errors"

// calories burned api requests

// searching activity
export async function getSearchActivity(trackedDayInfo) {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_CALORIES_BURNED_SEARCH_ACTIVITY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(trackedDayInfo)
    })
    const resJSON = await response.json()

    return resJSON.searchedActivities
  } catch (error) {
    
    errorOnGetSearchActivity()
  }
}

// signing in
export async function getTrackedCaloriesBurned(userId, email) {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_TRACKED_CALORIES_BURNED}/${userId}/${email}`)

    return response.json()
  } catch (error) {
    
    errorOnGetTrackedCaloriesBurned()
  }
}

// calories burned operations
export async function postAddActivity(userId, email, trackedDayInfo, activityId) {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_TRACKED_CALORIES_BURNED}/${userId}/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        dateTracked: trackedDayInfo.dateTracked,
        activity: trackedDayInfo.activity,
        durationMinutes: trackedDayInfo.durationMinutes,
        caloriesBurnedPerHour: trackedDayInfo.caloriesBurnedPerHour,
        totalCaloriesBurned: trackedDayInfo.totalCaloriesBurned,
        activityId: activityId
      })
    })

    

    return response.status
  } catch (error) {
    
    errorOnPostAddActivity()
  }
}

export async function deleteRemoveActivity(userId, email, activityId) {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_TRACKED_CALORIES_BURNED}/${userId}/${email}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "text/plain"
      },
      body: String(activityId)
    })

    

    return response.status
  } catch (error) {
    
    errorOnDeleteRemoveActivity()
  }
}

// signing out
export async function putTrackedCaloriesBurned(userId, email, trackedCaloriesBurned) {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_TRACKED_CALORIES_BURNED}/${userId}/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        trackedCaloriesBurned: trackedCaloriesBurned
      })
    })

    return response.status
  } catch (error) {
    
    errorOnPutTrackedCaloriesBurned()
  }
}