import React, { Component, useContext, Fragment } from "react";

import "./nutrition-tracker.styles.scss";

import UpdateConsumptionForm from "./update-consumption-form/update-consumption-form.component";

import TopSearch from "./top-search/top-search.component";

import { NutritionTrackerContext } from "../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context";

const NutritionTracker = () => {
  const { nutritionTrackedDays } = useContext(NutritionTrackerContext);

  // render() {
  return (
    <div className="nutrition-tracker-container">
      {
        nutritionTrackedDays.length !== 0 &&
        <Fragment>
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
