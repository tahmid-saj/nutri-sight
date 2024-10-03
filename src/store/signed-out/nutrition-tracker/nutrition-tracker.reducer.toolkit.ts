// import { createSlice } from "@reduxjs/toolkit";
// import { NutritionTrackerState } from "./nutrition-tracker.reducer"

// export const NUTRITION_TRACKER_INITIAL_STATE: NutritionTrackerState = {
//   nutritionTrackedDays: [],
//   formInputMicronutrients: [],
//   filterConditions: null,
//   nutritionTrackedDaysView: [],
//   dayTrackedSearchResult: undefined,
//   nutritionTrackedDaysSummary: {}
// }

// export const nutritionTrackerSlice = createSlice({
//   name: "nutritionTracker",
//   initialState: NUTRITION_TRACKER_INITIAL_STATE,
//   reducers: {
//     setNutritionTrackedDays(state, action) {
//       state.nutritionTrackedDays = action.payload
//     },
//     setFormInputMicronutrients(state, action) {
//       state.formInputMicronutrients = action.payload
//     },
//     setFilterConditions(state, action) {
//       state.filterConditions = action.payload
//     },
//     setNutritionTrackedDaysView(state, action) {
//       state.nutritionTrackedDaysView = action.payload
//     },
//     setDayTrackedSearchResult(state, action) {
//       state.dayTrackedSearchResult = action.payload
//     },
//     setNutritionTrackedDaysSummary(state, action) {
//       state.nutritionTrackedDaysSummary = action.payload
//     }
//   }
// })

// export const { setNutritionTrackedDays, setFormInputMicronutrients, setFilterConditions,
//   setNutritionTrackedDaysView, setDayTrackedSearchResult, setNutritionTrackedDaysSummary
// } = nutritionTrackerSlice.actions

// export const nutritionTrackerReducer = nutritionTrackerSlice.reducer