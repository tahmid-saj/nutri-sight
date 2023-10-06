import React, { Component } from "react";

import Summary from "./summary/summary.component";

import "./nutrition-tracker.styles.scss";
import SearchDays from "./search-days/search-days.component";
import UpdateConsumptionForm from "./update-consumption-form/update-consumption-form.component";
import ConsumptionInfo from "./consumption-info/consumption-info.component";

class NutritionTracker extends Component {
  render() {
    return (
      <div className="nutrition-tracker-container">
        <div className="search-days-nutrition-tracker-container">
          <SearchDays></SearchDays>
          <Summary></Summary>
        </div>

        <div className="update-consumption-container">
          <UpdateConsumptionForm></UpdateConsumptionForm>
          <ConsumptionInfo></ConsumptionInfo>
        </div>

      </div>
    );
  };
};

export default NutritionTracker;