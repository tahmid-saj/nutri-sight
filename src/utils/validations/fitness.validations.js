import { errorOnInvalidSearchedExerciseName, errorOnInvalidExerciseSetsReps } from "../errors/fitness.errors";
import { REGEX_PATTERNS } from "./regex.constants";

// fitness validations

// context

export const validateSearchedExercise = (exerciseQuery) => {
  if (REGEX_PATTERNS.search.test(exerciseQuery.exerciseName)) {

    errorOnInvalidSearchedExerciseName();
    return true;
  }

  return false
}

export const validateAddExercise = (exercise) => {
  // number
  if ((exercise.exerciseSets && (!(REGEX_PATTERNS.integerNumbers.test(String(exercise.exerciseSets))) || Number(exercise.exerciseSets) < 0)) ||
    (exercise.exerciseReps && (!(REGEX_PATTERNS.integerNumbers.test(String(exercise.exerciseReps))) || Number(exercise.exerciseReps) < 0))) {
    errorOnInvalidExerciseSetsReps()
    return true
  }

  return false
}

export const validateRemoveExercise = (exerciseTag) => {
  return false
}