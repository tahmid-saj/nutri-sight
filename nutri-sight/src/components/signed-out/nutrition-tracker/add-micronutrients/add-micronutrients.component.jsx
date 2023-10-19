import React, { Component, useContext, useState } from "react";

import { ReactComponent as AddMicronutrientsButton } from "../../../../assets/add-micronutrients.svg";
import { ReactComponent as RemoveMicronutrientsButton } from "../../../../assets/close-button.svg";

import FormInput from "../../../shared/form-input/form-input.component";

import "./add-micronutrients.styles.scss";

const AddMicronutrients = () => {
  const [micronutrients, setMicronutrients] = useState([]);

  const handleAdd = () => {
    const micronutrient = [...micronutrients, []];
    setMicronutrients(micronutrient);
  };

  const handleChange = (onChangeValue, i) => {
    const inputData = [...micronutrients];
    inputData[i] = onChangeValue.target.value;
    setMicronutrients(inputData);
  };

  const handleDelete = (i) => {
    const deleteMicronutrient = [...micronutrients];
    deleteMicronutrient.splice(i, 1);
    setMicronutrients(deleteMicronutrient);
  };

  return (
    <div className="add-micronutrients-container">
        {/* <h4>Add micronutrients</h4>
        <AddMicronutrientsButton onChange={ this.handleChange } 
              onClick={ this.handleClick } className="add-micronutrients-button"/>

        <Micronutrients micronutrients={ this.state.micronutrients }/> */}

        <div className="add-micronutrients-button-container">
          <h4>Add micronutrients</h4>
          <AddMicronutrientsButton onClick={ () => handleAdd() }
                className="add-micronutrients-button"></AddMicronutrientsButton>
        </div>

        <div>
          {
            micronutrients.flatMap((data, i) => {
              return (
                <div className="micronutrient-container">
                  <FormInput label="Micronutrient" type="text" required onChange={ event => handleChange(event, i) }
                            name="micronutrient" value={ data }></FormInput>
                  
                  <FormInput label="Amount (g)" type="text" required onChange={ event => handleChange(event, i) }
                            name="amount" value={ data }></FormInput>

                  <RemoveMicronutrientsButton onClick={ () => handleDelete() }
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