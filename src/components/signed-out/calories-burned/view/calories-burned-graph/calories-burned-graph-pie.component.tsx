import "./calories-burned-graph-pie.styles.tsx"
import { CaloriesBurnedPieGraphContainer } from "./calories-burned-graph-pie.styles.tsx"
import { useContext } from "react"
import { CaloriesBurnedContext } from "../../../../../contexts/signed-out/calories-burned/calories-burned.context.tsx"
import ReactApexChart from 'react-apexcharts'
import { COLOR_CODES, COMMON_SPACING } from "../../../../../utils/constants/shared.constants.ts"
import SimplePaper from "../../../../shared/mui/paper/paper.component.tsx"
import { Typography } from "@mui/material"
import { ApexOptions } from "apexcharts"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  margin: "2%",
}

const CaloriesBurnedGraphPie = () => {
  const { trackedCaloriesBurnedView } = useContext(CaloriesBurnedContext)

  let trackedCalories = new Map()
  const trackedCaloriesBurnedActivities = trackedCaloriesBurnedView.map((trackedCaloriesBurned) => {
    if (trackedCalories.has(String(trackedCaloriesBurned.activity))) {
      trackedCalories.set(String(trackedCaloriesBurned.activity), Number(trackedCalories.get(trackedCaloriesBurned.activity)) + Number(trackedCaloriesBurned.totalCaloriesBurned))
    } else {
      trackedCalories.set(String(trackedCaloriesBurned.activity), Number(trackedCaloriesBurned.totalCaloriesBurned))
    }
  })

  const series: ApexAxisChartSeries = [ ...trackedCalories.values() ]

  const options: ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels: [ ...trackedCalories.keys() ],
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
    <CaloriesBurnedPieGraphContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "4%" }} variant="h6">Tracked activities</Typography>
        <ReactApexChart options={ options } series={ series } type="donut" 
          height={ COMMON_SPACING.pieChart.height } width={ COMMON_SPACING.pieChart.width }/>
      </SimplePaper>
    </CaloriesBurnedPieGraphContainer>
  )
}

export default CaloriesBurnedGraphPie