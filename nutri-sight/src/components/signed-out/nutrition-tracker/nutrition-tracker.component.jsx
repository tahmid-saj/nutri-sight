import React, { Component, useContext, Fragment } from "react";

import Summary from "./summary/summary.component";

import "./nutrition-tracker.styles.scss";
import SearchDays from "./search-days/search-days.component";
import UpdateConsumptionForm from "./update-consumption-form/update-consumption-form.component";
import ConsumptionInfo from "./consumption-info/consumption-info.component";

import TopSearch from "./top-search/top-search.component";

import { NutritionTrackerContext } from "../../../contexts/signed-out/nutrition-tracker/nutrition-tracker.context";

const NutritionTracker = () => {
  const { nutritionTrackedDays } = useContext(NutritionTrackerContext);

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