import React, { Component, useContext, Fragment } from "react";

import Summary from "../../../components/signed-in/nutrition-tracker/summary/summary.component";

import "./nutrition-tracker.styles.scss";
import SearchDays from "../../../components/signed-in/nutrition-tracker/search-days/search-days.component";
import UpdateConsumptionForm from "../../../components/signed-in/nutrition-tracker/update-consumption-form/update-consumption-form.component";
import ConsumptionInfo from "../../../components/signed-in/nutrition-tracker/consumption-info/consumption-info.component";

import TopSearch from "../../../components/signed-in/nutrition-tracker/top-search/top-search.component";

import { NutritionTrackerContext } from "../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context";

const NutritionTracker = () => {
  const { nutritionTrackedDays } = useContext(NutritionTrackerContext);

  return (
    <div className="nutrition-tracker-container">
      {
        nutritionTrackedDays.length !== 0 &&
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