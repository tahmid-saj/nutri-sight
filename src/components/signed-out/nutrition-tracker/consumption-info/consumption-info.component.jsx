import { useContext, Fragment } from "react";
import ReactApexChart from "react-apexcharts";
import "./consumption-info.styles.scss";

import { NutritionTrackerContext } from "../../../../contexts/signed-out/nutrition-tracker/nutrition-tracker.context";

import { GRAPH_FIELDS } from "../../../../utils/constants/nutrition-tracker.constants";

const ConsumptionInfo = () => {
  const { dayTrackedSearchResult } = useContext(NutritionTrackerContext);

  if (!dayTrackedSearchResult) {
    return (
      <div className="consumption-info">
        <h4><strong>Date is not tracked</strong></h4>
      </div>
    )
  }

  const trackedMacronutrients = new Map([
    [GRAPH_FIELDS.carbohydrates, dayTrackedSearchResult.macronutrients.carbohydrates !== 0 ? dayTrackedSearchResult.macronutrients.carbohydrates : 0],
    [GRAPH_FIELDS.protein, dayTrackedSearchResult.macronutrients.protein !== 0 ? dayTrackedSearchResult.macronutrients.protein : 0],
    [GRAPH_FIELDS.fat, dayTrackedSearchResult.macronutrients.fat !== 0 ? dayTrackedSearchResult.macronutrients.fat : 0]
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
        dayTrackedSearchResult !== undefined && dayTrackedSearchResult !== null &&
          <Fragment>
            <h5>{`On ${dayTrackedSearchResult.dateTracked}`}</h5>

            <h4>{`Total calories consumption : ${dayTrackedSearchResult.calories}`}</h4>

            <ReactApexChart options={ options } series={ series } type="donut" height={ 400 } width={ 400 }></ReactApexChart>

            {
              dayTrackedSearchResult.micronutrients && dayTrackedSearchResult.micronutrients.length !== 0 &&
              <h3>Micronutrients</h3>
            }
            {
              dayTrackedSearchResult.micronutrients.map((micronutrient, index) => {
                return (
                    <h4 key={ index }>{`${micronutrient.name} : ${micronutrient.amount} ${micronutrient.unit}`}</h4>
                )
              })
            }
          </Fragment>
      }
    </div>
  );
};

export default ConsumptionInfo;