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
    return String(nutritionTrackedDay.dateTracked) === String(trackedDay);
  });

  if (!trackedDayInfo) {
    console.log(`No tracked info found for ${trackedDay.dateTracked}`);
    return undefined;
  }
  
  return trackedDayInfo;
};

const addFormInputMicronutrientsHelper = (formInputMicronutrients) => {
  // add {} (empty micronutrient object) to formInputMicronutrients


};

const updateFormInputMicronutrientsHelper = (formInputMicronutrients, micronutrient, micronutrientIndex) => {
  // update formInputMicronutrients on micronutrientIndex with micronutrient

};

const deleteFormInputMicronutrientsHelper = (formInputMicronutrients, micronutrientIndex) => {
  // remove micronutrient from formInputMicronutrients on index with micronutrientIndex

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

  formInputMicronutrients: [],
  // formInputMicronutrients structure:
  // [
  //   {
  //     name: "Vitamin C",
  //     amount: 60,
  //     unit: "mg"
  //   }
  // ]

  addDayTracked: () => {},
  updateDayTracked: () => {},
  getDayTracked: () => {},

  addFormInputMicronutrients: () => {},
  updateFormInputMicronutrients: () => {},
  deleteFormInputMicronutrients: () => {},

  nutritionTrackedDaysSummary: {}
  // nutritionTrackedDaysSummary structure:
  // {
  //   averageDailyCaloriesConsumption: 2222,
  //   averageDailyCarbohydratesConsumption: 1111,
  //   averageDailyProteinConsumption: 777,
  //   averageDailyFatConsumption: 555,,
  // }
});

export const NutritionTrackerProvider = ({ children }) => {
  const [nutritionTrackedDays, setNutritionTrackedDays] = useState([]);
  const [formInputMicronutrients, setFormInputMicronutrients] = useState([]);
  const [nutritionTrackedDaysSummary, setNutritionTrackedDaysSummary] = useState({});

  useEffect(() => {
    // update nutritionTrackedDaysSummary with average consumptions
    const trackedDays = nutritionTrackedDays.length;

    // TODO: move this to calculations folder
    const averageDailyCalories = (nutritionTrackedDays.reduce((totalCalories, { calories }) => {
      return totalCalories + calories;
    }, 0)) / trackedDays;

    const averageDailyCarbohydrates = (nutritionTrackedDays.reduce((totalCarbohydrates, { carbohydrates }) => {
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
      averageDailyCarbohydratesConsumption: averageDailyCarbohydrates,
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

  const addFormInputMicronutrients = () => {
    setFormInputMicronutrients(addFormInputMicronutrientsHelper(formInputMicronutrients));
  };

  const updateFormInputMicronutrients = (micronutrient, micronutrientIndex) => {
    setFormInputMicronutrients(updateFormInputMicronutrientsHelper(formInputMicronutrients, micronutrient, micronutrientIndex));
  };

  const deleteFormInputMicronutrients = (micronutrientIndex) => {
    setFormInputMicronutrients(deleteFormInputMicronutrientsHelper(formInputMicronutrients, micronutrientIndex));
  };

  const value = { nutritionTrackedDays, addDayTracked, updateDayTracked, getDayTracked, 
                  addFormInputMicronutrients, updateFormInputMicronutrients, deleteFormInputMicronutrients, 
                  nutritionTrackedDaysSummary }

  return (
    <NutritionTrackerContext.Provider
      value={ value }>
      { children }
    </NutritionTrackerContext.Provider>
  );
};