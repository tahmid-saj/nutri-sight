import "./calories-burned-graph-pie.styles.scss"
import { useContext } from "react"
import { CaloriesBurnedContext } from "../../../../../contexts/signed-in/calories-burned/calories-burned.context"
import ReactApexChart from 'react-apexcharts'

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
    <div className="calories-burned-graph-pie-container">
      <ReactApexChart options={ options } series={ series } type="donut" height={ 600 } width={ 500 }/>
    </div>
  )
}

export default CaloriesBurnedGraphPie