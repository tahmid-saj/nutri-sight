import { DocumentNode, gql } from "@apollo/client";

// graphql calories burned queries
export const TRACKED_CALORIES_BURNED_BY_USER: DocumentNode = gql`
  query TrackedCaloriesBurnedByUser($userId: String!, $email: String!) {
    trackedCaloriesBurnedByUser(userId: $userId, email: $email) {
      dateTracked
      activity
      durationMinutes
      caloriesBurnedPerHour
      totalCaloriesBurned
      activityId
    }
  }
`

// graphql calories burned mutations
export const CREATE_USER_TRACKED_CALORIES_BURNED: DocumentNode = gql`
  mutation CreateUserTrackedCaloriesBurned($userId: String!, $email: String!, $trackedCaloriesBurned: TrackedCaloriesBurnedInfo!) {
    createUserTrackedCaloriesBurned(userId: $userId, email: $email, trackedCaloriesBurned: $trackedCaloriesBurned)
  }
`

export const DELETE_USER_TRACKED_CALORIES_BURNED: DocumentNode = gql`
  mutation DeleteUserTrackedCaloriesBurned($userId: String!, $email: String!, $activityId: Int!) {
    deleteUserTrackedCaloriesBurned(userId: $userId, email: $email, activityId: $activityId)
  }
`

export const UPDATE_USER_TRACKED_CALORIES_BURNED: DocumentNode = gql`
  mutation UpdateUserTrackedCaloriesBurned($userId: String!, $email: String!, $trackedCaloriesBurned: [TrackedCaloriesBurnedInfo]!) {
    updateUserTrackedCaloriesBurned(userId: $userId, email: $email, trackedCaloriesBurned: $trackedCaloriesBurned)
  }
`