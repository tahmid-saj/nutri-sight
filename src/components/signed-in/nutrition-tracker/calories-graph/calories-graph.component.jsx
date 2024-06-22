import "./calories-graph.styles.jsx"
import { NutritionTrackerCaloriesGraphContainer } from "./calories-graph.styles.jsx"
import ReactApexChart from "react-apexcharts"
import { useContext } from "react"
import { NutritionTrackerContext } from "../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context"

import { GRAPH_FIELDS } from "../../../../utils/constants/nutrition-tracker.constants"
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js"
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"]
}

const CaloriesGraph = () => {
  const { nutritionTrackedDaysView } = useContext(NutritionTrackerContext)

  let trackedCalories = new Map()
  const trackedDayCalories = nutritionTrackedDaysView.map((trackedDate) => {
    if (trackedCalories.has(String(trackedDate.dateTracked))) {
      trackedCalories.set(String(trackedDate.dateTracked), Number(trackedCalories.get(trackedDate.dateTracked)) + Number(trackedDate.calories))
    } else {
      trackedCalories.set(String(trackedDate.dateTracked), Number(trackedDate.calories))
    }
  })

  const series = [{
    name: GRAPH_FIELDS.caloriesTitle,
    data: [ ...trackedCalories.values() ]
  }]

  const options = {
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
      type: 'string',
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
    <NutritionTrackerCaloriesGraphContainer>
      <SimplePaper styles={ paperStyles }>
        <ReactApexChart options={ options } series={ series } type="area" 
          height={ COMMON_SPACING.lineChart.height } width={ COMMON_SPACING.lineChart.width }/>
      </SimplePaper>
    </NutritionTrackerCaloriesGraphContainer>
  )
}

export default CaloriesGraph