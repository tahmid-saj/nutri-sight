import "./calories-burned-graph-line.styles.scss"
import ReactApexChart from "react-apexcharts"
import { useContext } from "react"
import { CaloriesBurnedContext } from "../../../../../contexts/signed-in/calories-burned/calories-burned.context"

import { GRAPH_FIELDS } from "../../../../../utils/constants/calories-burned.constants"

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

  const series = [{
    name: GRAPH_FIELDS.caloriesBurnedTitle,
    data: [ ...trackedCalories.values() ]
  }]

  const options = {
    chart: {
      type: 'area',
      height: 500,
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
    <div className="calories-burned-graph-line-container">
      <ReactApexChart options={ options } series={ series } type="area" height={ 500 } width={ 800 }/>
    </div>
  )
}

export default CaloriesBurnedGraphLine