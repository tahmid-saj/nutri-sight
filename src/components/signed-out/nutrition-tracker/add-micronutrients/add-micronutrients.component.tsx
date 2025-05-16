import React, { Component, Fragment, useContext, useState } from "react";

import { ReactComponent as AddMicronutrientsButton } from "../../../../assets/add-micronutrients.svg";
import { ReactComponent as RemoveMicronutrientsButton } from "../../../../assets/close-button.svg";

import FormInput from "../../../shared/form-input/form-input.component.tsx";

import "./add-micronutrients.styles.tsx";
import { AddMicronutrientsButtonContainer,
  MicronutrientContainer
} from "./add-micronutrients.styles.tsx";

// import { NutritionTrackerContext } from "../../../../contexts/signed-out/nutrition-tracker/nutrition-tracker.context";
import { useDispatch, useSelector } from "react-redux"
import { selectFormInputMicronutrients } from "../../../../store/signed-out/nutrition-tracker/nutrition-tracker.selector.ts";
import { addFormInputMicronutrients, updateFormInputMicronutrients, deleteFormInputMicronutrients } from "../../../../store/signed-out/nutrition-tracker/nutrition-tracker.action.ts";
import { Typography } from "@mui/material";
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts";

const paperStyles = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  backgroundColor: COLOR_CODES.general["5"],
  height: 100
}

const AddMicronutrients = () => {
  // const { formInputMicronutrients, addFormInputMicronutrients, updateFormInputMicronutrients, deleteFormInputMicronutrients } = useContext(NutritionTrackerContext);
  const dispatch = useDispatch()
  const formInputMicronutrients = useSelector(selectFormInputMicronutrients)

  const handleAdd = () => {
    dispatch(addFormInputMicronutrients(formInputMicronutrients))
  };

  const handleChange = (event, micronutrientIndex) => {

    let micronutrient;

    if (event.target.name === "name") {
      micronutrient = { 
        name: event.target.value,
        amount: formInputMicronutrients[micronutrientIndex].amount,
        unit: formInputMicronutrients[micronutrientIndex].unit,
       };
    } else if (event.target.name === "amount") {
      micronutrient = { 
        name: formInputMicronutrients[micronutrientIndex].name,
        amount: event.target.value,
        unit: formInputMicronutrients[micronutrientIndex].unit,
       };
    } else if (event.target.name === "unit") {
      micronutrient = {
        name: formInputMicronutrients[micronutrientIndex].name,
        amount: formInputMicronutrients[micronutrientIndex].amount,
        unit: event.target.value,
      }
    }

    dispatch(updateFormInputMicronutrients(formInputMicronutrients, micronutrient, micronutrientIndex))
  };

  const handleDelete = (micronutrientIndex) => {

    dispatch(deleteFormInputMicronutrients(formInputMicronutrients, micronutrientIndex))
  };

  return (
    <Fragment>
        <AddMicronutrientsButtonContainer>
          <Typography variant="body1">Add micronutrients</Typography>
          
          <AddMicronutrientsButton onClick={ () => handleAdd() }
                className="add-micronutrients-button">      
          </AddMicronutrientsButton>
        </AddMicronutrientsButtonContainer>

        <div>
          {
            formInputMicronutrients.length !== 0 &&
            formInputMicronutrients.map((micronutrient, micronutrientIndex) => {
              return (
                <MicronutrientContainer key={ micronutrientIndex }>
                  <RemoveMicronutrientsButton onClick={ () => handleDelete(micronutrientIndex) }
                        className="remove-micronutrients-button"></RemoveMicronutrientsButton>
                  <SimplePaper styles={ paperStyles }>
                    <FormInput label="Micronutrient" type="text" required onChange={ event => handleChange(event, micronutrientIndex) }
                              name="name" value={ micronutrient.name }></FormInput>
                    <FormInput label="Amount" type="text" required onChange={ event => handleChange(event, micronutrientIndex) }
                              name="amount" value={ micronutrient.amount }></FormInput>
                    <FormInput label="Unit" type="text" required onChange={ event => handleChange(event, micronutrientIndex) }
                              name="unit" value={ micronutrient.unit }></FormInput>
                  </SimplePaper>
                </MicronutrientContainer>
              );
            })
          }
      </div>
    </Fragment>
  );
};

export default AddMicronutrients;
