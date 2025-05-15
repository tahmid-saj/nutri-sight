import { ReactNode } from "react";

// nutrition tracker types

export interface NutritionTrackerContextType {
  nutritionTrackedDays: NutritionTrackedDay[];
  formInputMicronutrients: FormInputMicronutrient[];
  selectedNutritionTrackedDay: SelectedNutritionTrackedDay;
  filterConditions: FilterConditions | undefined;
  nutritionTrackedDaysView: NutritionTrackedDaysView;
  scheduledNutritionTrackedDaysView: ScheduledNutritionTrackedDaysView;

  addDayTracked: (trackedDayInfo: NutritionTrackedDay) => void;
  updateDayTracked: (updatedTrackedDayInfo: NutritionTrackedDay) => void;
  getDayTracked: (trackedDay: string | Date) => void;

  selectScheduledNutritionTrackedDay: (trackedDay: string | Date) => void;

  dayTrackedSearchResult: NutritionTrackedDay | undefined;

  addFormInputMicronutrients: () => void;
  updateFormInputMicronutrients: (micronutrient: Micronutrient, micronutrientIndex: number) => void;
  deleteFormInputMicronutrients: (micronutrientIndex: number) => void;

  addDayTrackedFromPrediction: (predictionNutritionInfo: PredictionNutritionInfo) => void;

  nutritionTrackedDaysSummary: NutritionTrackedDaysSummary | undefined;

  filterDayTracked: (filterConditions: FilterConditions) => void;
  removeDayTracked: (trackedDay: string | Date) => void;
  clearDayTrackedFilter: () => void;
}

export interface NutritionTrackerProviderProps {
  children: ReactNode
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
  amount: string;
  unit: string;
}

export type SelectedNutritionTrackedDay = string | Date | undefined;

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