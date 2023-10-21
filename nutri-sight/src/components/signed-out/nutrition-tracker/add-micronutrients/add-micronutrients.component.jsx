import React, { Component, useContext, useState } from "react";

import { ReactComponent as AddMicronutrientsButton } from "../../../../assets/add-micronutrients.svg";
import { ReactComponent as RemoveMicronutrientsButton } from "../../../../assets/close-button.svg";

import FormInput from "../../../shared/form-input/form-input.component";

import "./add-micronutrients.styles.scss";

import { NutritionTrackerContext } from "../../../../contexts/signed-out/nutrition-tracker/nutrition-tracker.context";

const AddMicronutrients = () => {
  const { formInputMicronutrients, addFormInputMicronutrients,
          updateFormInputMicronutrients, deleteFormInputMicronutrients } = useContext(NutritionTrackerContext);

  const handleAdd = () => {
    addFormInputMicronutrients();
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

    updateFormInputMicronutrients(micronutrient, micronutrientIndex);
  };

  const handleDelete = (micronutrientIndex) => {

    deleteFormInputMicronutrients(micronutrientIndex);
  };

  return (
    <div className="add-micronutrients-container">

        <div className="add-micronutrients-button-container">
          <h4>Add micronutrients</h4>
          
          <AddMicronutrientsButton onClick={ () => handleAdd() }
                className="add-micronutrients-button">      
          </AddMicronutrientsButton>
        </div>

        <div>
          {
            formInputMicronutrients.length !== 0 &&
            formInputMicronutrients.map((micronutrient, micronutrientIndex) => {
              return (
                <div key={ micronutrientIndex } className="micronutrient-container">
                  <FormInput label="Micronutrient" type="text" required onChange={ event => handleChange(event, micronutrientIndex) }
                            name="name" value={ micronutrient.name }></FormInput>
                  
                  <FormInput label="Amount" type="text" required onChange={ event => handleChange(event, micronutrientIndex) }
                            name="amount" value={ micronutrient.amount }></FormInput>

                  <FormInput label="Unit" type="text" required onChange={ event => handleChange(event, micronutrientIndex) }
                            name="unit" value={ micronutrient.unit }></FormInput>

                  <RemoveMicronutrientsButton onClick={ () => handleDelete(micronutrientIndex) }
                        className="remove-micronutrients-button"></RemoveMicronutrientsButton>
                </div>
              );
            })
          }
      </div>


    </div>
  );
};

export default AddMicronutrients;
