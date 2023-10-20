import React, { Component } from "react";

import Summary from "./summary/summary.component";

import "./nutrition-tracker.styles.scss";
import SearchDays from "./search-days/search-days.component";
import UpdateConsumptionForm from "./update-consumption-form/update-consumption-form.component";
import ConsumptionInfo from "./consumption-info/consumption-info.component";

import TopSearch from "./top-search/top-search.component";

class NutritionTracker extends Component {
  render() {
    return (
      <div className="nutrition-tracker-container">
        <TopSearch></TopSearch>

        <div className="form-view-separator-container">
          <hr className="rounded"/>
        </div>

        <div className="update-consumption-container">
          <UpdateConsumptionForm></UpdateConsumptionForm>
        </div>

      </div>
    );
  };
};

export default NutritionTracker;