import React from "react";

import "./upload-image.styles.scss";
import FormInput from "../../../form-input/form-input.component";
import Button from "../../../button/button.component";

const UploadImage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="upload-image-container">
      <h3>Upload a food image</h3>

      <form onSubmit={ handleSubmit }>
        <FormInput type="file" id="uploadedImage" name="uploadedImage"></FormInput>
        <Button buttonType="regularButton" type="submit">Detect Nutrients</Button>
      </form>
    </div>
  )
};

export default UploadImage;
