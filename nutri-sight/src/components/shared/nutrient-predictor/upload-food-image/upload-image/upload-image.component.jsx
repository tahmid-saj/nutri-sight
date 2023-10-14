import React, { useState } from "react";

import "./upload-image.styles.scss";
import FormInput from "../../../form-input/form-input.component";
import Button from "../../../button/button.component";

const UploadImage = ({ displayNutrients }) => {
  const [uploadedImage, setUploadedImage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(uploadedImage);

    displayNutrients(true);
  };

  const handleChange = (event) => {
    event.preventDefault();

    setUploadedImage(event.target.value);
  };

  return (
    <div className="upload-image-container">
      <h3>Upload a food image</h3>

      <form onSubmit={ handleSubmit }>
        <FormInput type="file" id="uploadedImage" name="uploadedImage" 
                  onChange={ handleChange } required value={ uploadedImage }></FormInput>
        <Button buttonType="regularButton" type="submit">Detect Nutrients</Button>
      </form>
    </div>
  )
};

export default UploadImage;
