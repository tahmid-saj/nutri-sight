import { useContext, Fragment } from "react";

import "./consumption-info.styles.scss";

import { NutritionTrackerContext } from "../../../../contexts/signed-out/nutrition-tracker/nutrition-tracker.context";

const ConsumptionInfo = ({ searchedDay }) => {
  const { getDayTracked } = useContext(NutritionTrackerContext);
  const dayTrackedInfo = getDayTracked(searchedDay);

  return (
    <div className="consumption-info">
      {
        dayTrackedInfo === undefined || dayTrackedInfo === null ? <h4><strong>Date is not tracked</strong></h4> :
        (
          <Fragment>
            <h5>{`On ${searchedDay}`}</h5>

            <h4>{`Total calories consumption : ${dayTrackedInfo.calories}`}</h4>
            <h4>{`Total carbohydrates consumption : ${dayTrackedInfo.macronutrients.carbohydrates} g`}</h4>
            <h4>{`Total protein consumption : ${dayTrackedInfo.macronutrients.protein} g`}</h4>
            <h4>{`Total fat consumption : ${dayTrackedInfo.macronutrients.fat} g`}</h4>

            {
              dayTrackedInfo.micronutrients && dayTrackedInfo.micronutrients.length !== 0 &&
              <h3>Micronutrients</h3>
            }
            {
              dayTrackedInfo.micronutrients.map((micronutrient, index) => {
                return (
                    <h4 key={ index }>{`${micronutrient.name} : ${micronutrient.amount} ${micronutrient.unit}`}</h4>
                )
              })
            }
          </Fragment>
        )
      }
    </div>
  );
};

export default ConsumptionInfo;