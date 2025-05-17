// nutrition-tracker errors

export const errorOnTrackedDayExists = () => {
  alert("Tracked day already exists");
};

export const errorOnInvalidMacronutrientInputs = () => {
  // alert("Invalid macronutrient inputs");
};

export const errorOnInvalidMicronutrientInput = () => {
  alert("Invalid micronutrient inputs");
};

export const errorOnEmptyMicronutrients = () => {
  alert("Micronutrients are empty");
};

export const errorOnDayNotTracked = () => {
  // alert("Day is not being tracked");
};

export const errorOnStartDateBeforeEndDate = () => {
  alert("Invalid date on filter")
}

// api requests

export const errorOnGetNutritionTrackedDaysData = () => {
  alert("Error getting tracked days data");
};

export const errorOnGetNutritionTrackedDaysSummaryData = () => {
  alert("Error getting tracked days summary data");
};

export const errorOnPostNutritionTrackedDay = () => {
  alert("Error posting nutrition tracked day");
};

export const errorOnDeleteNutritionTrackedDay = () => {
  alert("Error removing nutrition tracked day")
}

export const errorOnPutNutritionTrackedDay = () => {
  alert("Error putting nutrition tracked day");
};

export const errorOnPutNutritionTrackedDays = () => {
  alert("Error putting nutrition tracked days");
};

export const errorOnPutNutritionTrackedDaysSummary = () => {
  alert("Error putting nutrition tracked days summary");
};

