import "./upload-image.styles.jsx";
import { UploadImageContainer, UploadImageForm, UploadedImage, UploadedImageContainer } from "./upload-image.styles.jsx";

import React, { useState, useContext } from "react";
import FormInput from "../../../form-input/form-input.component";
import Button from "../../../button/button.component";

import { NutrientPredictorContext } from "../../../../../contexts/shared/nutrient-predictor/nutrient-predictor.context";

import { NUTRIENT_PREDICTOR_ENUMS } from "../../../../../utils/constants/nutrient-predictor.constants";
import { ButtonsContainer } from "../../../button/button.styles.jsx";
import { Typography } from "@mui/material";
import SimplePaper from "../../../mui/paper/paper.component.jsx";
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants.js";

const defaultFormFields = {
  mealDescription: "",
  uploadedImagePath: "",
  uploadedImage: "",
  imageUrl: "",
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["0"]
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

    

    if (formFields.mealDescription !== "") {
      // use the meal description to predict
      await detectNutrients(formFields.mealDescription)
      
    } else {
      // use the uploaded image to predict
      if (formFields.imageUrl && formFields.imageUrl !== "") {
        await updateImageAndPrediction(formFields.imageUrl, NUTRIENT_PREDICTOR_ENUMS.url)
      } else {
        await updateImageAndPrediction(formFields.uploadedImagePath, NUTRIENT_PREDICTOR_ENUMS.image, formFields.uploadedImage);
      }
    }

    // displayNutrients(true);
    // resetFormFields()
  };

  const handleChange = (event, type) => {
    event.preventDefault();
    const { name, value } = event.target
    

    setFormFields({ 
      ...formFields,
      uploadedImage: name === "uploadedImagePath" ? event.target.files[0] : "",
      [name]: value }
    );

    if (type === NUTRIENT_PREDICTOR_ENUMS.image || type === NUTRIENT_PREDICTOR_ENUMS.url) {
      // updateImage(event.target.value, type);

      const imageEl = document.getElementById('imageOutput');
      if (imageEl !== null) {

        if (type === NUTRIENT_PREDICTOR_ENUMS.image) {
          imageEl.src = URL.createObjectURL(event.target.files[0]);
          // setFormFields({ ...formFields, uploadedImage: URL.createObjectURL(event.target.files[0]) }) set the actual image
        
          
        } else if (type === NUTRIENT_PREDICTOR_ENUMS.url) {
          imageEl.src = event.target.value;
        }
      }
    }
  };

  return (
    <UploadImageContainer>
      <div className="container">
        <div className="row">
          <SimplePaper styles={ paperStyles }>
            <UploadImageForm onSubmit={ handleSubmit }>
              <Typography variant="h6">Upload a food image or enter a meal description</Typography>
              <Typography paragraph>Example: 1 pound of steak with mashed potatoes and a can of sprite</Typography>
              <FormInput label="Meal description" type="text" onChange={ handleChange }
                                  name="mealDescription" value={ formFields.mealDescription }></FormInput>

              <FormInput label="Image URL" type="url" id="imageUrl" name="imageUrl" 
                        onChange={ (e) => handleChange(e, NUTRIENT_PREDICTOR_ENUMS.url) } value={ formFields.imageUrl }></FormInput>

              <FormInput disabled type="file" id="uploadedImagePath" name="uploadedImagePath" 
                        onChange={ (e) => handleChange(e, NUTRIENT_PREDICTOR_ENUMS.image) } value={ formFields.uploadedImagePath } accept="image/*"></FormInput>

              <div className="col-12">
                <div className="btn-group flex-wrap" role="group">
                  <Button buttonType="regular-button" type="submit">Predict</Button>
                  <Button buttonType="regular-button" type="button" onClick={ resetFormFields }>Clear</Button>
                </div>
              </div>
            </UploadImageForm>
          </SimplePaper>


          <div className="col" visible>
            <UploadedImageContainer
              visible={ `${(formFields.uploadedImagePath === "" && formFields.imageUrl === "") ? "hidden" : ""}` }>
              <UploadedImage alt="" id="imageOutput" 
                    style={{ width: "375px", height: "375px", 
                    // visibility: `${(formFields.uploadedImagePath === "" && formFields.imageUrl === "") ? "hidden" : ""}` 
                    }}></UploadedImage>

                  {/* <UploadedImage alt="" id="imageOutput" 
                        style={{ width: "500px", height: "500px" }}></UploadedImage> */}
            </UploadedImageContainer>
          </div>
        </div>
      </div>
    </UploadImageContainer>
  )
};

export default UploadImage;
