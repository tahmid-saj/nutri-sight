import { createContext, useState, useEffect, useContext } from "react";

import { validatePredictionInfo, validateAddDayTracked, validateUpdateDayTracked, 
  validateFilterNutritionTrackedDays, validateRemoveNutritionTrackedDay } from "../../../utils/validations/nutrition-tracker.validations";
import { calculateSummary } from "../../../utils/calculations/nutrition-tracker.calculations";

import { DEFAULT_MICRONUTRIENT, DEFAULT_NUTRITION_TRACKED_DAYS, DEFAULT_NUTRITION_TRACKED_DAYS_SUMMARY } from "../../../utils/constants/nutrition-tracker.constants";

// import { UserContext } from "../../shared/user/user.context";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/shared/user/user.selector";

import { getNutritionTrackedDaysData, getNutritionTrackedDaysSummaryData,
  postNutritionTrackedDay, deleteNutritionTrackedDay, putNutritionTrackedDay,
  putNutritionTrackedDays, putNutritionTrackedDaysSummary } from "../../../utils/api-requests/nutrition-tracker.requests";

import { NutritionTrackedDay, PredictionNutritionInfo, NutritionTrackedDay, Micronutrient } from "./nutrition-tracker.types";
import { FormInputMicronutrient } from "./nutrition-tracker.types";
import { FilterConditions } from "./nutrition-tracker.types";
import { NutritionTrackedDaysSummary } from "./nutrition-tracker.types";
import { FC } from "react";

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
    micronutrients: formInputMicronutrients
  }
};

const addDayTrackedHelper = async (nutritionTrackedDays: NutritionTrackedDay[], 
  formInputMicronutrients: FormInputMicronutrient[], trackedDayInfo: NutritionTrackedDay, userId: string, email: string): Promise<NutritionTrackedDay[]> => {
  // add formInputMicronutrients to trackedDayInfo
  const trackedDayWithMicronutrients = addMicronutrientsToTrackedDayInfoHelper(formInputMicronutrients, trackedDayInfo);

  // add trackedDayInfo to nutritionTrackedDays

  if (validateAddDayTracked(nutritionTrackedDays, trackedDayWithMicronutrients)) return nutritionTrackedDays;

  
  postNutritionTrackedDay(userId, email, trackedDayWithMicronutrients);

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

const updateDayTrackedHelper = async (nutritionTrackedDays: NutritionTrackedDay[], 
  formInputMicronutrients: FormInputMicronutrient[], 
  updatedTrackedDayInfo: NutritionTrackedDay, userId: string, email: string): Promise<NutritionTrackedDay[]> => {
  // add formInputMicronutrients to trackedDayInfo
  const trackedDayWithMicronutrients = addMicronutrientsToTrackedDayInfoHelper(formInputMicronutrients, updatedTrackedDayInfo);

  // update nutritionTrackedDays where nutritionTrackedDay.dateTracked is equal to updatedTrackedDayInfo.trackedDate

  if (validateUpdateDayTracked(nutritionTrackedDays, trackedDayWithMicronutrients)) return nutritionTrackedDays;

  let originalNutritionTrackedDay;
  
  const updatedNutritionTrackedDays = nutritionTrackedDays.map((nutritionTrackedDay) => {
    if (String(nutritionTrackedDay.dateTracked) === String(trackedDayWithMicronutrients.dateTracked)) {
      originalNutritionTrackedDay = nutritionTrackedDay;

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

  await putNutritionTrackedDay(userId, email, originalNutritionTrackedDay, trackedDayWithMicronutrients);

  return updatedNutritionTrackedDays;
};

const getDayTrackedHelper = (nutritionTrackedDays: NutritionTrackedDay[], trackedDay: string | Date): DayTrackedSearchResult => {
  // return trackedDay info where nutritionTrackedDays's dateTracked is equal to trackedDay.dateTracked

  const trackedDayInfo = nutritionTrackedDays.find((nutritionTrackedDay) => {
    return String(nutritionTrackedDay.dateTracked) === String(trackedDay);
  });

  if (!trackedDayInfo) {
    
    return undefined;
  }
  
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
        amount: Number(micronutrient.amount),
        unit: String(micronutrient.unit),
      };
    }

    return micront;
  });

  return updatedFormInputMicronutrients;;
};

const deleteFormInputMicronutrientsHelper = (formInputMicronutrients: FormInputMicronutrient[], 
  micronutrientIndex: number): FormInputMicronutrient[] => {
  // remove micronutrient from formInputMicronutrients on index with micronutrientIndex

  const deleteMicronutrients = [ ...formInputMicronutrients ];
  deleteMicronutrients.splice(micronutrientIndex, 1);

  return deleteMicronutrients;
};

const filterDayTrackedHelper = (nutritionTrackedDays: NutritionTrackedDay[], 
  filterConditions: FilterConditions): NutritionTrackedDay[] => {
  let filteredNutritionTrackedDays: NutritionTrackedDay[] = []
  nutritionTrackedDays.map((trackedDay) => {
    if (filterConditions.filterStartDate === "" || (filterConditions.filterStartDate <= trackedDay.dateTracked)) {
      if (filterConditions.filterEndDate === "" || (trackedDay.dateTracked <= filterConditions.filterEndDate)) {
        filteredNutritionTrackedDays.push(trackedDay)
      }
    }
  })

  return filteredNutritionTrackedDays
}

const removeDayTrackedHelper = async (nutritionTrackedDays: NutritionTrackedDay[], trackedDay: string | Date, 
  userId: string, email: string): NutritionTrackedDay[] => {
  if (validateRemoveNutritionTrackedDay(trackedDay)) return nutritionTrackedDays

  deleteNutritionTrackedDay(userId, email, trackedDay)
  

  return nutritionTrackedDays.filter(nutritionTrackedDay => nutritionTrackedDay.dateTracked !== trackedDay)
}

const setDefaultNutritionTrackedDaysValuesHelper = (): NutritionTrackedDay[] => {
  return DEFAULT_NUTRITION_TRACKED_DAYS;
};

const setDefaultNutritionTrackedDaysSummaryValuesHelper = (): NutritionTrackedDaysSummary => {
  return DEFAULT_NUTRITION_TRACKED_DAYS_SUMMARY;
};

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
  //   averageDailyFatConsumption: 555,
  // }

  setDefaultNutritionTrackedDaysValues: () => {},
  setDefaultNutritionTrackedDaysSummaryValues: () => {},
  updateNutritionTrackedDaysAndSummary: () => {},

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
  const [nutritionTrackedDaysSummary, setNutritionTrackedDaysSummary] = useState<NutritionTrackedDaysSummary | undefined>({});

  // const { currentUser } = useContext(UserContext);
  const currentUser = useSelector(selectCurrentUser)

  // update nutritionTrackedDaysSummary with average consumptions
  useEffect(() => {
    

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
    if (filterConditions !== null) {
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
      setScheduledNutritionTrackedDaysView(null)
    }
  }, [nutritionTrackedDays, selectedNutritionTrackedDay])

  useEffect(() => {
    async function fetchNutritionTrackedDaysData() {
      if (currentUser) {
        const nutritionTrackedDaysData = await getNutritionTrackedDaysData(currentUser.uid, currentUser.email);
        const nutritionTrackedDaysSummaryData = await getNutritionTrackedDaysSummaryData(currentUser.uid, currentUser.email);
          
        if (nutritionTrackedDaysData) {
          const { nutritionTrackedDays } = await nutritionTrackedDaysData;
          setNutritionTrackedDays(nutritionTrackedDays);
        }

        if (nutritionTrackedDaysSummaryData) {
          const { nutritionTrackedDaysSummary } = await nutritionTrackedDaysSummaryData;
          setNutritionTrackedDaysSummary(nutritionTrackedDaysSummary);
        }
      } else if (!currentUser) {
        setDefaultNutritionTrackedDaysValues();
        setDefaultNutritionTrackedDaysSummaryValues();
      }
    };
    fetchNutritionTrackedDaysData();
  }, [currentUser]);

  const addDayTracked = async (trackedDayInfo: NutritionTrackedDay): Promise<void> => {
    const res = await addDayTrackedHelper(nutritionTrackedDays, formInputMicronutrients, 
      trackedDayInfo, currentUser?.uid!, currentUser?.email!);

    setNutritionTrackedDays(res);
    setFormInputMicronutrients([]);
  };

  const updateDayTracked = async (updatedTrackedDayInfo: NutritionTrackedDay): Promise<void> => {
    const res = await updateDayTrackedHelper(nutritionTrackedDays, formInputMicronutrients, 
      updatedTrackedDayInfo, currentUser?.uid!, currentUser?.email!);

    setNutritionTrackedDays(res);
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

  const removeDayTracked = async (trackedDay: string | Date): void => {
    const res = await removeDayTrackedHelper(nutritionTrackedDays, trackedDay, currentUser?.uid!, currentUser?.email!)
    setNutritionTrackedDays(res)
  }

  const clearDayTrackedFilter = (): void => {
    setFilterConditions(null)
    setNutritionTrackedDaysView(nutritionTrackedDays)
  }

  // set default nutrition tracked days
  const setDefaultNutritionTrackedDaysValues = (): void => {
    setNutritionTrackedDays(setDefaultNutritionTrackedDaysValuesHelper());
  };

  // set default nutrition tracked days summary
  const setDefaultNutritionTrackedDaysSummaryValues = (): void => {
    setNutritionTrackedDaysSummary(setDefaultNutritionTrackedDaysSummaryValuesHelper());
  };

  // update nutrition tracked days and summary on sign out
  const updateNutritionTrackedDaysAndSummary = (): void => {
    putNutritionTrackedDays(currentUser.uid, currentUser.email, nutritionTrackedDays);
    putNutritionTrackedDaysSummary(currentUser.uid, currentUser.email, nutritionTrackedDaysSummary);
  };

  const addDayTrackedFromPrediction = (predictionNutritionInfo: PrefictionNutritionInfo): void => {
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
                  nutritionTrackedDaysSummary,
                  nutritionTrackedDaysView, dayTrackedSearchResult,
                  filterDayTracked, removeDayTracked, clearDayTrackedFilter,
                  setDefaultNutritionTrackedDaysValues, setDefaultNutritionTrackedDaysSummaryValues, updateNutritionTrackedDaysAndSummary,
                  addDayTrackedFromPrediction, selectScheduledNutritionTrackedDay }

  return (
    <NutritionTrackerContext.Provider
      value={ value }>
      { children }
    </NutritionTrackerContext.Provider>
  );
};
