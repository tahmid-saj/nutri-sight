// nutrition tracker calculations

export const calculateSummary = (nutritionTrackedDays) => {
  const trackedDays = nutritionTrackedDays.length;

  const averageDailyCalories = (nutritionTrackedDays.reduce((totalCalories, { calories }) => {
    return totalCalories + Number(calories);
  }, 0)) / trackedDays;

  const averageDailyCarbohydrates = (nutritionTrackedDays.reduce((totalCarbohydrates, { macronutrients }) => {
    return totalCarbohydrates + Number(macronutrients.carbohydrates);
  }, 0)) / trackedDays;

  const averageDailyProtein = (nutritionTrackedDays.reduce((totalProtein, { macronutrients }) => {
    return totalProtein + Number(macronutrients.protein);
  }, 0)) / trackedDays;

  const averageDailyFat = (nutritionTrackedDays.reduce((totalFat, { macronutrients }) => {
    return totalFat + Number(macronutrients.fat);
  }, 0)) / trackedDays;

  return {
    averageDailyCalories: averageDailyCalories,
    averageDailyCarbohydrates: averageDailyCarbohydrates,
    averageDailyProtein: averageDailyProtein,
    averageDailyFat: averageDailyFat,
  }
};