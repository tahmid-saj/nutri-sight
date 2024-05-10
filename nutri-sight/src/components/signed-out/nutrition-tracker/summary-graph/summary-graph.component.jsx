import { Fragment, useContext, useState, Component } from "react";
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
    <Fragment>
      <h4>Consumption Timeline</h4>
      <div className="summary-graph-container">
        <ReactApexChart options={ options } series={ series } type="bar" height={ 350 } width={ 1000 }/>
      </div>
    </Fragment>
  )
}

export default SummaryGraph;
