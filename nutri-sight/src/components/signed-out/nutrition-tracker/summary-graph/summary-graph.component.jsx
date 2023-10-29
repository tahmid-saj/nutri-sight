import { useContext, useState, Component } from "react";
import ReactApexChart from 'react-apexcharts'

import "./summary-graph.styles.scss";

import { NutritionTrackerContext } from "../../../../contexts/signed-out/nutrition-tracker/nutrition-tracker.context";

import { GRAPH_FIELDS } from "../../../../utils/constants/nutrition-tracker.constants";

const SummaryGraph = () => {
  const { nutritionTrackedDays } = useContext(NutritionTrackerContext);
  const caloriesData = nutritionTrackedDays.map(nutritionTrackedDay => {
    return nutritionTrackedDay.calories
  });
  const carbohydratesData = nutritionTrackedDays.map(nutritionTrackedDay => {
    return nutritionTrackedDay.macronutrients.carbohydrates
  });
  const proteinData = nutritionTrackedDays.map(nutritionTrackedDay => {
    return nutritionTrackedDay.macronutrients.protein
  });
  const fatData = nutritionTrackedDays.map(nutritionTrackedDay => {
    return nutritionTrackedDay.macronutrients.fat
  });
  const trackedDays = nutritionTrackedDays.map(nutritionTrackedDay => {
    return nutritionTrackedDay.dateTracked
  })

  const series = [{
      name: GRAPH_FIELDS.calories,
      data: caloriesData
    }, {
      name: GRAPH_FIELDS.carbohydrates,
      data: carbohydratesData
    }, {
      name: GRAPH_FIELDS.protein,
      data: proteinData
    }, {
      name: GRAPH_FIELDS.fat,
      data: fatData
    }];
  
  const options = {
    chart: {
      type: 'bar',
      height: 350,
      width: 100,
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      },
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          total: {
            enabled: false,
            style: {
              fontSize: '20px',
              fontWeight: 1000
            }
          }
        }
      },
    },
    xaxis: {
      type: 'string',
      categories: trackedDays,
    },
    legend: {
      position: 'right',
      offsetY: 40
    },
    fill: {
      opacity: 0.8
    }
  };

  return (
    <div id="chart">
      <h2>Summary</h2>
      <ReactApexChart options={ options } series={ series } type="bar" height={ 350 } width={ 1300 }/>
    </div>
  )
}

class SummaryGraph2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [{
        name: 'PRODUCT A',
        data: [44, 55, 41, 67, 22, 43]
      }, {
        name: 'PRODUCT B',
        data: [13, 23, 20, 8, 13, 27]
      }, {
        name: 'PRODUCT C',
        data: [11, 17, 15, 15, 21, 14]
      }, {
        name: 'PRODUCT D',
        data: [21, 7, 25, 13, 22, 8]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350,
          width: 100,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            dataLabels: {
              total: {
                enabled: false,
                style: {
                  fontSize: '30px',
                  fontWeight: 900
                }
              }
            }
          },
        },
        xaxis: {
          type: 'datetime',
          categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
            '01/05/2011 GMT', '01/06/2011 GMT'
          ],
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      },
    
    
    };
  }



  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} width={1300}/>
      </div>
    )
  }
}

export default SummaryGraph;
