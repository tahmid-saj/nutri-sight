import { createContext, useState, useEffect } from "react";

import { validatePredictionInfo, validateAddDayTracked, validateUpdateDayTracked, 
  validateFilterNutritionTrackedDays, validateRemoveNutritionTrackedDay } from "../../../utils/validations/nutrition-tracker.validations";
import { calculateSummary } from "../../../utils/calculations/nutrition-tracker.calculations";

import { DEFAULT_MICRONUTRIENT } from "../../../utils/constants/nutrition-tracker.constants";

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

const filterDayTrackedHelper = (nutritionTrackedDays, filterConditions) => {
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

const selectScheduledNutritionTrackedDayHelper = (nutritionTrackedDays, trackedDay) => {
  const filteredNutritionTrackedDay = nutritionTrackedDays.find((nutritionTrackedDay) => {
    return nutritionTrackedDay.dateTracked === trackedDay
  })

  if (!filteredNutritionTrackedDay) return null

  return filteredNutritionTrackedDay
}

export const NutritionTrackerContext = createContext({
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
  selectedNutritionTrackedDay: null,

  filterConditions: {},
  // filterConditions structure:
  // {
  //   filterStartDate: "",
  //   filterEndDate: ""
  // }

  nutritionTrackedDaysView: [],

  // scheduledNutritionTrackedDaysView is the selected selectedNutritionTrackedDay info from the calendar component
  scheduledNutritionTrackedDaysView: null,

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

export const NutritionTrackerProvider = ({ children }) => {
  const [nutritionTrackedDays, setNutritionTrackedDays] = useState([]);
  const [formInputMicronutrients, setFormInputMicronutrients] = useState([]);
  const [filterConditions, setFilterConditions] = useState(null)
  const [selectedNutritionTrackedDay, setSelectedNutritionTrackedDay] = useState(null)
  const [scheduledNutritionTrackedDaysView, setScheduledNutritionTrackedDaysView] = useState(null)
  const [nutritionTrackedDaysView, setNutritionTrackedDaysView] = useState(nutritionTrackedDays)
  const [dayTrackedSearchResult, setDayTrackedSearchResult] = useState(undefined)
  const [nutritionTrackedDaysSummary, setNutritionTrackedDaysSummary] = useState({});

  useEffect(() => {
    // update nutritionTrackedDaysSummary with average consumptions
    console.log(nutritionTrackedDays);

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

  const addDayTracked = (trackedDayInfo) => {
    setNutritionTrackedDays(addDayTrackedHelper(nutritionTrackedDays, formInputMicronutrients, trackedDayInfo));
    setFormInputMicronutrients([]);
  };

  const updateDayTracked = (updatedTrackedDayInfo) => {
    setNutritionTrackedDays(updateDayTrackedHelper(nutritionTrackedDays, formInputMicronutrients, updatedTrackedDayInfo));
    setFormInputMicronutrients([]);
  };

  const getDayTracked = (trackedDay) => {
    setDayTrackedSearchResult(getDayTrackedHelper(nutritionTrackedDays, trackedDay))
  };

  const addFormInputMicronutrients = () => {
    setFormInputMicronutrients(addFormInputMicronutrientsHelper(formInputMicronutrients));
  };

  const updateFormInputMicronutrients = (micronutrient, micronutrientIndex) => {
    setFormInputMicronutrients(updateFormInputMicronutrientsHelper(formInputMicronutrients, micronutrient, micronutrientIndex));
  };

  const deleteFormInputMicronutrients = (micronutrientIndex) => {
    setFormInputMicronutrients(deleteFormInputMicronutrientsHelper(formInputMicronutrients, micronutrientIndex));
  };

  const filterDayTracked = (filterConditions) => {
    if (validateFilterNutritionTrackedDays(filterConditions)) {
      console.log("invalid")
      return
    } else {
      setFilterConditions(filterConditions)
      setNutritionTrackedDaysView(filterDayTrackedHelper(nutritionTrackedDays, filterConditions))
      console.log("set")
    }
  }

  const removeDayTracked = (trackedDay) => {
    setNutritionTrackedDays(removeDayTrackedHelper(nutritionTrackedDays, trackedDay))
  }

  const clearDayTrackedFilter = () => {
    setFilterConditions(null)
    setNutritionTrackedDaysView(nutritionTrackedDays)
  }

  const addDayTrackedFromPrediction = (predictionNutritionInfo) => {
    setNutritionTrackedDays(addDayTrackedFromPredictionHelper(nutritionTrackedDays, predictionNutritionInfo))
    setFormInputMicronutrients([]);
  }

  const selectScheduledNutritionTrackedDay = (dayTracked) => {
    setSelectedNutritionTrackedDay(dayTracked)
    setScheduledNutritionTrackedDaysView(selectScheduledNutritionTrackedDayHelper(nutritionTrackedDays, dayTracked))
  }

  const value = { nutritionTrackedDays, formInputMicronutrients, scheduledNutritionTrackedDaysView,
                  addDayTracked, updateDayTracked, getDayTracked, 
                  addFormInputMicronutrients, updateFormInputMicronutrients, deleteFormInputMicronutrients, 
                  nutritionTrackedDaysSummary, 
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
