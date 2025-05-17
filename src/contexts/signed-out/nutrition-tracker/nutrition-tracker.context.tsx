import { createContext, useState, useEffect, FC } from "react";

import { validatePredictionInfo, validateAddDayTracked, validateUpdateDayTracked, 
  validateFilterNutritionTrackedDays, validateRemoveNutritionTrackedDay } from "../../../utils/validations/nutrition-tracker.validations";
import { calculateSummary } from "../../../utils/calculations/nutrition-tracker.calculations";

import { DEFAULT_MICRONUTRIENT } from "../../../utils/constants/nutrition-tracker.constants";

import { DayTrackedSearchResult, FilterConditions, FormInputMicronutrient, Micronutrient, NutritionTrackedDay, NutritionTrackedDaysSummary, NutritionTrackerContextType, NutritionTrackerProviderProps, PredictionNutritionInfo } from "./nutrition-tracker.types"

// TODO: sort the records by date
// helper functions

const addDayTrackedFromPredictionHelper = (nutritionTrackedDays: NutritionTrackedDay[], 
  predictionNutritionInfo: PredictionNutritionInfo): NutritionTrackedDay[] => {
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

const addMicronutrientsToTrackedDayInfoHelper = (formInputMicronutrients: FormInputMicronutrient[], 
  trackedDayInfo: NutritionTrackedDay): NutritionTrackedDay => {
  
  if (!formInputMicronutrients) return {
    ...trackedDayInfo
  }

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

const addDayTrackedHelper = (nutritionTrackedDays: NutritionTrackedDay[], 
  formInputMicronutrients: FormInputMicronutrient[], trackedDayInfo: NutritionTrackedDay): NutritionTrackedDay[] => {
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

const updateDayTrackedHelper = (nutritionTrackedDays: NutritionTrackedDay[], 
  formInputMicronutrients: FormInputMicronutrient[], 
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

const getDayTrackedHelper = (nutritionTrackedDays: NutritionTrackedDay[], trackedDay: string | Date): DayTrackedSearchResult => {
  // return trackedDay info where nutritionTrackedDays's dateTracked is equal to trackedDay.dateTracked

  const trackedDayInfo = nutritionTrackedDays.find((nutritionTrackedDay) => {
    return String(nutritionTrackedDay.dateTracked) === String(trackedDay);
  });
  
  return trackedDayInfo;
};

const addFormInputMicronutrientsHelper = (formInputMicronutrients: FormInputMicronutrient[]): FormInputMicronutrient[] => {
  // add default micronutrient to formInputMicronutrients

  if (!formInputMicronutrients) return [ DEFAULT_MICRONUTRIENT ]

  return [ ...formInputMicronutrients, DEFAULT_MICRONUTRIENT ];
};

const updateFormInputMicronutrientsHelper = (formInputMicronutrients: FormInputMicronutrient[], 
  micronutrient: FormInputMicronutrient, micronutrientIndex: number): FormInputMicronutrient[] => {
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

  return updatedFormInputMicronutrients;
};

const deleteFormInputMicronutrientsHelper = (formInputMicronutrients: FormInputMicronutrient[], 
  micronutrientIndex: number): FormInputMicronutrient[] => {
  // remove micronutrient from formInputMicronutrients on index with micronutrientIndex

  if (!formInputMicronutrients) {
    return []
  }

  const deleteMicronutrients = [ ...formInputMicronutrients ];
  deleteMicronutrients.splice(micronutrientIndex, 1);

  return deleteMicronutrients;
};

const filterDayTrackedHelper = (nutritionTrackedDays: NutritionTrackedDay[], 
  filterConditions: FilterConditions): NutritionTrackedDay[] => {
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

const removeDayTrackedHelper = (nutritionTrackedDays: NutritionTrackedDay[], 
  trackedDay: string | Date): NutritionTrackedDay[] => {
  if (validateRemoveNutritionTrackedDay(trackedDay)) return nutritionTrackedDays

  return nutritionTrackedDays.filter(nutritionTrackedDay => nutritionTrackedDay.dateTracked !== trackedDay)
}

const selectScheduledNutritionTrackedDayHelper = (nutritionTrackedDays: NutritionTrackedDay[], 
  trackedDay: string | Date): NutritionTrackedDay | undefined => {
  const filteredNutritionTrackedDay = nutritionTrackedDays.find((nutritionTrackedDay) => {
    return nutritionTrackedDay.dateTracked === trackedDay
  })

  if (!filteredNutritionTrackedDay) return undefined

  return filteredNutritionTrackedDay
}

export const NutritionTrackerContext = createContext<NutritionTrackerContextType>({
  nutritionTrackedDays: [],
  // nutritionTrackedDays structure:
  // [
  //   {
  //     dateTracked: new Date(),
  //     calories: 2222,
  //     macronutrients: {
  //       carbohydrates: 999,
  //       protein: 777,
  //       fat: 555,
  //     },
  //     micronutrients: [
  //       {
  //         name: "Vitamin C",
  //         amount: 60,
  //         unit: "mg",
  //       }
  //     ]
  //   }
  // ]

  formInputMicronutrients: [],
  // formInputMicronutrients structure:
  // [
  //   {
  //     name: "Vitamin C",
  //     amount: 60,
  //     unit: "mg"
  //   }
  // ]

  // selectedNutritionTrackedDay is the selected date from the calendar component
  selectedNutritionTrackedDay: undefined,

  filterConditions: undefined,
  // filterConditions structure:
  // {
  //   filterStartDate: "",
  //   filterEndDate: ""
  // }

  nutritionTrackedDaysView: [],

  // scheduledNutritionTrackedDaysView is the selected selectedNutritionTrackedDay info from the calendar component
  scheduledNutritionTrackedDaysView: undefined,

  addDayTracked: () => {},
  updateDayTracked: () => {},
  getDayTracked: () => {},

  selectScheduledNutritionTrackedDay: () => {},

  // tracked day in searchDays component
  dayTrackedSearchResult: undefined,

  addFormInputMicronutrients: () => {},
  updateFormInputMicronutrients: () => {},
  deleteFormInputMicronutrients: () => {},

  addDayTrackedFromPrediction: () => {},

  nutritionTrackedDaysSummary: {},
  // nutritionTrackedDaysSummary structure:
  // {
  //   averageDailyCaloriesConsumption: 2222,
  //   averageDailyCarbohydratesConsumption: 1111,
  //   averageDailyProteinConsumption: 777,
  //   averageDailyFatConsumption: 555,,
  // }

  filterDayTracked: () => {},
  removeDayTracked: () => {},
  clearDayTrackedFilter: () => {},
});

export const NutritionTrackerProvider: FC<NutritionTrackerProviderProps> = ({ children }) => {
  const [nutritionTrackedDays, setNutritionTrackedDays] = useState<NutritionTrackedDay[]>([]);
  const [formInputMicronutrients, setFormInputMicronutrients] = useState<FormInputMicronutrient[]>([]);
  const [filterConditions, setFilterConditions] = useState<FilterConditions | undefined>(undefined)
  const [selectedNutritionTrackedDay, setSelectedNutritionTrackedDay] = useState<string | Date | undefined>(undefined)
  const [scheduledNutritionTrackedDaysView, setScheduledNutritionTrackedDaysView] = useState<NutritionTrackedDay | undefined>(undefined)
  const [nutritionTrackedDaysView, setNutritionTrackedDaysView] = useState<NutritionTrackedDay[]>(nutritionTrackedDays)
  const [dayTrackedSearchResult, setDayTrackedSearchResult] = useState<NutritionTrackedDay | undefined>(undefined)
  const [nutritionTrackedDaysSummary, setNutritionTrackedDaysSummary] = useState<NutritionTrackedDaysSummary | undefined>(undefined);

  useEffect(() => {
    // update nutritionTrackedDaysSummary with average consumptions
    

    const summary = calculateSummary(nutritionTrackedDays);

    setNutritionTrackedDaysSummary({
      averageDailyCaloriesConsumption: summary.averageDailyCalories,
      averageDailyCarbohydratesConsumption: summary.averageDailyCarbohydrates,
      averageDailyProteinConsumption: summary.averageDailyProtein,
      averageDailyFatConsumption: summary.averageDailyFat,
    });
  }, [nutritionTrackedDays]);

  // update nutritionTrackedDaysView when nutritionTrackedDays or filterConditions change
  useEffect(() => {
    if (filterConditions) {
      setNutritionTrackedDaysView(filterDayTrackedHelper(nutritionTrackedDays, filterConditions))
    } else {
      setNutritionTrackedDaysView(nutritionTrackedDays)
    }
  }, [nutritionTrackedDays, filterConditions])

  // update scheduledNutritionTrackedDaysView when nutritionTrackedDays or selectedNutritionTrackedDay change
  useEffect(() => {
    if (selectedNutritionTrackedDay) {
      setScheduledNutritionTrackedDaysView(selectScheduledNutritionTrackedDayHelper(nutritionTrackedDays, selectedNutritionTrackedDay))
    } else {
      setScheduledNutritionTrackedDaysView(undefined)
    }
  }, [nutritionTrackedDays, selectedNutritionTrackedDay])

  const addDayTracked = (trackedDayInfo: NutritionTrackedDay): void => {
    setNutritionTrackedDays(addDayTrackedHelper(nutritionTrackedDays, formInputMicronutrients, trackedDayInfo));
    setFormInputMicronutrients([]);
  };

  const updateDayTracked = (updatedTrackedDayInfo: NutritionTrackedDay): void => {
    setNutritionTrackedDays(updateDayTrackedHelper(nutritionTrackedDays, formInputMicronutrients, updatedTrackedDayInfo));
    setFormInputMicronutrients([]);
  };

  const getDayTracked = (trackedDay: string | Date): void => {
    setDayTrackedSearchResult(getDayTrackedHelper(nutritionTrackedDays, trackedDay))
  };

  const addFormInputMicronutrients = (): void => {
    setFormInputMicronutrients(addFormInputMicronutrientsHelper(formInputMicronutrients));
  };

  const updateFormInputMicronutrients = (micronutrient: FormInputMicronutrient, micronutrientIndex: number): void => {
    setFormInputMicronutrients(updateFormInputMicronutrientsHelper(formInputMicronutrients, micronutrient, micronutrientIndex));
  };

  const deleteFormInputMicronutrients = (micronutrientIndex: number): void => {
    setFormInputMicronutrients(deleteFormInputMicronutrientsHelper(formInputMicronutrients, micronutrientIndex));
  };

  const filterDayTracked = (filterConditions: FilterConditions): void => {
    if (validateFilterNutritionTrackedDays(filterConditions)) {
      return
    } else {
      setFilterConditions(filterConditions)
      setNutritionTrackedDaysView(filterDayTrackedHelper(nutritionTrackedDays, filterConditions))
    }
  }

  const removeDayTracked = (trackedDay: string | Date): void => {
    setNutritionTrackedDays(removeDayTrackedHelper(nutritionTrackedDays, trackedDay))
  }

  const clearDayTrackedFilter = (): void => {
    setFilterConditions(undefined)
    setNutritionTrackedDaysView(nutritionTrackedDays)
  }

  const addDayTrackedFromPrediction = (predictionNutritionInfo: PredictionNutritionInfo): void => {
    setNutritionTrackedDays(addDayTrackedFromPredictionHelper(nutritionTrackedDays, predictionNutritionInfo))
    setFormInputMicronutrients([]);
  }

  const selectScheduledNutritionTrackedDay = (dayTracked: string | Date): void => {
    setSelectedNutritionTrackedDay(dayTracked)
    setScheduledNutritionTrackedDaysView(selectScheduledNutritionTrackedDayHelper(nutritionTrackedDays, dayTracked))
  }

  const value = { nutritionTrackedDays, formInputMicronutrients, scheduledNutritionTrackedDaysView,
                  addDayTracked, updateDayTracked, getDayTracked, 
                  addFormInputMicronutrients, updateFormInputMicronutrients, deleteFormInputMicronutrients, 
                  nutritionTrackedDaysSummary, selectedNutritionTrackedDay, filterConditions,
                  nutritionTrackedDaysView, dayTrackedSearchResult,
                  filterDayTracked, removeDayTracked, clearDayTrackedFilter,
                  addDayTrackedFromPrediction, selectScheduledNutritionTrackedDay }

  return (
    <NutritionTrackerContext.Provider
      value={ value }>
      { children }
    </NutritionTrackerContext.Provider>
  );
};
