import "./calories-burned-graph-pie.styles.tsx"
import { CaloriesBurnedDashboardGraphPieContainer } from "./calories-burned-graph-pie.styles.tsx"
import ReactApexChart from 'react-apexcharts'
import { useContext, Fragment } from "react"
import { CaloriesBurnedContext } from "../../../../../contexts/signed-in/calories-burned/calories-burned.context.tsx"
import { Typography } from "@mui/material"
import { COLOR_CODES, COMMON_SPACING } from "../../../../../utils/constants/shared.constants.ts"
import SimplePaper from "../../../../shared/mui/paper/paper.component.tsx"
import { ApexOptions } from "apexcharts"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["0"],
  margin: "2%",
}

const CaloriesBurnedGraphPie = () => {
  const { trackedCaloriesBurned } = useContext(CaloriesBurnedContext)

  let trackedCalories = new Map()
  const trackedCaloriesBurnedActivities = trackedCaloriesBurned.map((trackedCaloriesBurned) => {
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
    <Fragment>
      <SimplePaper styles={ paperStyles }>
        <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} variant="h6">Tracked activities</Typography>
        <CaloriesBurnedDashboardGraphPieContainer>
          <ReactApexChart options={ options } series={ series } type="donut" 
            height={ COMMON_SPACING.pieChart.height } width={ COMMON_SPACING.pieChart.width }/>
        </CaloriesBurnedDashboardGraphPieContainer>
      </SimplePaper>
    </Fragment>
  )
}

export default CaloriesBurnedGraphPie