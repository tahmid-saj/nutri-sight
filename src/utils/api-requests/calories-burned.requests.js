import { errorOnGetSearchActivity,
  errorOnGetTrackedCaloriesBurned,
  errorOnPostAddActivity, errorOnDeleteRemoveActivity,
  errorOnPutTrackedCaloriesBurned
 } from "../errors/calories-burned.errors"

// calories burned api requests

// helper functions
async function processSearchedActivity(trackedDayInfo, activityResults) {
  console.log(trackedDayInfo)

  return activityResults.map((activityResult) => {
    return {
      activity: String(activityResult.name),
      searchedActivity: String(trackedDayInfo.activity),
      dateTracked: String(trackedDayInfo.dateTracked),
      caloriesBurnedPerHour: Number(activityResult.calories_per_hour),
      durationMinutes: Number(activityResult.duration_minutes),
      totalCaloriesBurned: Number(activityResult.total_calories)
    }
  })
}

// searching activity
export async function getSearchActivity(trackedDayInfo) {
  try {
    let url = `${process.env.REACT_APP_API_NINJAS_CALORIES_BURNED_URL}${trackedDayInfo.activity}`

    if (trackedDayInfo.weightPounds !== "") {
      url = url + `&weight=${trackedDayInfo.weightPounds}`
    }
    if (trackedDayInfo.durationMinutes !== "") {
      url = url + `&duration=${trackedDayInfo.durationMinutes}`
    }

    const resActivityResults = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "X-Api-Key": `${process.env.REACT_APP_API_NINJAS_KEY}`
      }
    })

    const resJSON = await resActivityResults.json()
    const res = await processSearchedActivity(trackedDayInfo, resJSON)
    return res
  } catch (error) {
    errorOnGetSearchActivity()

    if (error) {
      return console.error("Request failed: ", error)
    }
  }
}

// signing in
export async function getTrackedCaloriesBurned(userId, email) {
  try {
    console.log(`${process.env.REACT_APP_API_URL_TRACKED_CALORIES_BURNED}/${userId}/${email}`)
    const response = await fetch(`${process.env.REACT_APP_API_URL_TRACKED_CALORIES_BURNED}/${userId}/${email}`)

    return response.json()
  } catch (error) {
    console.log(error)
    errorOnGetTrackedCaloriesBurned()
  }
}

// calories burned operations
export async function postAddActivity(userId, email, trackedDayInfo, activityId) {
  try {
    console.log(`${process.env.REACT_APP_API_URL_TRACKED_CALORIES_BURNED}/${userId}/${email}`)
    const response = await fetch(`${process.env.REACT_APP_API_URL_TRACKED_CALORIES_BURNED}/${userId}`, {
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

    console.log("resp")

    return response.status
  } catch (error) {
    console.log(error)
    errorOnPostAddActivity()
  }
}

export async function deleteRemoveActivity(userId, email, activityId) {
  try {
    console.log(`${process.env.REACT_APP_API_URL_TRACKED_CALORIES_BURNED}/${userId}/${email}`)
    const response = await fetch(`${process.env.REACT_APP_API_URL_TRACKED_CALORIES_BURNED}/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "text/plain"
      },
      body: String(activityId)
    })

    console.log("removed")

    return response.status
  } catch (error) {
    console.log(error)
    errorOnDeleteRemoveActivity()
  }
}

// signing out
export async function putTrackedCaloriesBurned(userId, email, trackedCaloriesBurned) {
  try {
    console.log(`${process.env.REACT_APP_API_URL_TRACKED_CALORIES_BURNED}/${userId}/${email}`)
    const response = await fetch(`${process.env.REACT_APP_API_URL_TRACKED_CALORIES_BURNED}/${userId}`, {
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
    console.log(error)
    errorOnPutTrackedCaloriesBurned()
  }
}