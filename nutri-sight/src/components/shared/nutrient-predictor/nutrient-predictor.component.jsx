import React, { Component } from "react";

import "./nutrient-predictor.styles.scss";
import UploadFoodImage from "./upload-food-image/upload-food-image.component";
import NutrientsInfo from "./nutrients-info/nutrients-info.component";

class NutrientPredictor extends Component {
  constructor() {
    super();

    this.state = {
      displayNutrientsInfo: false,
    }
  };

  displayNutrients = (displayNutrientsInfo) => {
    this.setState({ displayNutrientsInfo: displayNutrientsInfo })
  }

  render = () => {
    return (
      <div className="upload-food-image-nutrients-info-container">
        <UploadFoodImage displayNutrients={ this.displayNutrients }></UploadFoodImage>
  
        {
          this.state.displayNutrientsInfo &&
          <NutrientsInfo></NutrientsInfo>
        }
      </div>
    )
  }

};

export default NutrientPredictor;
