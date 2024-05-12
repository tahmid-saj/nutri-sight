import "./nutrition-tracker-graph-macronutrients.styles.scss"
import { Fragment, useContext, useState, Component } from "react";
import ReactApexChart from 'react-apexcharts'

import { NutritionTrackerContext } from "../../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context";
import { GRAPH_FIELDS } from "../../../../../utils/constants/nutrition-tracker.constants";

const NutritionTrackerGraphMacronutrients = () => {
  const { nutritionTrackedDaysView } = useContext(NutritionTrackerContext);

  const carbohydratesData = nutritionTrackedDaysView.map(nutritionTrackedDay => {
    return nutritionTrackedDay.macronutrients.carbohydrates
  });
  const proteinData = nutritionTrackedDaysView.map(nutritionTrackedDay => {
    return nutritionTrackedDay.macronutrients.protein
  });
  const fatData = nutritionTrackedDaysView.map(nutritionTrackedDay => {
    return nutritionTrackedDay.macronutrients.fat
  });
  const trackedDays = nutritionTrackedDaysView.map(nutritionTrackedDay => {
    return nutritionTrackedDay.dateTracked
  })

  const series = [{
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
    <div className="nutrition-tracker-dashboard-graph-nutrients-container">
        <h4>Macronutrients consumption</h4>
        <ReactApexChart options={ options } series={ series } type="bar" height={ 350 } width={ "100%" }/>
    </div>
  )
}

export default NutritionTrackerGraphMacronutrients