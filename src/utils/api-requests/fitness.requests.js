import { errorOnGetSearchExercise } from "../errors/fitness.errors"

// fitness api requests

// search exercise
export async function getSearchedExercise(exerciseQuery) {
  try {
    console.log(`${process.env.REACT_APP_API_URL_FITNESS_SEARCH_EXERCISE}`)

    const response = await fetch(`${process.env.REACT_APP_API_URL_FITNESS_SEARCH_EXERCISE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        exerciseName: String(exerciseQuery.exerciseName),
        exerciseType: String(exerciseQuery.exerciseType),
        exerciseMuscle: String(exerciseQuery.exerciseMuscle),
        exerciseDifficulty: String(exerciseQuery.exerciseDifficulty)
      })
    })
    const resJSON = await response.json()

    console.log(resJSON)
    return []
  } catch (error) {
    console.log(error)
    errorOnGetSearchExercise()
  }
}