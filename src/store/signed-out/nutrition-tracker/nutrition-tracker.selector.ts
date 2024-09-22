import { createSelector } from "reselect"
import { NutritionTrackerState } from "./nutrition-tracker.reducer"
import { RootState } from "../../store"

const selectNutritionTrackerReducer = (state: RootState): NutritionTrackerState => state.nutritionTracker

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

export const selectSelectedNutritionTrackedDay = createSelector(
  [selectNutritionTrackerReducer],
  (nutritionTracker) => nutritionTracker.selectedNutritionTrackedDay
)

export const selectScheduledNutritionTrackedDaysView = createSelector(
  [selectNutritionTrackerReducer],
  (nutritionTracker) => nutritionTracker.scheduledNutritionTrackedDaysView
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