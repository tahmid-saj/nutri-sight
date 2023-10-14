import React from "react";

import "./nutrients-info.styles.scss";

const NutrientsInfo = () => {
  return (
    <div className="nutrients-info-container">
      <strong><h2>Macronutrients</h2></strong>

      <h4>{`Calories - ${2000}`}</h4>
      <h4>{`Carb - ${1000}`}</h4>
      <h4>{`Protein - ${500}`}</h4>
      <h4>{`Fat - ${600}`}</h4>

      <strong><h2>Micronutrients</h2></strong>

      <h4>{`Vitamin C - ${600}`}</h4>
    </div>
  )
};

export default NutrientsInfo;