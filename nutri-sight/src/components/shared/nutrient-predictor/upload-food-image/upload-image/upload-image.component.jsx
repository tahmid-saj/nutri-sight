import "./upload-image.styles.jsx";
import { UploadImageContainer, UploadImageForm, UploadedImage } from "./upload-image.styles.jsx";

import React, { useState, useContext } from "react";
import FormInput from "../../../form-input/form-input.component";
import Button from "../../../button/button.component";

import { NutrientPredictorContext } from "../../../../../contexts/shared/nutrient-predictor/nutrient-predictor.context";

import { NUTRIENT_PREDICTOR_ENUMS } from "../../../../../utils/constants/nutrient-predictor.constants";
import { ButtonsContainer } from "../../../button/button.styles.jsx";
import { Typography } from "@mui/material";

const defaultFormFields = {
  mealDescription: "",
  uploadedImage: ""
}

const UploadImage = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { updateImage, updateImageAndPrediction, detectNutrients } = useContext(NutrientPredictorContext);

  const resetFormFields = (event) => {
    event.preventDefault()
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(formFields.uploadedImage);

    if (formFields.mealDescription !== "") {
      await detectNutrients(formFields.mealDescription)
      console.log("meal hit")
    } else {
      await updateImageAndPrediction(formFields.uploadedImage, NUTRIENT_PREDICTOR_ENUMS.image);
    }

    // displayNutrients(true);
    // resetFormFields()
  };

  const handleChange = (event, type) => {
    event.preventDefault();
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value });

    if (type === NUTRIENT_PREDICTOR_ENUMS.image) {
      updateImage(event.target.value);

      const imageEl = document.getElementById('imageOutput');
      if (imageEl !== null) {
        imageEl.src = URL.createObjectURL(event.target.files[0]);
      }
    }
  };

  return (
    <UploadImageContainer>

      <UploadImageForm onSubmit={ handleSubmit }>
        <Typography variant="h6">Upload a food image or enter a meal description</Typography>
        <Typography paragraph>Example: 1 pound of steak with mashed potatoes and a can of sprite</Typography>
        <FormInput label="Meal description" type="text" onChange={ handleChange }
                            name="mealDescription" value={ formFields.mealDescription }></FormInput>

        <FormInput type="file" id="uploadedImage" name="uploadedImage" 
                  onChange={ (e) => handleChange(e, NUTRIENT_PREDICTOR_ENUMS.image) } value={ formFields.uploadedImage } accept="image/*"></FormInput>

        <ButtonsContainer>
          <Button buttonType="regular-button" type="submit">Predict</Button>
          <Button buttonType="regular-button" type="button" onClick={ resetFormFields }>Clear</Button>
        </ButtonsContainer>
      </UploadImageForm>

      <UploadedImage alt="" id="imageOutput" 
            style={{ width: "500px", height: "500px", visibility: `${formFields.uploadedImage === "" ? "hidden" : ""}` }}></UploadedImage>

    </UploadImageContainer>
  )
};

export default UploadImage;
