import "./calories-graph.styles.scss"
import ReactApexChart from "react-apexcharts"
import { useContext } from "react"
import { NutritionTrackerContext } from "../../../../contexts/signed-out/nutrition-tracker/nutrition-tracker.context"

const CaloriesGraph = () => {
  const { nutritionTrackedDays } = useContext(NutritionTrackerContext)

  let trackedCalories = new Map()
  const trackedDayCalories = nutritionTrackedDays.map((trackedDate) => {
    if (trackedCalories.has(String(trackedDate.dateTracked))) {
      trackedCalories.set(String(trackedDate.dateTracked), Number(trackedCalories.get(trackedDate.dateTracked)) + Number(trackedDate.calories))
    } else {
      trackedCalories.set(String(trackedDate.dateTracked), Number(trackedDate.calories))
    }
  })

  const series = [{
    name: "Calories Consumption",
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
      text: "Tracked Calories",
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
    <div className="nutrition-tracker-calories-graph-container">
      <ReactApexChart options={ options } series={ series } type="area" height={ 500 } width={ "90%" }/>
    </div>
  )
}

export default CaloriesGraph