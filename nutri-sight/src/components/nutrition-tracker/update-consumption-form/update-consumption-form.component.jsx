import { useState } from "react";

import "./update-consumption-form.styles.scss";

import FormInput from "../../form-input/form-input.component";
import Button from "../../button/button.component";
import AddMicronutrients from "../add-micronutrients/add-micronutrients.component";

const defaultFormFields = {
  dateTracked: "",
  calories: "",
  carbohydrates: "",
  protein: "",
  fat: ""
};

const UpdateConsumptionForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { dateTracked, calories, carbohydrates, protein, fat } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ [name]: value })
  };

  return (
    <div className="update-consumption-form-container">
      <h2>Update Consumption</h2>

      <form onSubmit={ handleSubmit }>
        <h4>Date tracked</h4>
        <FormInput type="date" required name="dateTracked" value={ dateTracked }></FormInput>

        <FormInput label="Total calories" type="text" required onChange={ handleChange }
                            name="calories" value={ calories }></FormInput>
        
        <FormInput label="Total carbohydrates" type="text" required onChange={ handleChange }
                            name="carbohydrates" value={ carbohydrates }></FormInput>
        
        <FormInput label="Total protein" type="text" required onChange={ handleChange }
                            name="protein" value={ protein }></FormInput>
        
        <FormInput label="Total fat" type="text" required onChange={ handleChange }
                            name="fat" value={ fat }></FormInput>
                            
        <AddMicronutrients></AddMicronutrients>

        <div className="buttons-container">
          <Button buttonType="regularButton" type="submit">Add Day</Button>
          <Button buttonType="regularButton" type="submit">Update</Button>
        </div>

      </form>

      
    </div>
  );
};

export default UpdateConsumptionForm;