import React, { useState, useContext } from "react";

import "./upload-image.styles.scss";
import FormInput from "../../../form-input/form-input.component";
import Button from "../../../button/button.component";

import { NutrientPredictorContext } from "../../../../../context/shared/nutrient-predictor/nutrient-predictor.context";

const UploadImage = ({ displayNutrients }) => {
  const [uploadedImage, setUploadedImage] = useState();

  const { imageAndPrediction, updateImage, updateImageAndPrediction } = useContext(NutrientPredictorContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(uploadedImage);

    updateImageAndPrediction(uploadedImage, "image");
    displayNutrients(true);
  };

  const handleChange = (event) => {
    event.preventDefault();

    console.log(event.target.value);

    setUploadedImage(event.target.value);
    updateImage(event.target.value);
  };

  return (
    <div className="upload-image-container">
      <h3>Upload a food image</h3>

      <form onSubmit={ handleSubmit }>
        <FormInput type="file" id="uploadedImage" name="uploadedImage" 
                  onChange={ handleChange } required value={ uploadedImage } accept="image/*"></FormInput>
        <Button buttonType="regularButton" type="submit">Detect Nutrients</Button>
      </form>
    </div>
  )
};

export default UploadImage;
