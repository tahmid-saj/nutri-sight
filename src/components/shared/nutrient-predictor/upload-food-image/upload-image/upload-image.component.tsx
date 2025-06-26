import "./upload-image.styles.tsx";
import {
  UploadImageContainer,
  UploadImageForm,
  UploadedImage,
  UploadedImageContainer,
} from "./upload-image.styles.tsx";

import React, {
  useState,
  useContext,
  MouseEvent,
  FormEvent,
  ChangeEvent,
} from "react";
import FormInput from "../../../form-input/form-input.component.tsx";
import Button from "../../../button/button.component.tsx";

import { NutrientPredictorContext } from "../../../../../contexts/shared/nutrient-predictor/nutrient-predictor.context.tsx";

import { NUTRIENT_PREDICTOR_ENUMS } from "../../../../../utils/constants/nutrient-predictor.constants.ts";
import { ButtonsContainer } from "../../../button/button.styles.tsx";
import { Typography } from "@mui/material";
import SimplePaper from "../../../mui/paper/paper.component.tsx";
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants.ts";

type FormFields = {
  mealDescription: string;
  uploadedImagePath: string;
  uploadedImage: File | null;
  imageUrl: string;
};

const defaultFormFields: FormFields = {
  mealDescription: "",
  uploadedImagePath: "",
  uploadedImage: null,
  imageUrl: "",
};

const paperStyles = {
  backgroundColor: COLOR_CODES.general["0"],
};

const UploadImage: React.FC = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);

  const {
    updateImage,
    updateImageAndPrediction,
    detectNutrients,
  } = useContext(NutrientPredictorContext);

  const resetFormFields = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formFields.mealDescription !== "") {
      await detectNutrients(formFields.mealDescription, "description");
    } else {
      if (formFields.imageUrl && formFields.imageUrl !== "") {
        await updateImageAndPrediction(
          formFields.imageUrl,
          NUTRIENT_PREDICTOR_ENUMS.url
        );
      } else if (formFields.uploadedImagePath && formFields.uploadedImage) {
        await updateImageAndPrediction(
          formFields.uploadedImagePath,
          NUTRIENT_PREDICTOR_ENUMS.image,
          formFields.uploadedImage
        );
      }
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const { name, value, files } = event.target;

    const updatedFields: Partial<FormFields> = {
      [name]: value,
    };

    if (name === "uploadedImagePath" && files && files.length > 0) {
      updatedFields.uploadedImage = files[0];
    }

    setFormFields((prev) => ({
      ...prev,
      ...updatedFields,
    }));

    if (
      type === NUTRIENT_PREDICTOR_ENUMS.image ||
      type === NUTRIENT_PREDICTOR_ENUMS.url
    ) {
      const imageEl = document.getElementById(
        "imageOutput"
      ) as HTMLImageElement | null;

      if (imageEl) {
        if (type === NUTRIENT_PREDICTOR_ENUMS.image && files?.[0]) {
          imageEl.src = URL.createObjectURL(files[0]);
        } else if (type === NUTRIENT_PREDICTOR_ENUMS.url) {
          imageEl.src = value;
        }
      }
    }
  };

  return (
    <UploadImageContainer>
      <div className="container">
        <div className="row">
          <SimplePaper styles={paperStyles}>
            <UploadImageForm onSubmit={handleSubmit}>
              <Typography variant="h6">
                Upload a food image or enter a meal description
              </Typography>
              <Typography paragraph>
                Example: 1 pound of steak with mashed potatoes and a can of
                sprite
              </Typography>
              <FormInput
                label="Meal description"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, "")
                }
                name="mealDescription"
                value={formFields.mealDescription}
              />
              <FormInput
                label="Image URL"
                type="url"
                id="imageUrl"
                name="imageUrl"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, NUTRIENT_PREDICTOR_ENUMS.url)
                }
                value={formFields.imageUrl}
              />
              <FormInput
                type="file"
                id="uploadedImagePath"
                name="uploadedImagePath"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, NUTRIENT_PREDICTOR_ENUMS.image)
                }
                accept="image/*"
              />

              <div className="col-12">
                <div className="btn-group flex-wrap" role="group">
                  <Button buttonType="regular-button" type="submit">
                    Predict
                  </Button>
                  <Button
                    buttonType="regular-button"
                    type="button"
                    onClick={resetFormFields}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </UploadImageForm>
          </SimplePaper>

          <div className="col">
            <UploadedImageContainer
              visible={
                formFields.uploadedImagePath === "" &&
                formFields.imageUrl === ""
                  ? "hidden"
                  : ""
              }
            >
              <UploadedImage
                alt=""
                id="imageOutput"
                style={{
                  width: "375px",
                  height: "375px",
                }}
              />
            </UploadedImageContainer>
          </div>
        </div>
      </div>
    </UploadImageContainer>
  );
};

export default UploadImage;
