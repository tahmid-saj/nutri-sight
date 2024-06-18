import { errorOnGetSearchExercise,
  errorOnGetExercises, errorOnPostAddExercise, errorOnDeleteRemoveExercise, errorOnPutExercises
} from "../errors/fitness.errors"

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

    return resJSON.searchedExercises
  } catch (error) {
    console.log(error)
    errorOnGetSearchExercise()
  }
}

// user sign in
export async function getExercises(userId, email) {
  try {
    console.log(`${process.env.REACT_APP_API_URL_FITNESS_EXERCISES}/${userId}/${email}`)
    const response = await fetch(`${process.env.REACT_APP_API_URL_FITNESS_EXERCISES}/${userId}/${email}`)

    return response.json()
  } catch (error) {
    console.log(error)
    errorOnGetExercises()
  }
}

// fitness operations
export async function postAddExercise(userId, email, exercise, exerciseTag, selectedSearchedExercise) {
  try {
    console.log(`${process.env.REACT_APP_API_URL_FITNESS_EXERCISES}/${userId}/${email}`)
    const response = await fetch(`${process.env.REACT_APP_API_URL_FITNESS_EXERCISES}/${userId}/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        exerciseDate: String(exercise.exerciseDate),
        exerciseName: String(selectedSearchedExercise.exerciseName),
        exerciseSets: Number(exercise.exerciseSets),
        exerciseReps: Number(exercise.exerciseReps),
        exerciseType: String(selectedSearchedExercise.exerciseType),
        exerciseMuscle: String(selectedSearchedExercise.exerciseMuscle),
        exerciseEquipment: String(selectedSearchedExercise.exerciseEquipment),
        exerciseDifficulty: String(selectedSearchedExercise.exerciseDifficulty),
        exerciseInstructions: String(selectedSearchedExercise.exerciseInstructions),
        exerciseTag: Number(exerciseTag),
      })
    })

    // console.log("resp")

    // return response.status
  } catch (error) {
    console.log(error)
    errorOnPostAddExercise()
  }
}

export async function deleteRemoveExercise(userId, email, exerciseTag) {
  try {
    console.log(`${process.env.REACT_APP_API_URL_FITNESS_EXERCISES}/${userId}/${email}`)
    const response = await fetch(`${process.env.REACT_APP_API_URL_FITNESS_EXERCISES}/${userId}/${email}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "text/plain"
      },
      body: String(exerciseTag)
    })

    // console.log("removed")

    // return response.status
  } catch (error) {
    console.log(error)
    errorOnDeleteRemoveExercise()
  }
}

// user sign out
export async function putExercises(userId, email, exercises) {
  try {
    console.log(`${process.env.REACT_APP_API_URL_FITNESS_EXERCISES}/${userId}/${email}`)
    const response = await fetch(`${process.env.REACT_APP_API_URL_FITNESS_EXERCISES}/${userId}/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        exercises: exercises
      })
    })

    // return response.status
  } catch (error) {
    console.log(error)
    errorOnPutExercises()
  }
}