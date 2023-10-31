import React, { useState, useContext } from "react";

import "./upload-image.styles.scss";
import FormInput from "../../../form-input/form-input.component";
import Button from "../../../button/button.component";

import { NutrientPredictorContext } from "../../../../../contexts/shared/nutrient-predictor/nutrient-predictor.context";

// import * as nutritionPredictorExternal from "../../../../../utils/external-js/nutrition-predictor.external";

const UploadImage = () => {
  const [uploadedImage, setUploadedImage] = useState("");

  const { updateImage, updateImageAndPrediction } = useContext(NutrientPredictorContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(uploadedImage);

    updateImageAndPrediction(uploadedImage, "image");
    // displayNutrients(true);
  };

  const handleChange = (event) => {
    event.preventDefault();

    console.log(event.target.value);

    setUploadedImage(event.target.value);
    updateImage(event.target.value);

    const imageEl = document.getElementById('imageOutput');

    if (imageEl !== null) {
      imageEl.src = URL.createObjectURL(event.target.files[0]);
    }
  };

  return (
    <div className="upload-image-container">
      <h3>Upload a food image</h3>

      <form onSubmit={ handleSubmit }>
        <FormInput type="file" id="uploadedImage" name="uploadedImage" 
                  onChange={ handleChange } required value={ uploadedImage } accept="image/*"></FormInput>
        <Button buttonType="regularButton" type="submit">Detect Nutrients</Button>
      </form>

      <img className="uploded-image-container"
            id="imageOutput" 
            style={{ width: "500px", height: "500px", visibility: `${uploadedImage === "" ? "hidden" : ""}` }}></img>
    </div>
  )
};

export default UploadImage;
