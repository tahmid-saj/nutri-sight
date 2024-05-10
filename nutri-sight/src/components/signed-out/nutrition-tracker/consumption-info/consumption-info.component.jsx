import { useContext, Fragment } from "react";
import ReactApexChart from "react-apexcharts";
import "./consumption-info.styles.scss";

import { NutritionTrackerContext } from "../../../../contexts/signed-out/nutrition-tracker/nutrition-tracker.context";

const ConsumptionInfo = ({ searchedDay }) => {
  const { getDayTracked } = useContext(NutritionTrackerContext);
  const dayTrackedInfo = getDayTracked(searchedDay);

  const trackedMacronutrients = new Map([
    ["Carbohydrates (g)", dayTrackedInfo.macronutrients.carbohydrates !== 0 ? dayTrackedInfo.macronutrients.carbohydrates : 0],
    ["Protein (g)", dayTrackedInfo.macronutrients.protein !== 0 ? dayTrackedInfo.macronutrients.protein : 0],
    ["Fat (g)", dayTrackedInfo.macronutrients.fat !== 0 ? dayTrackedInfo.macronutrients.fat : 0]
  ])
  
  const series = [ ...trackedMacronutrients.values() ]

  const options = {
    chart: {
      type: 'donut',
      height: 400,
    },
    labels: [ ...trackedMacronutrients.keys() ],
    responsive: [{
      breakpoint: 50,
      options: {
        chart: {
          height: 400
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }

  return (
    <div className="consumption-info">
      {
        dayTrackedInfo === undefined || dayTrackedInfo === null ? <h4><strong>Date is not tracked</strong></h4> :
        (
          <Fragment>
            <h5>{`On ${searchedDay}`}</h5>

            <h4>{`Total calories consumption : ${dayTrackedInfo.calories}`}</h4>

            <ReactApexChart options={ options } series={ series } type="donut" height={ 400 } width={ 400 }></ReactApexChart>

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