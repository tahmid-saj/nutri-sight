import "./calories-burned-graph.styles.js"
import { CaloriesBurnedDashboardGraphLineContainer } from "./calories-burned-graph.styles.js"
import ReactApexChart from "react-apexcharts"
import { useContext } from "react"
import { CaloriesBurnedContext } from "../../../../../contexts/signed-out/calories-burned/calories-burned.context.js"

import { GRAPH_FIELDS } from "../../../../../utils/constants/calories-burned.constants.js"
import { COLOR_CODES, COMMON_SPACING } from "../../../../../utils/constants/shared.constants.js"
import SimplePaper from "../../../../shared/mui/paper/paper.component.js"
import { ApexOptions } from "apexcharts"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["0"],
  marginLeft: "2%",
  marginRight: "2%"
}

const CaloriesBurnedGraph = () => {
  const { trackedCaloriesBurned } = useContext(CaloriesBurnedContext)

  let trackedCalories = new Map()
  const trackedCaloriesBurnedActivities = trackedCaloriesBurned.map((trackedCaloriesBurned) => {
    if (trackedCalories.has(String(trackedCaloriesBurned.dateTracked))) {
      trackedCalories.set(String(trackedCaloriesBurned.dateTracked), Number(trackedCalories.get(trackedCaloriesBurned.dateTracked)) + Number(trackedCaloriesBurned.totalCaloriesBurned))
    } else {
      trackedCalories.set(String(trackedCaloriesBurned.dateTracked), Number(trackedCaloriesBurned.totalCaloriesBurned))
    }
  })

  const series: ApexAxisChartSeries = [{
    name: GRAPH_FIELDS.caloriesBurnedTitle,
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
      text: GRAPH_FIELDS.dateTitle,
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
    <SimplePaper styles={ paperStyles }>
      <CaloriesBurnedDashboardGraphLineContainer>
        <ReactApexChart options={ options } series={ series } type="area" 
          height={ COMMON_SPACING.lineChart.height } width={ COMMON_SPACING.lineChart.width }/>
      </CaloriesBurnedDashboardGraphLineContainer>
    </SimplePaper>
  )
}

export default CaloriesBurnedGraph