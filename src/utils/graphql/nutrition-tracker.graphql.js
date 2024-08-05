import { gql } from "@apollo/client";

// graphql nutrition tracker queries
export const NUTRITION_TRACKED_DAYS_BY_USER = gql`
  query NutritionTrackedDaysByUser($userId: String!, $email: String!) {
    nutritionTrackedDaysByUser(userId: $userId, email: $email) {
      dateTracked
      calories
      macronutrients {
        carbohydrates
        protein
        fat
      }
      micronutrients {
        exerciseName
        amount
        unit
      }
    }
  }
`

export const NUTRITION_TRACKED_DAYS_SUMMARY_BY_USER = gql`
  query NutritionTrackedDaysSummaryByUser($userId: String!, $email: String!) {
    nutritionTrackedDaysSummaryByUser(userId: $userId, email: $email) {
      averageDailyCaloriesConsumption
      averageDailyCarbohydratesConsumption
      averageDailyFatConsumption
    }
  }
`

// graphql nutrition tracker mutations
export const CREATE_USER_NUTRITION_TRACKED_DAY = gql`
  mutation CreateUserNutritionTrackedDay($userId: String!, $email: String!, $nutritionTrackedDay: NutritionTrackedDayInfo!) {
    createUserNutritionTrackedDay(userId: $userId, email: $email, nutritionTrackedDay: $nutritionTrackedDay)
  }
`

export const DELETE_USER_NUTRITION_TRACKED_DAY = gql`
  mutation DeleteUserNutritionTrackedDay($userId: String!, $email: String!, $nutritionTrackedDate: String!) {
    deleteUserNutritionTrackedDay(userId: $userId, email: $email, nutritionTrackedDate: $nutritionTrackedDate)
  }
`

export const UPDATE_USER_NUTRITION_TRACKED_DAY = gql`
  mutation UpdateUserNutritionTrackedDay($userId: String!, $email: String!, $nutritionTrackedDayInfoUpdate: NutritionTrackedDayInfoUpdate!) {
    updateUserNutritionTrackedDay(userId: $userId, email: $email, nutritionTrackedDayInfoUpdate: $nutritionTrackedDayInfoUpdate)
  }
`

export const UPDATE_USER_NUTRITION_TRACKED_DAYS = gql`
  mutation UpdateUserNutritionTrackedDays($userId: String!, $email: String!, $nutritionTrackedDays: [NutritionTrackedDayInfo]!) {
    updateUserNutritionTrackedDays(userId: $userId, email: $email, nutritionTrackedDays: $nutritionTrackedDays)
  }
`

export const UPDATE_USER_NUTRITION_TRACKED_DAYS_SUMMARY = gql`
  mutation UpdateUserNutritionTrackedDaysSummary($userId: String!, $email: String!, $nutritionTrackedDaysSummary: NutritionTrackedDaysSummaryInfo!) {
    updateUserNutritionTrackedDaysSummary(userId: $userId, email: $email, nutritionTrackedDaysSummary: $nutritionTrackedDaysSummary)
  }
`