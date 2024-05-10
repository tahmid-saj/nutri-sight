import React, { useState, useContext } from "react";

import "./upload-image.styles.scss";
import FormInput from "../../../form-input/form-input.component";
import Button from "../../../button/button.component";

import { NutrientPredictorContext } from "../../../../../contexts/shared/nutrient-predictor/nutrient-predictor.context";

// import * as nutritionPredictorExternal from "../../../../../utils/external-js/nutrition-predictor.external";

const defaultFormFields = {
  meal: "",
  uploadedImage: ""
}

const UploadImage = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { updateImage, updateImageAndPrediction } = useContext(NutrientPredictorContext);

  const resetFormFields = (event) => {
    event.preventDefault()
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(formFields.uploadedImage);

    if (formFields.meal !== "") {
      console.log("meal hit")
    } else {
      updateImageAndPrediction(formFields.uploadedImage, "image");
    }

    // displayNutrients(true);
    // resetFormFields()
  };

  const handleChange = (event, type) => {
    event.preventDefault();
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value });

    if (type === "image") {
      updateImage(event.target.value);

      const imageEl = document.getElementById('imageOutput');
      if (imageEl !== null) {
        imageEl.src = URL.createObjectURL(event.target.files[0]);
      }
    }
  };

  return (
    <div className="upload-image-container">
      <h3>Upload a food image or enter a meal description</h3>
      <h5>Example: 1 pound of steak with mashed potatoes and a can of sprite</h5>

      <form className="upload-image-form-container" onSubmit={ handleSubmit }>
        <FormInput label="Meal" type="text" onChange={ handleChange }
                            name="meal" value={ formFields.meal }></FormInput>

        <FormInput type="file" id="uploadedImage" name="uploadedImage" 
                  onChange={ (e) => handleChange(e, "image") } value={ formFields.uploadedImage } accept="image/*"></FormInput>

        <div className="buttons-container">
          <Button buttonType="regularButton" type="submit">Predict</Button>
          <Button buttonType="regularButton" type="button" onClick={ resetFormFields }>Clear</Button>
        </div>
      </form>

      <img alt="" className="uploded-image-container"
            id="imageOutput" 
            style={{ width: "500px", height: "500px", visibility: `${formFields.uploadedImage === "" ? "hidden" : ""}` }}></img>

    </div>
  )
};

export default UploadImage;
