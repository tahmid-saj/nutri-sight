import { ReactNode } from "react";

// calories burned types

export interface CaloriesBurnedContextType {
  trackedCaloriesBurned: TrackedCaloriesBurned[],
  trackedCaloriesBurnedLength: number,
  selectedTrackedCaloriesBurned: string | Date | undefined,
  filterConditions: FilterConditions | undefined,
  trackedCaloriesBurnedView: TrackedCaloriesBurned[],
  scheduledTrackedCaloriesBurnedView: TrackedCaloriesBurned[] | undefined,

  searchActivity: (trackedDayInfo: SearchActivityInput) => void,
  addTrackedActivityDate: (trackedDayInfo: AddTrackedActivityInput) => void,
  filterActivityDates: (filterConditions: FilterConditions) => void,
  removeActivityDate: (activityId: number) => void,
  clearActivityDatesFilter: () => void,

  selectScheduledTrackedCaloriesBurned: (dayTracked: Date | string) => void,

  searchActivityResults: SearchActivityResult[],
  trackedCaloriesBurnedSummary: TrackedCaloriesBurnedSummary | undefined,

  setDefaultTrackedCaloriesBurnedValues: () => void,
  setDefaultTrackedCaloriesBurnedSummaryValues: () => void,
  updateTrackedCaloriesBurned: () => void
}

export interface CaloriesBurnedProviderProps {
  children: ReactNode
}

export type TrackedCaloriesBurned = {
  dateTracked: string | Date;
  activity: string;
  durationMinutes: number;
  caloriesBurnedPerHour: number;
  totalCaloriesBurned: number;
  activityId: number;
}

export type FilterConditions = {
  dateTracked: string | Date;
  activity: string;
  durationMinutes: string;
}

export type SearchActivityResult = {
  activity: string;
  searchedActivity: string;
  dateTracked: string | Date;
  caloriesBurnedPerHour: number;
  durationMinutes: number;
  totalCaloriesBurned: number;
}

export type TrackedCaloriesBurnedSummary = {
  dailyAverageCaloriesBurned?: number;
  mostCaloriesBurned?: {
    date: string | Date;
    caloriesBurned: number;
    activity: string;
  },
  totalTrackedDays?: Set<string | Date>;
  totalTrackedActivities?: Set<string>;
}

export type SearchActivityInput = {
  activity: string;
  dateTracked: string | Date;
  weightPounds: string;
  durationMinutes: string;
}

export type AddTrackedActivityInput = {
  activity: string;
  searchActivity: string;
  dateTracked: string | Date;
  caloriesBurnedPerHour: string;
  durationMinutes: string;
  totalCaloriesBurned: string;
}