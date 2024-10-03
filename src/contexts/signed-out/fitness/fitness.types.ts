import { ReactNode } from "react";

// fitness types

export interface FitnessContextType {
  exercises: Exercise[];
  exercisesTagLimit: number;
  selectedScheduledExerciseDate: string | Date | undefined;
  exercisesSearchResults: Exercise[];
  selectedSearchedExercise: ExerciseSearchResult | undefined;
  exercisesView: Exercise[];
  upcomingExercisesView: Exercise[];
  
  searchExercise: (exerciseQuery: ExerciseQueryInput) => void;
  addExercise: (exercise: AddExerciseInput) => void;

  selectScheduledExercise: (exerciseDate: string | Date) => void;
  unselectScheduledExercise: () => void;
  selectSearchedExercises: (exercise: ExerciseSearchResult) => void;

  removeExercise: (exerciseTag: number) => void;
}

export interface FitnessProviderProps {
  children: ReactNode;
}

export type Exercise = {
  exerciseDate: string | Date;
  exerciseName: string;
  exerciseSets: number;
  exerciseReps: number;
  exerciseType: string;
  exerciseMuscle: string;
  exerciseEquipment: string;
  exerciseDifficulty: string;
  exerciseInstructions: string;
  exerciseTag: number;
}

export type ExerciseQueryInput = {
  exerciseName: string;
  exerciseType: string;
  exerciseMuscle: string;
  exerciseDifficulty: string;
}

export type AddExerciseInput = {
  exerciseDate: string | Date;
  exerciseSets: string;
  exerciseReps: string;
}

export type ExerciseSearchResult = {
  exerciseName: string;
  exerciseType: string;
  exerciseMuscle: string;
  exerciseEquipment: string;
  exerciseDifficulty: string;
  exerciseInstructions: string;
}