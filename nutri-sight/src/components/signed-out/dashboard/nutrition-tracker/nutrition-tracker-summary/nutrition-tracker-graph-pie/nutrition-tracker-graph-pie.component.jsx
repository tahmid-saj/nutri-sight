import "./nutrition-tracker-graph-pie.styles.scss"
import ReactApexChart from "react-apexcharts";
import { useContext, Fragment } from "react"
import { NutritionTrackerContext } from "../../../../../../contexts/signed-out/nutrition-tracker/nutrition-tracker.context"

const NutritionTrackerGraphPie = () => {
  const { nutritionTrackedDaysSummary } = useContext(NutritionTrackerContext);

  const trackedMacronutrients = new Map([
    ["Carbohydrates (g)", nutritionTrackedDaysSummary.averageDailyCarbohydratesConsumption !== 0 ? nutritionTrackedDaysSummary.averageDailyCarbohydratesConsumption : 0],
    ["Protein (g)", nutritionTrackedDaysSummary.averageDailyProteinConsumption !== 0 ? nutritionTrackedDaysSummary.averageDailyProteinConsumption : 0],
    ["Fat (g)", nutritionTrackedDaysSummary.averageDailyFatConsumption !== 0 ? nutritionTrackedDaysSummary.averageDailyFatConsumption : 0]
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