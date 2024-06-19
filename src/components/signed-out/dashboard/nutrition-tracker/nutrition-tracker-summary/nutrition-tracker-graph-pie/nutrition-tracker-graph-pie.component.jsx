import "./nutrition-tracker-graph-pie.styles.scss"
import ReactApexChart from "react-apexcharts";
// import { useContext, Fragment } from "react"
// import { NutritionTrackerContext } from "../../../../../../contexts/signed-out/nutrition-tracker/nutrition-tracker.context"

import { GRAPH_FIELDS } from "../../../../../../utils/constants/nutrition-tracker.constants";

import { useSelector } from "react-redux";
import { selectNutritionTrackedDaysSummary } from "../../../../../../store/signed-out/nutrition-tracker/nutrition-tracker.selector";

const NutritionTrackerGraphPie = () => {
  const nutritionTrackedDaysSummary = useSelector(selectNutritionTrackedDaysSummary)

  const trackedMacronutrients = new Map([
    [GRAPH_FIELDS.carbohydrates, nutritionTrackedDaysSummary.averageDailyCarbohydratesConsumption !== 0 ? nutritionTrackedDaysSummary.averageDailyCarbohydratesConsumption : 0],
    [GRAPH_FIELDS.protein, nutritionTrackedDaysSummary.averageDailyProteinConsumption !== 0 ? nutritionTrackedDaysSummary.averageDailyProteinConsumption : 0],
    [GRAPH_FIELDS.fat, nutritionTrackedDaysSummary.averageDailyFatConsumption !== 0 ? nutritionTrackedDaysSummary.averageDailyFatConsumption : 0]
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
    <div className="nutrition-tracker-dashboard-graph-pie-container">
      <ReactApexChart options={ options } series={ series } type="donut" height={ 400 } width={ 400 }></ReactApexChart>
    </div>
  )
}

export default NutritionTrackerGraphPie