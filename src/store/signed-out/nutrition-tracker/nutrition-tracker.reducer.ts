import { PayloadAction } from "@reduxjs/toolkit";
import { DayTrackedSearchResult, FilterConditions, FormInputMicronutrient, 
  NutritionTrackedDay, NutritionTrackedDaysSummary, NutritionTrackedDaysView, 
  ScheduledNutritionTrackedDaysView, SelectedNutritionTrackedDay } 
  from "./nutrition-tracker.types";
import { addDayTracked, addDayTrackedFromPrediction, addFormInputMicronutrients, clearDayTrackedFilter, 
  deleteFormInputMicronutrients, filterDayTracked, getDayTracked, removeDayTracked, selectScheduledNutritionTrackedDay, 
  setFormInputMicronutrients, setNutritionTrackedDaysSummary, setNutritionTrackedDaysView, 
  setScheduledNutritionTrackedDaysView, updateDayTracked, updateFormInputMicronutrients } from "./nutrition-tracker.action";

export type NutritionTrackerState = {
  readonly nutritionTrackedDays: NutritionTrackedDay[] | null | undefined;
  readonly formInputMicronutrients: FormInputMicronutrient[] | null | undefined;
  readonly filterConditions: FilterConditions | null | undefined;

  readonly selectedNutritionTrackedDay: SelectedNutritionTrackedDay | null | undefined;
  readonly scheduledNutritionTrackedDaysView: ScheduledNutritionTrackedDaysView | null | undefined;

  readonly nutritionTrackedDaysView: NutritionTrackedDaysView | null | undefined;
  readonly dayTrackedSearchResult: DayTrackedSearchResult | null | undefined;
  readonly nutritionTrackedDaysSummary: NutritionTrackedDaysSummary | null | undefined;
}

export const NUTRITION_TRACKER_INITIAL_STATE: NutritionTrackerState = {
  nutritionTrackedDays: [],
  formInputMicronutrients: [],
  filterConditions: null,

  selectedNutritionTrackedDay: null,
  scheduledNutritionTrackedDaysView: null,

  nutritionTrackedDaysView: [],
  dayTrackedSearchResult: undefined,
  nutritionTrackedDaysSummary: {}
}

export const nutritionTrackerReducer = (
  state = NUTRITION_TRACKER_INITIAL_STATE, 
  action: PayloadAction<any>
): NutritionTrackerState => {
  if (addDayTracked.match(action) || updateDayTracked.match(action) 
    || removeDayTracked.match(action) || addDayTrackedFromPrediction.match(action)) {
    return {
      ...state,
      nutritionTrackedDays: action.payload
    };
  }

  if (addFormInputMicronutrients.match(action) || updateFormInputMicronutrients.match(action)
    || deleteFormInputMicronutrients.match(action) || setFormInputMicronutrients.match(action)) {
    return {
      ...state,
      formInputMicronutrients: action.payload
    };
  }

  if (filterDayTracked.match(action) || clearDayTrackedFilter.match(action)) {
    return {
      ...state,
      filterConditions: action.payload
    };
  }

  if (selectScheduledNutritionTrackedDay.match(action)) {
    return {
      ...state,
      selectedNutritionTrackedDay: action.payload
    };
  }

  if (setScheduledNutritionTrackedDaysView.match(action)) {
    return {
      ...state,
      scheduledNutritionTrackedDaysView: action.payload
    };
  }

  if (setNutritionTrackedDaysView.match(action)) {
    return {
      ...state,
      nutritionTrackedDaysView: action.payload
    };
  }

  if (getDayTracked.match(action)) {
    return {
      ...state,
      dayTrackedSearchResult: action.payload
    };
  }

  if (setNutritionTrackedDaysSummary.match(action)) {
    return {
      ...state,
      nutritionTrackedDaysSummary: action.payload
    };
  }

  return state;
  
  // const { type, payload } = action

  // switch(type) {
  //   case NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS:
  //     return {
  //       ...state,
  //       nutritionTrackedDays: payload
  //     }
  //   case NUTRITION_TRACKER_ACTION_TYPES.SET_FORM_INPUT_MICRONUTRIENTS:
  //     return {
  //       ...state,
  //       formInputMicronutrients: payload
  //     }
  //   case NUTRITION_TRACKER_ACTION_TYPES.SET_FILTER_CONDITIONS:
  //     return {
  //       ...state,
  //       filterConditions: payload
  //     }
  //   case NUTRITION_TRACKER_ACTION_TYPES.SET_SELECTED_NUTRITION_TRACKED_DAY:
  //     return {
  //       ...state,
  //       selectedNutritionTrackedDay: payload
  //     }
  //   case NUTRITION_TRACKER_ACTION_TYPES.SET_SCHEDULED_NUTRITION_TRACKED_DAYS_VIEW:
  //     return {
  //       ...state,
  //       scheduledNutritionTrackedDaysView: payload
  //     }
  //   case NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS_VIEW:
  //     return {
  //       ...state,
  //       nutritionTrackedDaysView: payload
  //     }
  //   case NUTRITION_TRACKER_ACTION_TYPES.SET_DAY_TRACKED_SEARCH_RESULT:
  //     return {
  //       ...state,
  //       dayTrackedSearchResult: payload
  //     }
  //   case NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS_SUMMARY:
  //     return {
  //       ...state,
  //       nutritionTrackedDaysSummary: payload
  //     }
  //   default:
  //     return state
  // }
}