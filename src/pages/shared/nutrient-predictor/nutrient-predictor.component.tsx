import "./nutrient-predictor.styles.tsx";
import { NutrientPredictorContainer, NutrientPredictionInfo } from "./nutrient-predictor.styles.tsx"

import React, { Component, useContext } from "react";
import UploadFoodImage from "../../../components/shared/nutrient-predictor/upload-food-image/upload-food-image.component.tsx";
import NutrientsInfo from "../../../components/shared/nutrient-predictor/nutrients-info/nutrients-info.component.tsx";

import { NutrientPredictorContext } from "../../../contexts/shared/nutrient-predictor/nutrient-predictor.context.tsx";
import { Divider, Typography } from "@mui/material";
import { COLOR_CODES } from "../../../utils/constants/shared.constants.ts";

const NutrientPredictor = () => {
  const { nutrientPredictions } = useContext(NutrientPredictorContext);

  return (
    <NutrientPredictorContainer>
      <Typography sx={{ display: "flex", justifyContent: "center", color: COLOR_CODES.general["6"] }} 
        variant="h6">Predict some nutrients</Typography>
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
