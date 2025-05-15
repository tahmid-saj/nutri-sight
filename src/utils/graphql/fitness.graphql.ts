import { DocumentNode, gql } from "@apollo/client";

// graphql fitness queries
export const EXERCISES_BY_USER: DocumentNode = gql`
  query ExercisesByUser($userId: String!, $email: String!) {
    exercisesByUser(userId: $userId, email: $email) {
      exerciseDate
      exerciseName
      exerciseSets
      exerciseReps
      exerciseType
      exerciseMuscle
      exerciseEquipment
      exerciseDifficulty
      exerciseInstructions
      exerciseTag
    }
  }
`

// graphql fitness mutations
export const CREATE_USER_EXERCISE: DocumentNode = gql`
  query CreateUserExercise($userId: String!, $email: String!, $exercise: ExerciseInfo!) {
    createUserExercise(userId: $userId, email: $email, exercise: $exercise)
  }
`

export const DELETE_USER_EXERCISE: DocumentNode = gql`
  query DeleteUserExercise($userId: String!, $email: String!, $exerciseTag: Int!) {
    deleteUserExercise(userId: $userId, email: $email, exerciseTag: $exerciseTag)
  }
`

export const UPDATE_USER_EXERCISES: DocumentNode = gql`
  query UpdateUserExercises($userId: String!, $email: String!, $exercises: [ExerciseInfo]!) {
    updateUserExercises(userId: $userId, email: $email, exercises: $exercises)
  }
`