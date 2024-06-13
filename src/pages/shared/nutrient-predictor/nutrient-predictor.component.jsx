import "./nutrient-predictor.styles.jsx";
import { NutrientPredictorContainer, NutrientPredictionInfo } from "./nutrient-predictor.styles"

import React, { Component, useContext } from "react";
import UploadFoodImage from "../../../components/shared/nutrient-predictor/upload-food-image/upload-food-image.component.jsx";
import NutrientsInfo from "../../../components/shared/nutrient-predictor/nutrients-info/nutrients-info.component.jsx";

import { NutrientPredictorContext } from "../../../contexts/shared/nutrient-predictor/nutrient-predictor.context.js";
import { Divider, Typography } from "@mui/material";

const NutrientPredictor = () => {
  const { nutrientPredictions } = useContext(NutrientPredictorContext);

  return (
    <NutrientPredictorContainer>
      <Typography sx={{ display: "flex", justifyContent: "center" }} variant="h6">Predict some nutrients</Typography>
      <UploadFoodImage 
        // displayNutrients={ this.displayNutrients }
      ></UploadFoodImage>

      <Divider/>

      <NutrientPredictionInfo>
      {
        nutrientPredictions.length ? <NutrientsInfo></NutrientsInfo> : null
      }
      </NutrientPredictionInfo>
    </NutrientPredictorContainer>
  );
};

export default NutrientPredictor;
