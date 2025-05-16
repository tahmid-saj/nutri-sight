import "./nutrition-tracker-graph-calories.styles.tsx"
import { NutritionTrackerDashboardGraphCalories } from "./nutrition-tracker-graph-calories.styles.tsx"
import ReactApexChart from "react-apexcharts"
import { useContext } from "react"
import { NutritionTrackerContext } from "../../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context.tsx"
import { COLOR_CODES, COMMON_SPACING } from "../../../../../utils/constants/shared.constants.ts"
import SimplePaper from "../../../../shared/mui/paper/paper.component.tsx"
import { GRAPH_FIELDS } from "../../../../../utils/constants/nutrition-tracker.constants.ts"
import { NutritionTrackedDay } from "../../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.types.js"
import { ApexOptions } from "apexcharts"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"]
}

const NutritionTrackerGraphCalories = () => {
  const { nutritionTrackedDays } = useContext(NutritionTrackerContext)

  let trackedCalories = new Map()
  const trackedDayCalories = nutritionTrackedDays.map((trackedDate: NutritionTrackedDay) => {
    if (trackedCalories.has(String(trackedDate.dateTracked))) {
      trackedCalories.set(String(trackedDate.dateTracked), Number(trackedCalories.get(trackedDate.dateTracked)) + Number(trackedDate.calories))
    } else {
      trackedCalories.set(String(trackedDate.dateTracked), Number(trackedDate.calories))
    }
  })

  const series: ApexAxisChartSeries = [{
    name: GRAPH_FIELDS.caloriesTitle,
    data: [ ...trackedCalories.values() ]
  }]

  const options: ApexOptions = {
    chart: {
      type: 'area',
      height: COMMON_SPACING.lineChart.height,
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    
    title: {
      text: GRAPH_FIELDS.caloriesTitle,
      align: 'left'
    },
    labels: [ ...trackedCalories.keys() ],
    xaxis: {
      labels: {
        show: true
      }
    },
    yaxis: {
      opposite: false
    },
    legend: {
      horizontalAlign: 'right'
    }
  };

  return (
    <NutritionTrackerDashboardGraphCalories>
      <SimplePaper styles={ paperStyles }>
        <ReactApexChart options={ options } series={ series } type="area" 
          height={ COMMON_SPACING.lineChart.height } width={ COMMON_SPACING.lineChart.width }/>
      </SimplePaper>
    </NutritionTrackerDashboardGraphCalories>
  )
}

export default NutritionTrackerGraphCalories