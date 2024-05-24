import { NUTRITION_TRACKER_ACTION_TYPES } from "./nutrition-tracker.types";

export const NUTRITION_TRACKER_INITIAL_STATE = {
  nutritionTrackedDays: [],
  formInputMicronutrients: [],
  filterConditions: null,
  nutritionTrackedDaysView: [],
  dayTrackedSearchResult: undefined,
  nutritionTrackedDaysSummary: {}
}

export const nutritionTrackerReducer = (state=NUTRITION_TRACKER_INITIAL_STATE, action={}) => {
  const { type, payload } = action

  switch(type) {
    case NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS:
      return {
        ...state,
        nutritionTrackedDays: payload
      }
    case NUTRITION_TRACKER_ACTION_TYPES.SET_FORM_INPUT_MICRONUTRIENTS:
      return {
        ...state,
        formInputMicronutrients: payload
      }
    case NUTRITION_TRACKER_ACTION_TYPES.SET_FILTER_CONDITIONS:
      return {
        ...state,
        filterConditions: payload
      }
    case NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS_VIEW:
      return {
        ...state,
        nutritionTrackedDaysView: payload
      }
    case NUTRITION_TRACKER_ACTION_TYPES.SET_DAY_TRACKED_SEARCH_RESULT:
      return {
        ...state,
        dayTrackedSearchResult: payload
      }
    case NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS_SUMMARY:
      return {
        ...state,
        nutritionTrackedDaysSummary: payload
      }
    default:
      return state
  }
}