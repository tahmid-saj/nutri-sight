import React, { Component, useEffect, Fragment } from "react";

import Summary from "../../../components/signed-out/nutrition-tracker/summary/summary.component";

import "./nutrition-tracker.styles.scss";
import SearchDays from "../../../components/signed-out/nutrition-tracker/search-days/search-days.component";
import UpdateConsumptionForm from "../../../components/signed-out/nutrition-tracker/update-consumption-form/update-consumption-form.component";
import ConsumptionInfo from "../../../components/signed-out/nutrition-tracker/consumption-info/consumption-info.component";

import TopSearch from "../../../components/signed-out/nutrition-tracker/top-search/top-search.component";

// import { NutritionTrackerContext } from "../../../contexts/signed-out/nutrition-tracker/nutrition-tracker.context";
import { useDispatch, useSelector } from "react-redux"
import { selectNutritionTrackedDays, selectFilterConditions, selectNutritionTrackedDaysView } from "../../../store/signed-out/nutrition-tracker/nutrition-tracker.selector";
import { setNutritionTrackedDaysSummary, setNutritionTrackedDaysView, 
  filterDayTrackedHelper 
} from "../../../store/signed-out/nutrition-tracker/nutrition-tracker.action";
import { calculateSummary } from "../../../utils/calculations/nutrition-tracker.calculations";

const NutritionTracker = () => {
  // const { nutritionTrackedDays } = useContext(NutritionTrackerContext);
  const nutritionTrackedDays = useSelector(selectNutritionTrackedDays)
  const filterConditions = useSelector(selectFilterConditions)
  const nutritionTrackedDaysView = useSelector(selectNutritionTrackedDaysView)
  const dispatch = useDispatch()

  // update summary if nutritionTrackedDays changes
  useEffect(() => {
    if (nutritionTrackedDays && nutritionTrackedDays.length) {
      // update nutritionTrackedDaysSummary with average consumptions
      console.log(nutritionTrackedDays);
  
      const summary = calculateSummary(nutritionTrackedDays);
  
      dispatch(setNutritionTrackedDaysSummary({
        averageDailyCaloriesConsumption: summary.averageDailyCalories,
        averageDailyCarbohydratesConsumption: summary.averageDailyCarbohydrates,
        averageDailyProteinConsumption: summary.averageDailyProtein,
        averageDailyFatConsumption: summary.averageDailyFat,
      }))
    }
  }, [nutritionTrackedDays, dispatch])

  // update nutritionTrackedDaysView when nutritionTrackedDays or filterConditions change
  useEffect(() => {
    if (filterConditions) {
      const filteredTrackedDays = filterDayTrackedHelper(nutritionTrackedDays, filterConditions)
      dispatch(setNutritionTrackedDaysView(filteredTrackedDays))
    } else {
      dispatch(setNutritionTrackedDaysView(nutritionTrackedDays))
    }
  }, [nutritionTrackedDays, filterConditions, dispatch])

  return (
    <div className="nutrition-tracker-container">
      {
        nutritionTrackedDays && nutritionTrackedDays.length !== 0 &&
        <Fragment>
        <h2 className="nutrition-tracker-summary-header">Summary</h2>
          <TopSearch></TopSearch>

          <div className="form-view-separator-container">
            <hr className="rounded"/>
          </div>
        </Fragment>
      }

      <div className="update-consumption-container">
        <UpdateConsumptionForm></UpdateConsumptionForm>
      </div>

    </div>
  );
  // };
};

export default NutritionTracker;