import { validatePredictionInfo, validateAddDayTracked, validateUpdateDayTracked, 
  validateFilterNutritionTrackedDays, validateRemoveNutritionTrackedDay 
} from "../../../utils/validations/nutrition-tracker.validations";

import { DEFAULT_MICRONUTRIENT } from "../../../utils/constants/nutrition-tracker.constants";
import { createAction, ActionWithPayload, withMatcher } from "../../../utils/reducer/reducer.utils";
import { DayTrackedSearchResult, FilterConditions, FormInputMicronutrient, Micronutrient, NUTRITION_TRACKER_ACTION_TYPES, NutritionTrackedDay, NutritionTrackedDaysSummary, NutritionTrackedDaysView, PredictionNutritionInfo, ScheduledNutritionTrackedDaysView } from "./nutrition-tracker.types";

export type AddDayTracked = ActionWithPayload<NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS, NutritionTrackedDay[]>
export type UpdateDayTracked = ActionWithPayload<NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS, NutritionTrackedDay[]>
export type RemoveDayTracked = ActionWithPayload<NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS, NutritionTrackedDay[]>
export type AddDayTrackedFromPrediction = ActionWithPayload<NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS, NutritionTrackedDay[]>

export type GetDayTracked = ActionWithPayload<NUTRITION_TRACKER_ACTION_TYPES.SET_DAY_TRACKED_SEARCH_RESULT, DayTrackedSearchResult>

export type AddFormInputMicronutrients = ActionWithPayload<NUTRITION_TRACKER_ACTION_TYPES.SET_FORM_INPUT_MICRONUTRIENTS, FormInputMicronutrient[]>
export type UpdateFormInputMicronutrients = ActionWithPayload<NUTRITION_TRACKER_ACTION_TYPES.SET_FORM_INPUT_MICRONUTRIENTS, FormInputMicronutrient[]>
export type DeleteFormInputMicronutrients = ActionWithPayload<NUTRITION_TRACKER_ACTION_TYPES.SET_FORM_INPUT_MICRONUTRIENTS, FormInputMicronutrient[]>
export type SetFormInputMicronutrients = ActionWithPayload<NUTRITION_TRACKER_ACTION_TYPES.SET_FORM_INPUT_MICRONUTRIENTS, FormInputMicronutrient[]>

export type FilterDayTracked = ActionWithPayload<NUTRITION_TRACKER_ACTION_TYPES.SET_FILTER_CONDITIONS, FilterConditions | null>
export type ClearDayTrackedFilter = ActionWithPayload<NUTRITION_TRACKER_ACTION_TYPES.SET_FILTER_CONDITIONS, null>

export type SetNutritionTrackedDaysView = ActionWithPayload<NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS_VIEW, NutritionTrackedDaysView>
export type SetNutritionTrackedDaysSummary = ActionWithPayload<NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS_SUMMARY, NutritionTrackedDaysSummary>

export type SelectScheduledNutritionTrackedDay = ActionWithPayload<NUTRITION_TRACKER_ACTION_TYPES.SET_SELECTED_NUTRITION_TRACKED_DAY, string | Date>
export type SetScheduledNutritionTrackedDaysView = ActionWithPayload<NUTRITION_TRACKER_ACTION_TYPES.SET_SCHEDULED_NUTRITION_TRACKED_DAYS_VIEW, ScheduledNutritionTrackedDaysView>

// TODO: sort the records by date
// helper functions

const addDayTrackedFromPredictionHelper = (nutritionTrackedDays: NutritionTrackedDay[], predictionNutritionInfo: PredictionNutritionInfo): NutritionTrackedDay[] => {
  if (validatePredictionInfo(nutritionTrackedDays, predictionNutritionInfo)) return nutritionTrackedDays

  let micronutrients: Micronutrient[] = []
  predictionNutritionInfo.micronutrients.map((micronutrient) => {
    micronutrients.push({
      name: String(micronutrient.name),
      amount: Number(micronutrient.amount),
      unit: String(micronutrient.unit)
    })
  })

  return [
    ...nutritionTrackedDays,
    {
      dateTracked: String(predictionNutritionInfo.dateTracked),
      calories: Number(predictionNutritionInfo.calories),
      macronutrients: {
        carbohydrates: Number(predictionNutritionInfo.macronutrients.carbohydrates),
        protein: Number(predictionNutritionInfo.macronutrients.protein),
        fat: Number(predictionNutritionInfo.macronutrients.fat),
      },
      micronutrients: micronutrients
    }
  ]
}

const addMicronutrientsToTrackedDayInfoHelper = (formInputMicronutrients: FormInputMicronutrient[], trackedDayInfo: NutritionTrackedDay): NutritionTrackedDay => {
  let micronutrients: Micronutrient[] = []
  formInputMicronutrients.map((micronutrient) => {
    micronutrients.push({
      name: String(micronutrient.name),
      amount: Number(micronutrient.amount),
      unit: String(micronutrient.unit)
    })
  })

  return {
    ...trackedDayInfo,
    micronutrients: micronutrients
  }
};

const addDayTrackedHelper = (nutritionTrackedDays: NutritionTrackedDay[], formInputMicronutrients: FormInputMicronutrient[], trackedDayInfo: NutritionTrackedDay): NutritionTrackedDay[] => {
  // add formInputMicronutrients to trackedDayInfo
  const trackedDayWithMicronutrients = addMicronutrientsToTrackedDayInfoHelper(formInputMicronutrients, trackedDayInfo);

  // add trackedDayInfo to nutritionTrackedDays

  if (validateAddDayTracked(nutritionTrackedDays, trackedDayWithMicronutrients)) return nutritionTrackedDays;

  return [
    ...nutritionTrackedDays,
    {
      dateTracked: String(trackedDayWithMicronutrients.dateTracked),
      calories: Number(trackedDayWithMicronutrients.calories),
      macronutrients: {
        carbohydrates: Number(trackedDayWithMicronutrients.macronutrients.carbohydrates),
        protein: Number(trackedDayWithMicronutrients.macronutrients.protein),
        fat: Number(trackedDayWithMicronutrients.macronutrients.fat),
      },
      micronutrients: trackedDayWithMicronutrients.micronutrients
    }
  ];
};

const updateDayTrackedHelper = (nutritionTrackedDays: NutritionTrackedDay[], formInputMicronutrients: FormInputMicronutrient[], 
  updatedTrackedDayInfo: NutritionTrackedDay): NutritionTrackedDay[] => {
  // add formInputMicronutrients to trackedDayInfo
  const trackedDayWithMicronutrients = addMicronutrientsToTrackedDayInfoHelper(formInputMicronutrients, updatedTrackedDayInfo);

  // update nutritionTrackedDays where nutritionTrackedDay.dateTracked is equal to updatedTrackedDayInfo.trackedDate

  if (validateUpdateDayTracked(nutritionTrackedDays, trackedDayWithMicronutrients)) return nutritionTrackedDays;

  const updatedNutritionTrackedDays = nutritionTrackedDays.map((nutritionTrackedDay) => {
    if (String(nutritionTrackedDay.dateTracked) === String(trackedDayWithMicronutrients.dateTracked)) {
      return {
        dateTracked: String(trackedDayWithMicronutrients.dateTracked),
        calories: Number(trackedDayWithMicronutrients.calories),
        macronutrients: {
          carbohydrates: Number(trackedDayWithMicronutrients.macronutrients.carbohydrates),
          protein: Number(trackedDayWithMicronutrients.macronutrients.protein),
          fat: Number(trackedDayWithMicronutrients.macronutrients.fat),
        },
        micronutrients: trackedDayWithMicronutrients.micronutrients
      };
    }

    return nutritionTrackedDay;
  })

  return updatedNutritionTrackedDays;
};

const getDayTrackedHelper = (nutritionTrackedDays: NutritionTrackedDay[], trackedDay: Date | string): DayTrackedSearchResult => {
  // return trackedDay info where nutritionTrackedDays's dateTracked is equal to trackedDay.dateTracked

  const trackedDayInfo = nutritionTrackedDays.find((nutritionTrackedDay) => {
    return String(nutritionTrackedDay.dateTracked) === String(trackedDay);
  });
  
  return trackedDayInfo;
};

const addFormInputMicronutrientsHelper = (formInputMicronutrients: FormInputMicronutrient[]): FormInputMicronutrient[] => {
  // add default micronutrient to formInputMicronutrients

  return [ ...formInputMicronutrients, DEFAULT_MICRONUTRIENT ];
};

const updateFormInputMicronutrientsHelper = (formInputMicronutrients: FormInputMicronutrient[], 
  micronutrient: FormInputMicronutrient, micronutrientIndex: number): FormInputMicronutrient[] => {
  // update formInputMicronutrients on micronutrientIndex with micronutrient

  const updatedFormInputMicronutrients = formInputMicronutrients.map((micront, index) => {
    if (index === micronutrientIndex) {
      return {
        name: String(micronutrient.name),
        amount: String(micronutrient.amount),
        unit: String(micronutrient.unit),
      };
    }

    return micront;
  });

  return updatedFormInputMicronutrients;
};

const deleteFormInputMicronutrientsHelper = (formInputMicronutrients: FormInputMicronutrient[], micronutrientIndex: number): FormInputMicronutrient[] => {
  // remove micronutrient from formInputMicronutrients on index with micronutrientIndex

  const deleteMicronutrients = [ ...formInputMicronutrients ];
  deleteMicronutrients.splice(micronutrientIndex, 1);

  return deleteMicronutrients;
};

export const filterDayTrackedHelper = (nutritionTrackedDays: NutritionTrackedDay[], filterConditions: FilterConditions): NutritionTrackedDay[] => {
  let filteredNutritionTrackedDays: NutritionTrackedDay[] = []
  nutritionTrackedDays.map((trackedDay) => {
    if ((filterConditions.filterStartDate && filterConditions.filterStartDate !== "") || (filterConditions.filterStartDate! <= trackedDay.dateTracked)) {
      if ((filterConditions.filterEndDate && filterConditions.filterEndDate === "") || (trackedDay.dateTracked <= filterConditions.filterEndDate!)) {
        filteredNutritionTrackedDays.push(trackedDay)
      }
    }
  })

  return filteredNutritionTrackedDays
}

const removeDayTrackedHelper = (nutritionTrackedDays: NutritionTrackedDay[], trackedDay: string | Date): NutritionTrackedDay[] => {
  if (validateRemoveNutritionTrackedDay(trackedDay)) return nutritionTrackedDays

  return nutritionTrackedDays.filter(nutritionTrackedDay => nutritionTrackedDay.dateTracked !== trackedDay)
}

export const selectScheduledNutritionTrackedDayHelper = (nutritionTrackedDays: NutritionTrackedDay[], trackedDay: string | Date): NutritionTrackedDay | null => {
  const filteredNutritionTrackedDay = nutritionTrackedDays.find((nutritionTrackedDay) => {
    return nutritionTrackedDay.dateTracked === trackedDay
  })

  if (!filteredNutritionTrackedDay) return null

  return filteredNutritionTrackedDay
}

// actions

export const addDayTracked = withMatcher((nutritionTrackedDays: NutritionTrackedDay[], formInputMicronutrients: FormInputMicronutrient[], trackedDayInfo: NutritionTrackedDay): AddDayTracked => {
  const newNutritionTrackedDays = addDayTrackedHelper(nutritionTrackedDays, formInputMicronutrients, trackedDayInfo)
  // setFormInputMicronutrients([]);
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS, newNutritionTrackedDays)
})

export const updateDayTracked = withMatcher((nutritionTrackedDays: NutritionTrackedDay[], formInputMicronutrients: FormInputMicronutrient[], updatedTrackedDayInfo: NutritionTrackedDay): UpdateDayTracked => {
  const newNutritionTrackedDays = updateDayTrackedHelper(nutritionTrackedDays, formInputMicronutrients, updatedTrackedDayInfo)
  // setFormInputMicronutrients([]);
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS, newNutritionTrackedDays)
})

export const getDayTracked = withMatcher((nutritionTrackedDays: NutritionTrackedDay[], trackedDay: string | Date): GetDayTracked => {
  const newDayTrackedSearchResult = getDayTrackedHelper(nutritionTrackedDays, trackedDay)
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_DAY_TRACKED_SEARCH_RESULT, newDayTrackedSearchResult)
})

export const addFormInputMicronutrients = withMatcher((formInputMicronutrients: FormInputMicronutrient[]): AddFormInputMicronutrients => {
  const newFormInputMicronutrients = addFormInputMicronutrientsHelper(formInputMicronutrients)
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_FORM_INPUT_MICRONUTRIENTS, newFormInputMicronutrients)
})

export const updateFormInputMicronutrients = withMatcher((formInputMicronutrients: FormInputMicronutrient[], micronutrient: FormInputMicronutrient, micronutrientIndex: number): UpdateFormInputMicronutrients => {
  const newFormInputMicronutrients = updateFormInputMicronutrientsHelper(formInputMicronutrients, micronutrient, micronutrientIndex)
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_FORM_INPUT_MICRONUTRIENTS, newFormInputMicronutrients)
})

export const deleteFormInputMicronutrients = withMatcher((formInputMicronutrients: FormInputMicronutrient[], micronutrientIndex: number): DeleteFormInputMicronutrients => {
  const newFormInputMicronutrients = deleteFormInputMicronutrientsHelper(formInputMicronutrients, micronutrientIndex)
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_FORM_INPUT_MICRONUTRIENTS, newFormInputMicronutrients)
})

export const filterDayTracked = withMatcher((filterConditions: FilterConditions): any => {
  if (validateFilterNutritionTrackedDays(filterConditions)) {
    return
  } else {
    return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_FILTER_CONDITIONS, filterConditions)
  }
})

export const removeDayTracked = withMatcher((nutritionTrackedDays: NutritionTrackedDay[], trackedDay: string | Date): RemoveDayTracked => {
  const newNutritionTrackedDays = removeDayTrackedHelper(nutritionTrackedDays, trackedDay)
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS, newNutritionTrackedDays)
})

export const clearDayTrackedFilter = withMatcher((): ClearDayTrackedFilter => {
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_FILTER_CONDITIONS, null)
})

export const setFormInputMicronutrients = withMatcher((formInputMicronutrients: FormInputMicronutrient[]): SetFormInputMicronutrients => {
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_FORM_INPUT_MICRONUTRIENTS, formInputMicronutrients)
})

export const setNutritionTrackedDaysView = withMatcher((nutritionTrackedDaysView: NutritionTrackedDaysView): SetNutritionTrackedDaysView => {
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS_VIEW, nutritionTrackedDaysView)
})

export const setNutritionTrackedDaysSummary = withMatcher((nutritionTrackedDaysSummary: NutritionTrackedDaysSummary): SetNutritionTrackedDaysSummary => {
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS_SUMMARY, nutritionTrackedDaysSummary)
})

export const addDayTrackedFromPrediction = withMatcher((nutritionTrackedDays: NutritionTrackedDay[], predictionNutritionInfo: PredictionNutritionInfo): AddDayTrackedFromPrediction => {
  const newNutritionTrackedDays = addDayTrackedFromPredictionHelper(nutritionTrackedDays, predictionNutritionInfo)
  
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS, newNutritionTrackedDays)
})

export const selectScheduledNutritionTrackedDay = withMatcher((dayTracked: string | Date): SelectScheduledNutritionTrackedDay => {
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_SELECTED_NUTRITION_TRACKED_DAY, dayTracked)
})

export const setScheduledNutritionTrackedDaysView = withMatcher((scheduledNutritionTrackedDaysView: ScheduledNutritionTrackedDaysView): SetScheduledNutritionTrackedDaysView => {
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_SCHEDULED_NUTRITION_TRACKED_DAYS_VIEW, scheduledNutritionTrackedDaysView)
})