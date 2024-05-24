import { createSelector } from "reselect"

const selectNutritionTrackerReducer = state => state.nutritionTracker

export const selectNutritionTrackedDays = createSelector(
  [selectNutritionTrackerReducer],
  (nutritionTracker) => nutritionTracker.nutritionTrackedDays
)

export const selectFormInputMicronutrients = createSelector(
  [selectNutritionTrackerReducer],
  (nutritionTracker) => nutritionTracker.formInputMicronutrients
)

export const selectFilterConditions = createSelector(
  [selectNutritionTrackerReducer],
  (nutritionTracker) => nutritionTracker.filterConditions
)

export const selectNutritionTrackedDaysView = createSelector(
  [selectNutritionTrackerReducer],
  (nutritionTracker) => nutritionTracker.nutritionTrackedDaysView
)

export const selectDayTrackedSearchResult = createSelector(
  [selectNutritionTrackerReducer],
  (nutritionTracker) => nutritionTracker.dayTrackedSearchResult
)

export const selectNutritionTrackedDaysSummary = createSelector(
  [selectNutritionTrackerReducer],
  (nutritionTracker) => nutritionTracker.nutritionTrackedDaysSummary
)