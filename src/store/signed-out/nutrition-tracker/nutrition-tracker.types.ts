export enum NUTRITION_TRACKER_ACTION_TYPES {
  SET_NUTRITION_TRACKED_DAYS = "nutrition-tracker/SET_NUTRITION_TRACKED_DAYS",
  SET_FORM_INPUT_MICRONUTRIENTS = "nutrition-tracker/SET_FORM_INPUT_MICRONUTRIENTS",
  SET_FILTER_CONDITIONS = "nutrition-tracker/SET_FILTER_CONDITIONS",

  SET_SELECTED_NUTRITION_TRACKED_DAY = "nutrition-tracker/SET_SELECTED_NUTRITION_TRACKED_DAY",
  SET_SCHEDULED_NUTRITION_TRACKED_DAYS_VIEW = "nutrition-tracker/SET_SCHEDULED_NUTRITION_TRACKED_DAYS_VIEW",

  SET_NUTRITION_TRACKED_DAYS_VIEW = "nutrition-tracker/SET_NUTRITION_TRACKED_DAYS_VIEW",
  SET_DAY_TRACKED_SEARCH_RESULT = "nutrition-tracker/SET_DAY_TRACKED_SEARCH_RESULT",
  SET_NUTRITION_TRACKED_DAYS_SUMMARY = "nutrition-tracker/SET_NUTRITION_TRACKED_DAYS_SUMMARY"
}

export type NutritionTrackedDay = {
  dateTracked: string;
  calories: number;
  macronutrients: Macronutrient;
  micronutrients: Micronutrient[];
}

export type Macronutrient = {
  carbohydrates: number;
  protein: number;
  fat: number;
}

export type Micronutrient = {
  name: string;
  amount: number;
  unit: string;
}

export type FormInputMicronutrient = {
  name: string;
  amount: number;
  unit: string;
}

export type SelectedNutritionTrackedDay = string | Date | null;

export type FilterConditions = {
  filterStartDate?: string;
  filterEndDate?: string;
}

export type NutritionTrackedDaysView = NutritionTrackedDay[];

export type ScheduledNutritionTrackedDaysView = NutritionTrackedDay | undefined

export type DayTrackedSearchResult = NutritionTrackedDay | undefined;

export type NutritionTrackedDaysSummary = {
  averageDailyCaloriesConsumption?: number;
  averageDailyCarbohydratesConsumption?: number;
  averageDailyProteinConsumption?: number;
  averageDailyFatConsumption?: number;
}

export type PredictionNutritionInfo = {
  dateTracked: string | Date;
  calories: number;
  macronutrients: Macronutrient;
  micronutrients: Micronutrient[];
}