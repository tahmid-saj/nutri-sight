import "./nutrition-tracker-graph-pie.styles.tsx"
import { NutritionTrackerDashboardGraphPieContainer } from "./nutrition-tracker-graph-pie.styles.tsx";
import ReactApexChart from "react-apexcharts";
import { useContext, Fragment } from "react"
import { NutritionTrackerContext } from "../../../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context.tsx"
import SimplePaper from "../../../../../shared/mui/paper/paper.component.tsx";

import { GRAPH_FIELDS } from "../../../../../../utils/constants/nutrition-tracker.constants.ts";
import { COLOR_CODES, COMMON_SPACING } from "../../../../../../utils/constants/shared.constants.ts";
import { ApexOptions } from "apexcharts";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["0"]
}

const NutritionTrackerGraphPie = () => {
  const { nutritionTrackedDaysSummary } = useContext(NutritionTrackerContext);

  const trackedMacronutrients = new Map([
    [GRAPH_FIELDS.carbohydrates, nutritionTrackedDaysSummary?.averageDailyCarbohydratesConsumption !== 0 ? nutritionTrackedDaysSummary?.averageDailyCarbohydratesConsumption : 0],
    [GRAPH_FIELDS.protein, nutritionTrackedDaysSummary?.averageDailyProteinConsumption !== 0 ? nutritionTrackedDaysSummary?.averageDailyProteinConsumption : 0],
    [GRAPH_FIELDS.fat, nutritionTrackedDaysSummary?.averageDailyFatConsumption !== 0 ? nutritionTrackedDaysSummary?.averageDailyFatConsumption : 0]
  ])

  const series: number[] = Array.from(trackedMacronutrients.values()).map(value => value ?? 0);

  const options: ApexOptions = {
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