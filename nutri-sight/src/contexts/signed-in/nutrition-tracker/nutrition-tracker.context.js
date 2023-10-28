import { createContext, useState, useEffect, useContext } from "react";

import { validateAddDayTracked, validateUpdateDayTracked } from "../../../utils/validations/nutrition-tracker.validations";
import { calculateSummary } from "../../../utils/calculations/nutrition-tracker.calculations";

import { DEFAULT_MICRONUTRIENT, DEFAULT_NUTRITION_TRACKED_DAYS, DEFAULT_NUTRITION_TRACKED_DAYS_SUMMARY } from "../../../utils/constants/nutrition-tracker.constants";

import { UserContext } from "../../shared/user/user.context";

import { getNutritionTrackedDaysData, getNutritionTrackedDaysSummaryData,
  postNutritionTrackedDay, putNutritionTrackedDay,
  putNutritionTrackedDays, putNutritionTrackedDaysSummary } from "../../../utils/api-requests/nutrition-tracker.requests";

// helper functions

const addMicronutrientsToTrackedDayInfoHelper = (formInputMicronutrients, trackedDayInfo) => {
  return {
    ...trackedDayInfo,

    micronutrients: formInputMicronutrients
  }
};

const addDayTrackedHelper = async (nutritionTrackedDays, formInputMicronutrients, trackedDayInfo, userId, email) => {
  // add formInputMicronutrients to trackedDayInfo
  const trackedDayWithMicronutrients = addMicronutrientsToTrackedDayInfoHelper(formInputMicronutrients, trackedDayInfo);

  // add trackedDayInfo to nutritionTrackedDays

  if (validateAddDayTracked(nutritionTrackedDays, trackedDayWithMicronutrients)) return nutritionTrackedDays;

  console.log(formInputMicronutrients)
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

const updateDayTrackedHelper = async (nutritionTrackedDays, formInputMicronutrients, updatedTrackedDayInfo, userId, email) => {
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

  putNutritionTrackedDay(userId, email, originalNutritionTrackedDay, trackedDayWithMicronutrients);

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

const setDefaultNutritionTrackedDaysValuesHelper = () => {
  return DEFAULT_NUTRITION_TRACKED_DAYS;
};

const setDefaultNutritionTrackedDaysSummaryValuesHelper = () => {
  return DEFAULT_NUTRITION_TRACKED_DAYS_SUMMARY;
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

  addDayTracked: () => {},
  updateDayTracked: () => {},
  getDayTracked: () => {},

  addFormInputMicronutrients: () => {},
  updateFormInputMicronutrients: () => {},
  deleteFormInputMicronutrients: () => {},

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
});

export const NutritionTrackerProvider = ({ children }) => {
  const [nutritionTrackedDays, setNutritionTrackedDays] = useState([]);
  const [formInputMicronutrients, setFormInputMicronutrients] = useState([]);
  const [nutritionTrackedDaysSummary, setNutritionTrackedDaysSummary] = useState({});

  const { currentUser } = useContext(UserContext);

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

  const addDayTracked = async (trackedDayInfo) => {
    const res = await addDayTrackedHelper(nutritionTrackedDays, formInputMicronutrients, trackedDayInfo, currentUser.uid, currentUser.email);

    setNutritionTrackedDays(res);
    setFormInputMicronutrients([]);
  };

  const updateDayTracked = async (updatedTrackedDayInfo) => {
    const res = await updateDayTrackedHelper(nutritionTrackedDays, formInputMicronutrients, updatedTrackedDayInfo, currentUser.uid, currentUser.email);

    setNutritionTrackedDays(res);
    setFormInputMicronutrients([]);
  };

  const getDayTracked = (trackedDay) => {
    return getDayTrackedHelper(nutritionTrackedDays, trackedDay);
  };

  const addFormInputMicronutrients = () => {
    setFormInputMicronutrients(addFormInputMicronutrientsHelper(formInputMicronutrients));
    console.log(formInputMicronutrients)
  };

  const updateFormInputMicronutrients = (micronutrient, micronutrientIndex) => {
    setFormInputMicronutrients(updateFormInputMicronutrientsHelper(formInputMicronutrients, micronutrient, micronutrientIndex));
    console.log(formInputMicronutrients)
  };

  const deleteFormInputMicronutrients = (micronutrientIndex) => {
    setFormInputMicronutrients(deleteFormInputMicronutrientsHelper(formInputMicronutrients, micronutrientIndex));
    console.log(formInputMicronutrients)
  };

  // set default nutrition tracked days
  const setDefaultNutritionTrackedDaysValues = () => {
    setNutritionTrackedDays(setDefaultNutritionTrackedDaysValuesHelper());
  };

  // set default nutrition tracked days summary
  const setDefaultNutritionTrackedDaysSummaryValues = () => {
    setNutritionTrackedDaysSummary(setDefaultNutritionTrackedDaysSummaryValuesHelper());
  };

  // update nutrition tracked days and summary on sign out
  const updateNutritionTrackedDaysAndSummary = () => {
    putNutritionTrackedDays(currentUser.uid, currentUser.email, nutritionTrackedDays);
    putNutritionTrackedDaysSummary(currentUser.uid, currentUser.email, nutritionTrackedDaysSummary);
  };

  const value = { nutritionTrackedDays, formInputMicronutrients, 
                  addDayTracked, updateDayTracked, getDayTracked, 
                  addFormInputMicronutrients, updateFormInputMicronutrients, deleteFormInputMicronutrients, 
                  nutritionTrackedDaysSummary,
                  setDefaultNutritionTrackedDaysValues, setDefaultNutritionTrackedDaysSummaryValues, updateNutritionTrackedDaysAndSummary }

  return (
    <NutritionTrackerContext.Provider
      value={ value }>
      { children }
    </NutritionTrackerContext.Provider>
  );
};
