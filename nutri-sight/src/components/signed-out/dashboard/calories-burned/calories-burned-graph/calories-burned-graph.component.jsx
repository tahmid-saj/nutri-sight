import "./calories-burned-graph.styles.scss"
import ReactApexChart from "react-apexcharts"
import { useContext } from "react"
import { CaloriesBurnedContext } from "../../../../../contexts/signed-out/calories-burned/calories-burned.context"

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

  const series = [{
    name: "Calories Burned",
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
      text: "Tracked Days",
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
    <div className="calories-burned-dashboard-graph-line-container">
      <ReactApexChart options={ options } series={ series } type="area" height={ 500 } width={ 1000 }/>
    </div>
  )
}

export default CaloriesBurnedGraph