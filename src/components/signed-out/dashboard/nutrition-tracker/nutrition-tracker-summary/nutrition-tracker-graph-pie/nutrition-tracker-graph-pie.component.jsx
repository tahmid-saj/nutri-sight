import "./nutrition-tracker-graph-pie.styles.jsx"
import { NutritionTrackerDashboardGraphPieContainer } from "./nutrition-tracker-graph-pie.styles.jsx";
import ReactApexChart from "react-apexcharts";

import { GRAPH_FIELDS } from "../../../../../../utils/constants/nutrition-tracker.constants";

import { useSelector } from "react-redux";
import { selectNutritionTrackedDaysSummary } from "../../../../../../store/signed-out/nutrition-tracker/nutrition-tracker.selector";
import SimplePaper from "../../../../../shared/mui/paper/paper.component.jsx";
import { COLOR_CODES, COMMON_SPACING } from "../../../../../../utils/constants/shared.constants.js";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["0"]
}

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
    },
    labels: [ ...trackedMacronutrients.keys() ],
    responsive: [{
      breakpoint: 50,
      options: {
        legend: {
          position: 'bottom'
        }
      }
    }]
  }

  return (
    <NutritionTrackerDashboardGraphPieContainer>
      <SimplePaper styles={ paperStyles }>
        <ReactApexChart options={ options } series={ series } type="donut" 
          height={ COMMON_SPACING.pieChart.height } width={ COMMON_SPACING.pieChart.width }></ReactApexChart>
      </SimplePaper>
    </NutritionTrackerDashboardGraphPieContainer>
  )
}

export default NutritionTrackerGraphPie