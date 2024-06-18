import { validatePredictionInfo, validateAddDayTracked, validateUpdateDayTracked, 
  validateFilterNutritionTrackedDays, validateRemoveNutritionTrackedDay 
} from "../../../utils/validations/nutrition-tracker.validations";
import { calculateSummary } from "../../../utils/calculations/nutrition-tracker.calculations";

import { DEFAULT_MICRONUTRIENT } from "../../../utils/constants/nutrition-tracker.constants";
import { createAction } from "../../../utils/reducer/reducer.utils";
import { NUTRITION_TRACKER_ACTION_TYPES } from "./nutrition-tracker.types";

// TODO: sort the records by date
// helper functions

const addDayTrackedFromPredictionHelper = (nutritionTrackedDays, predictionNutritionInfo) => {
  if (validatePredictionInfo(nutritionTrackedDays, predictionNutritionInfo)) return nutritionTrackedDays

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
      micronutrients: predictionNutritionInfo.micronutrients
    }
  ]
}

const addMicronutrientsToTrackedDayInfoHelper = (formInputMicronutrients, trackedDayInfo) => {
  return {
    ...trackedDayInfo,
    micronutrients: formInputMicronutrients
  }
};

const addDayTrackedHelper = (nutritionTrackedDays, formInputMicronutrients, trackedDayInfo) => {
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

const updateDayTrackedHelper = (nutritionTrackedDays, formInputMicronutrients, updatedTrackedDayInfo) => {
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

const getDayTrackedHelper = (nutritionTrackedDays, trackedDay) => {
  // return trackedDay info where nutritionTrackedDays's dateTracked is equal to trackedDay.dateTracked

  const trackedDayInfo = nutritionTrackedDays.find((nutritionTrackedDay) => {
    return String(nutritionTrackedDay.dateTracked) === String(trackedDay);
  });
  
  return trackedDayInfo;
};

const addFormInputMicronutrientsHelper = (formInputMicronutrients) => {
  // add default micronutrient to formInputMicronutrients

  return [ ...formInputMicronutrients, DEFAULT_MICRONUTRIENT ];
};

const updateFormInputMicronutrientsHelper = (formInputMicronutrients, micronutrient, micronutrientIndex) => {
  // update formInputMicronutrients on micronutrientIndex with micronutrient

  const updatedFormInputMicronutrients = formInputMicronutrients.map((micront, index) => {
    if (index === micronutrientIndex) {
      return {
        name: String(micronutrient.name),
        amount: Number(micronutrient.amount),
        unit: String(micronutrient.unit),
      };
    }

    return micront;
  });

  return updatedFormInputMicronutrients;;
};

const deleteFormInputMicronutrientsHelper = (formInputMicronutrients, micronutrientIndex) => {
  // remove micronutrient from formInputMicronutrients on index with micronutrientIndex

  const deleteMicronutrients = [ ...formInputMicronutrients ];
  deleteMicronutrients.splice(micronutrientIndex, 1);

  return deleteMicronutrients;
};

export const filterDayTrackedHelper = (nutritionTrackedDays, filterConditions) => {
  let filteredNutritionTrackedDays = []
  nutritionTrackedDays.map((trackedDay) => {
    if (filterConditions.filterStartDate === "" || (filterConditions.filterStartDate <= trackedDay.dateTracked)) {
      if (filterConditions.filterEndDate === "" || (trackedDay.dateTracked <= filterConditions.filterEndDate)) {
        filteredNutritionTrackedDays.push(trackedDay)
      }
    }
  })

  return filteredNutritionTrackedDays
}

const removeDayTrackedHelper = (nutritionTrackedDays, trackedDay) => {
  if (validateRemoveNutritionTrackedDay(trackedDay)) return nutritionTrackedDays

  return nutritionTrackedDays.filter(nutritionTrackedDay => nutritionTrackedDay.dateTracked !== trackedDay)
}

export const selectScheduledNutritionTrackedDayHelper = (nutritionTrackedDays, trackedDay) => {
  const filteredNutritionTrackedDay = nutritionTrackedDays.find((nutritionTrackedDay) => {
    return nutritionTrackedDay.dateTracked === trackedDay
  })

  if (!filteredNutritionTrackedDay) return null

  return filteredNutritionTrackedDay
}

// actions

export const addDayTracked = (nutritionTrackedDays, formInputMicronutrients, trackedDayInfo) => {
  const newNutritionTrackedDays = addDayTrackedHelper(nutritionTrackedDays, formInputMicronutrients, trackedDayInfo)
  // setFormInputMicronutrients([]);
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS, newNutritionTrackedDays)
};

export const updateDayTracked = (nutritionTrackedDays, formInputMicronutrients, updatedTrackedDayInfo) => {
  const newNutritionTrackedDays = updateDayTrackedHelper(nutritionTrackedDays, formInputMicronutrients, updatedTrackedDayInfo)
  // setFormInputMicronutrients([]);
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS, newNutritionTrackedDays)
};

export const getDayTracked = (nutritionTrackedDays, trackedDay) => {
  const newDayTrackedSearchResult = getDayTrackedHelper(nutritionTrackedDays, trackedDay)
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_DAY_TRACKED_SEARCH_RESULT, newDayTrackedSearchResult)
};

export const addFormInputMicronutrients = (formInputMicronutrients) => {
  const newFormInputMicronutrients = addFormInputMicronutrientsHelper(formInputMicronutrients)
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_FORM_INPUT_MICRONUTRIENTS, newFormInputMicronutrients)
};

export const updateFormInputMicronutrients = (formInputMicronutrients, micronutrient, micronutrientIndex) => {
  const newFormInputMicronutrients = updateFormInputMicronutrientsHelper(formInputMicronutrients, micronutrient, micronutrientIndex)
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_FORM_INPUT_MICRONUTRIENTS, newFormInputMicronutrients)
};

export const deleteFormInputMicronutrients = (formInputMicronutrients, micronutrientIndex) => {
  const newFormInputMicronutrients = deleteFormInputMicronutrientsHelper(formInputMicronutrients, micronutrientIndex)
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_FORM_INPUT_MICRONUTRIENTS, newFormInputMicronutrients)
};

export const filterDayTracked = (filterConditions) => {
  if (validateFilterNutritionTrackedDays(filterConditions)) {
    return
  } else {
    return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_FILTER_CONDITIONS, filterConditions)
  }
}

export const removeDayTracked = (nutritionTrackedDays, trackedDay) => {
  const newNutritionTrackedDays = removeDayTrackedHelper(nutritionTrackedDays, trackedDay)
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS, newNutritionTrackedDays)
}

export const clearDayTrackedFilter = () => {
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_FILTER_CONDITIONS, null)
}

export const setFormInputMicronutrients = (formInputMicronutrients) => {
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_FORM_INPUT_MICRONUTRIENTS, formInputMicronutrients)
}

export const setNutritionTrackedDaysView = (nutritionTrackedDaysView) => {
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS_VIEW, nutritionTrackedDaysView)
}

export const setNutritionTrackedDaysSummary = (nutritionTrackedDaysSummary) => {
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS_SUMMARY, nutritionTrackedDaysSummary)
}

export const addDayTrackedFromPrediction = (nutritionTrackedDays, predictionNutritionInfo) => {
  const newNutritionTrackedDays = addDayTrackedFromPredictionHelper(nutritionTrackedDays, predictionNutritionInfo)
  
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_NUTRITION_TRACKED_DAYS, newNutritionTrackedDays)
}

export const selectScheduledNutritionTrackedDay = (dayTracked) => {
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_SELECTED_NUTRITION_TRACKED_DAY, dayTracked)
}

export const setScheduledNutritionTrackedDaysView = (scheduledNutritionTrackedDaysView) => {
  return createAction(NUTRITION_TRACKER_ACTION_TYPES.SET_SCHEDULED_NUTRITION_TRACKED_DAYS_VIEW, scheduledNutritionTrackedDaysView)
}