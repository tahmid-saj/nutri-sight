import "./calories-burned-graph-line.styles.tsx"
import { CaloriesBurnedLineGraphContainer } from "./calories-burned-graph-line.styles.tsx"
import ReactApexChart from "react-apexcharts"
import { useContext } from "react"
import { CaloriesBurnedContext } from "../../../../../contexts/signed-out/calories-burned/calories-burned.context.tsx"

import { GRAPH_FIELDS } from "../../../../../utils/constants/calories-burned.constants.ts"
import { COLOR_CODES, COMMON_SPACING } from "../../../../../utils/constants/shared.constants.ts"
import SimplePaper from "../../../../shared/mui/paper/paper.component.tsx"
import { Typography } from "@mui/material"
import { ApexOptions } from "apexcharts"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"]
}

const CaloriesBurnedGraphLine = () => {
  const { trackedCaloriesBurnedView } = useContext(CaloriesBurnedContext)

  let trackedCalories = new Map()
  const trackedCaloriesBurnedActivities = trackedCaloriesBurnedView.map((trackedCaloriesBurned) => {
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
      text: GRAPH_FIELDS.caloriesBurnedTitle,
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
    <CaloriesBurnedLineGraphContainer>
      <Typography sx={{ display: "flex", justifyContent: "center", color: COLOR_CODES.general["0"], marginBottom: "2%" }} 
        variant="h6">Filtered results</Typography>
      <SimplePaper styles={ paperStyles }>
        <ReactApexChart options={ options } series={ series } type="area" 
          height={ COMMON_SPACING.lineChart.height } width={ COMMON_SPACING.lineChart.width }/>
      </SimplePaper>
    </CaloriesBurnedLineGraphContainer>
  )
}

export default CaloriesBurnedGraphLine