import "./calories-burned-graph-pie.styles.scss"
import ReactApexChart from 'react-apexcharts'
import { useContext, Fragment } from "react"
import { CaloriesBurnedContext } from "../../../../../contexts/signed-out/calories-burned/calories-burned.context"

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

  const series = [ ...trackedCalories.values() ]

  const options = {
    chart: {
      type: 'donut',
      height: 600,
    },
    labels: [ ...trackedCalories.keys() ],
    responsive: [{
      breakpoint: 50,
      options: {
        chart: {
          height: 600
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }

  return (
    <Fragment>
      <h4>Tracked activities</h4>
      <div className="calories-burned-dashboard-graph-pie-container">
        <ReactApexChart options={ options } series={ series } type="donut" height={ 600 } width={ 700 }/>
      </div>
    </Fragment>
  )
}

export default CaloriesBurnedGraphPie