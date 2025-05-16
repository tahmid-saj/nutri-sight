import "./nutrition-tracker-graph-macronutrients.styles.js"
import { NutritionTrackerDashboardGraphNutrientsContainer } from "./nutrition-tracker-graph-macronutrients.styles.js";
import { Fragment, useContext, useState, Component } from "react";
import ReactApexChart from 'react-apexcharts'

import { NutritionTrackerContext } from "../../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context.js";
import { GRAPH_FIELDS } from "../../../../../utils/constants/nutrition-tracker.constants.js";
import { COLOR_CODES, COMMON_SPACING } from "../../../../../utils/constants/shared.constants.js";
import { Typography } from "@mui/material";
import SimplePaper from "../../../../shared/mui/paper/paper.component.js";
import { NutritionTrackedDay } from "../../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.types.js";
import { ApexOptions } from "apexcharts";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"]
}

const NutritionTrackerGraphMacronutrients = () => {
  const { nutritionTrackedDaysView } = useContext(NutritionTrackerContext);

  const carbohydratesData = nutritionTrackedDaysView.map((nutritionTrackedDay: NutritionTrackedDay) => {
    return nutritionTrackedDay.macronutrients.carbohydrates
  });
  const proteinData = nutritionTrackedDaysView.map((nutritionTrackedDay: NutritionTrackedDay) => {
    return nutritionTrackedDay.macronutrients.protein
  });
  const fatData = nutritionTrackedDaysView.map((nutritionTrackedDay: NutritionTrackedDay) => {
    return nutritionTrackedDay.macronutrients.fat
  });
  const trackedDays = nutritionTrackedDaysView.map((nutritionTrackedDay: NutritionTrackedDay) => {
    return nutritionTrackedDay.dateTracked
  })

  const series: ApexAxisChartSeries = [{
    name: GRAPH_FIELDS.carbohydrates,
    data: carbohydratesData
  }, {
    name: GRAPH_FIELDS.protein,
    data: proteinData
  }, {
    name: GRAPH_FIELDS.fat,
    data: fatData
  }];

  const options: ApexOptions = {
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
    <NutritionTrackerDashboardGraphNutrientsContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="body1">Macronutrients consumption</Typography>
        <ReactApexChart options={ options } series={ series } type="bar" 
          height={ COMMON_SPACING.barChart.height } width={ COMMON_SPACING.barChart.width }/>
      </SimplePaper>
    </NutritionTrackerDashboardGraphNutrientsContainer>
  )
}

export default NutritionTrackerGraphMacronutrients