import { createContext, useState, useEffect } from "react";

import { validateAddDayTracked, validateUpdateDayTracked } from "../../../utils/validations/nutrition-tracker.validations";

// helper functions

const addDayTrackedHelper = (nutritionTrackedDays, trackedDayInfo) => {
  // add trackedDayInfo to nutritionTrackedDays

  if (validateAddDayTracked(nutritionTrackedDays, trackedDayInfo)) return nutritionTrackedDays;

  return [
    ...nutritionTrackedDays,

    {
      dateTracked: String(trackedDayInfo.dateTracked),
      calories: Number(trackedDayInfo.calories),
      macronutrients: {
        carbohydrates: Number(trackedDayInfo.macronutrients.carbohydrates),
        protein: Number(trackedDayInfo.macronutrients.protein),
        fat: Number(trackedDayInfo.macronutrients.fat),
      },
      micronutrients: trackedDayInfo.micronutrients
    }
  ];
};

const updateDayTrackedHelper = (nutritionTrackedDays, updatedTrackedDayInfo) => {
  // update nutritionTrackedDays where nutritionTrackedDay.dateTracked is equal to updatedTrackedDayInfo.trackedDate

  if (validateUpdateDayTracked(nutritionTrackedDays, updatedTrackedDayInfo)) return nutritionTrackedDays;

  const updatedNutritionTrackedDays = nutritionTrackedDays.map((nutritionTrackedDay) => {
    if (String(nutritionTrackedDay.dateTracked) === String(updatedTrackedDayInfo.dateTracked)) {
      return updatedTrackedDayInfo;
    }

    return nutritionTrackedDays;
  })

  return updatedNutritionTrackedDays;
};

const getDayTrackedHelper = (nutritionTrackedDays, trackedDay) => {
  // return trackedDay info where nutritionTrackedDays's dateTracked is equal to trackedDay.dateTracked

  const trackedDayInfo = nutritionTrackedDays.find((nutritionTrackedDay) => {
    return nutritionTrackedDay.dateTracked === trackedDay.dateTracked;
  });

  if (!trackedDayInfo) {
    console.log(`No tracked info found for ${trackedDay.dateTracked}`);
    return undefined;
  }
  
  return trackedDayInfo;
};

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
  //       }
  //     ]
  //   }
  // ]

  addDayTracked: () => {},
  updateDayTracked: () => {},
  getDayTracked: () => {},

  nutritionTrackedDaysSummary: {}
  // nutritionTrackedDaysSummary structure:
  // {
  //   averageDailyCaloriesConsumption: 2222,
  //   averageDailyCarbohydrateConsumption: 1111,
  //   averageDailyProteinConsumption: 777,
  //   averageDailyFatConsumption: 555,,
  // }
});

export const NutritionTrackerProvider = ({ children }) => {
  const [nutritionTrackedDays, setNutritionTrackedDays] = useState([]);
  const [nutritionTrackedDaysSummary, setNutritionTrackedDaysSummary] = useState({});

  useEffect(() => {
    // update nutritionTrackedDaysSummary with average consumptions
    const trackedDays = nutritionTrackedDays.length;

    const averageDailyCalories = (nutritionTrackedDays.reduce((totalCalories, { calories }) => {
      return totalCalories + calories;
    }, 0)) / trackedDays;

    const averageDailyCarbohydrate = (nutritionTrackedDays.reduce((totalCarbohydrates, { carbohydrates }) => {
      return totalCarbohydrates + carbohydrates;
    }, 0)) / trackedDays;

    const averageDailyProtein = (nutritionTrackedDays.reduce((totalProtein, { protein }) => {
      return totalProtein + protein;
    }, 0)) / trackedDays;

    const averageDailyFat = (nutritionTrackedDays.reduce((totalFat, { fat }) => {
      return totalFat + fat;
    }, 0)) / trackedDays;

    setNutritionTrackedDaysSummary({
      averageDailyCaloriesConsumption: averageDailyCalories,
      averageDailyCarbohydrateConsumption: averageDailyCarbohydrate,
      averageDailyProteinConsumption: averageDailyProtein,
      averageDailyFatConsumption: averageDailyFat,
    });
  }, [nutritionTrackedDays]);

  const addDayTracked = (trackedDayInfo) => {
    setNutritionTrackedDays(addDayTrackedHelper(nutritionTrackedDays, trackedDayInfo));
  };

  const updateDayTracked = (updatedTrackedDayInfo) => {
    setNutritionTrackedDays(updateDayTrackedHelper(nutritionTrackedDays, updatedTrackedDayInfo));
  };

  const getDayTracked = (trackedDay) => {
    return getDayTrackedHelper(nutritionTrackedDays, trackedDay);
  };

  const value = { nutritionTrackedDays, addDayTracked, updateDayTracked, 
                  getDayTracked, nutritionTrackedDaysSummary }

  return (
    <NutritionTrackerContext.Provider
      value={ value }>
      { children }
    </NutritionTrackerContext.Provider>
  );
};