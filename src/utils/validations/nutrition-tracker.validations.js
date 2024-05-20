import { errorOnTrackedDayExists, errorOnInvalidMacronutrientInputs, 
        errorOnInvalidMicronutrientInput, errorOnEmptyMicronutrients,
        errorOnDayNotTracked, errorOnStartDateBeforeEndDate } from "../errors/nutrition-tracker.errors";

// nutrition tracker validation functions

export const validateAddDayTracked = (nutritionTrackedDays, trackedDayInfo) => {
  // check that trackedDayInfo's day doesn't exist in nutritionTrackedDays
  const trackedDayExists = nutritionTrackedDays.find((nutritionTrackedDay) => {
    return nutritionTrackedDay.dateTracked === trackedDayInfo.dateTracked;
  });

  if (trackedDayExists) {
    errorOnTrackedDayExists();

    return true;
  }

  // check if macronutrients data types are valid
  if (!(/^[0-9]*$/.test(String(trackedDayInfo.calories))) || 
      Number(trackedDayInfo.calories) < 0 || 
      !(/^[0-9]*$/.test(String(trackedDayInfo.macronutrients.carbohydrates))) || 
      Number(trackedDayInfo.macronutrients.carbohydrates) < 0 ||
      !(/^[0-9]*$/.test(String(trackedDayInfo.macronutrients.protein))) || 
      Number(trackedDayInfo.macronutrients.protein) < 0 ||
      !(/^[0-9]*$/.test(String(trackedDayInfo.macronutrients.fat))) || 
      Number(trackedDayInfo.macronutrients.fat) < 0) {

    errorOnInvalidMacronutrientInputs();

    return true;
  }

  // check if micronutrients are valid
  // check if micronutrients data types are valid
  const invalidMicronutrients = trackedDayInfo.micronutrients.find(micronutrient => {
    if (String(micronutrient.name).length > 50 || String(micronutrient.unit).length > 5 ) {

      errorOnInvalidMicronutrientInput();

      return true;
    }

    if (!(/^[0-9]*$/.test(String(micronutrient.amount))) || 
       Number(micronutrient.amount) <= 0) {

        errorOnInvalidMicronutrientInput();

      return true;
    }

    return false;
  });

  if (invalidMicronutrients) return true;

  // check if micronutrients are not empty
  const emptyMicronutrients = trackedDayInfo.micronutrients.find(micronutrient => {
    if (String(micronutrient.name) === "" || String(micronutrient.amount) === "" ||
        String(micronutrient.unit) === "") {

          errorOnEmptyMicronutrients();

      return true;
    }

    return false;
  });

  if (emptyMicronutrients) return true;

  return false;
};

export const validateUpdateDayTracked = (nutritionTrackedDays, updatedTrackedDayInfo) => {
  // check that updatedTrackedDayInfo exists in nutritionTrackedDays
  const updatedTrackedDayExists = nutritionTrackedDays.find(nutritionTrackedDay => {
    return nutritionTrackedDay.dateTracked === updatedTrackedDayInfo.dateTracked;
  });

  if (!updatedTrackedDayExists) {

    errorOnDayNotTracked();

    return true;
  }

  // check if macronutrients data types are valid
  if (!(/^[0-9]*$/.test(String(updatedTrackedDayInfo.calories))) || 
    Number(updatedTrackedDayInfo.calories) < 0 || 
    !(/^[0-9]*$/.test(String(updatedTrackedDayInfo.macronutrients.carbohydrates))) || 
    Number(updatedTrackedDayInfo.macronutrients.carbohydrates) < 0 ||
    !(/^[0-9]*$/.test(String(updatedTrackedDayInfo.macronutrients.protein))) || 
    Number(updatedTrackedDayInfo.macronutrients.protein) < 0 ||
    !(/^[0-9]*$/.test(String(updatedTrackedDayInfo.macronutrients.fat))) || 
    Number(updatedTrackedDayInfo.macronutrients.fat) < 0) {

    errorOnInvalidMacronutrientInputs();

    return true;
  }

  // check if micronutrients are valid
  // check if micronutrients data types are valid
  const invalidMicronutrients = updatedTrackedDayInfo.micronutrients.find(micronutrient => {
    if (String(micronutrient.name).length > 50 || String(micronutrient.unit).length > 5 ) {

      errorOnInvalidMicronutrientInput();

      return true;
    }

    if (!(/^[0-9]*$/.test(String(micronutrient.amount))) || 
       Number(micronutrient.amount) <= 0) {

      errorOnInvalidMicronutrientInput();

      return true;
    }

    return false;
  });

  if (invalidMicronutrients) return true;

  // check if micronutrients are not empty
  const emptyMicronutrients = updatedTrackedDayInfo.micronutrients.find(micronutrient => {
    if (String(micronutrient.name) === "" || String(micronutrient.amount) === "" ||
        String(micronutrient.unit) === "") {

      errorOnEmptyMicronutrients();

      return true;
    }

    return false;
  });

  if (emptyMicronutrients) return true;

  return false;
};

export const validateFilterNutritionTrackedDays = (filterConditions) => {
  // validating if startDate > endDate
  if (filterConditions.filterStartDate && filterConditions.filterEndDate && filterConditions.filterStartDate > filterConditions.filterEndDate) {
    errorOnStartDateBeforeEndDate()
    return true
  }

  return false
}

export const validateRemoveNutritionTrackedDay = (trackedDay) => {
  return false
}