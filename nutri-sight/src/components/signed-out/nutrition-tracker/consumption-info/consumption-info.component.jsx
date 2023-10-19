import { useContext } from "react";

import "./consumption-info.styles.scss";

import { NutritionTrackerContext } from "../../../../context/signed-out/nutrition-tracker/nutrition-tracker.context";

const ConsumptionInfo = ({ searchedDay }) => {
  const { getDayTracked } = useContext(NutritionTrackerContext);
  const dayTrackedInfo = getDayTracked(searchedDay);

  return (
    <div className="consumption-info">
      <h5>{`On ${searchedDay}`}</h5>

      <h4>{`Total calories consumption   `}<h3><strong>{`${dayTrackedInfo.calories}`}</strong></h3></h4>
      <h4>{`Total carbohydrate consumption   `}<h3><strong>{`${dayTrackedInfo.macronutrients.carbohydrates}`}</strong></h3></h4>
      <h4>{`Total protein consumption   `}<h3><strong>{`${dayTrackedInfo.macronutrients.protein}`}</strong></h3></h4>
      <h4>{`Total fat consumption   `}<h3><strong>{`${dayTrackedInfo.macronutrients.fat}`}</strong></h3></h4>

      <h3>Micronutrients</h3>
      {
        dayTrackedInfo.micronutrients.map((micronutrient, index) => {
          return (
            <h4 key={ index }>
              {`${micronutrient.name} consumption   `}<h3><strong>{`${micronutrient.amount}`}</strong></h3>
            </h4>
          )
        })
      }
    </div>
  );
};

export default ConsumptionInfo;