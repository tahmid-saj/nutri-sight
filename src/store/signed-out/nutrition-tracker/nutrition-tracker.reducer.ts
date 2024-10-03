import { DayTrackedSearchResult, FilterConditions, FormInputMicronutrient, 
  NutritionTrackedDay, NutritionTrackedDaysSummary, NutritionTrackedDaysView, 
  ScheduledNutritionTrackedDaysView, SelectedNutritionTrackedDay } 
  from "./nutrition-tracker.types";
import { addDayTracked, addDayTrackedFromPrediction, addFormInputMicronutrients, clearDayTrackedFilter, 
  deleteFormInputMicronutrients, filterDayTracked, getDayTracked, removeDayTracked, selectScheduledNutritionTrackedDay, 
  setFormInputMicronutrients, setNutritionTrackedDaysSummary, setNutritionTrackedDaysView, 
  setScheduledNutritionTrackedDaysView, updateDayTracked, updateFormInputMicronutrients } from "./nutrition-tracker.action";
import { AnyAction } from "redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit"; // Import from Redux Toolkit for type safety

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
  action: AnyAction
): NutritionTrackerState => {
  const isPayloadAction = (a: AnyAction): a is { payload: any } => 'payload' in a;

  if ((addDayTracked.match(action) || updateDayTracked.match(action) 
    || removeDayTracked.match(action) || addDayTrackedFromPrediction.match(action))
    && isPayloadAction(action)) {
    return {
      ...state,
      nutritionTrackedDays: action.payload
    };
  }

  if ((addFormInputMicronutrients.match(action) || updateFormInputMicronutrients.match(action)
    || deleteFormInputMicronutrients.match(action) || setFormInputMicronutrients.match(action))
    && isPayloadAction(action)) {
    return {
      ...state,
      formInputMicronutrients: action.payload
    };
  }

  if ((filterDayTracked.match(action) || clearDayTrackedFilter.match(action))
    && isPayloadAction(action)) {
    return {
      ...state,
      filterConditions: action.payload
    };
  }

  if (selectScheduledNutritionTrackedDay.match(action) && isPayloadAction(action)) {
    return {
      ...state,
      selectedNutritionTrackedDay: action.payload
    };
  }

  if (setScheduledNutritionTrackedDaysView.match(action) && isPayloadAction(action)) {
    return {
      ...state,
      scheduledNutritionTrackedDaysView: action.payload
    };
  }

  if (setNutritionTrackedDaysView.match(action) && isPayloadAction(action)) {
    return {
      ...state,
      nutritionTrackedDaysView: action.payload
    };
  }

  if (getDayTracked.match(action) && isPayloadAction(action)) {
    return {
      ...state,
      dayTrackedSearchResult: action.payload
    };
  }

  if (setNutritionTrackedDaysSummary.match(action) && isPayloadAction(action)) {
    return {
      ...state,
      nutritionTrackedDaysSummary: action.payload
    };
  }

  return state;
}
