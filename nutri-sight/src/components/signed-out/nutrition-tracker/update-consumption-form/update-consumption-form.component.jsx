import { useState, useContext } from "react";

import "./update-consumption-form.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";
import AddMicronutrients from "../add-micronutrients/add-micronutrients.component";

import { NutritionTrackerContext } from "../../../../context/signed-out/nutrition-tracker/nutrition-tracker.context";

const defaultFormFields = {
  dateTracked: "",
  calories: "",
  carbohydrates: "",
  protein: "",
  fat: ""
};

const UpdateConsumptionForm = () => {
  const { nutritionTrackedDays, addDayTracked, updateDayTracked } = useContext(NutritionTrackerContext);

  const [formFields, setFormFields] = useState(defaultFormFields);
  // const { dateTracked, calories, carbohydrates, protein, fat } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(event.target.value);


    resetFormFields(); 
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
        <FormInput type="date" required name="dateTracked" value={ formFields.dateTracked }></FormInput>

        <FormInput label="Total calories" type="text" required onChange={ handleChange }
                            name="calories" value={ formFields.calories }></FormInput>
        
        <FormInput label="Total carbohydrates (g)" type="text" required onChange={ handleChange }
                            name="carbohydrates" value={ formFields.carbohydrates }></FormInput>
        
        <FormInput label="Total protein (g)" type="text" required onChange={ handleChange }
                            name="protein" value={ formFields.protein }></FormInput>
        
        <FormInput label="Total fat (g)" type="text" required onChange={ handleChange }
                            name="fat" value={ formFields.fat }></FormInput>
                            
        <AddMicronutrients></AddMicronutrients>

        <div className="buttons-container">
          <Button buttonType="regularButton" type="submit">Add Day</Button>
          {
            nutritionTrackedDays.length !== 0 &&
            <Button buttonType="regularButton" type="submit">Update</Button>
          }
        </div>

      </form>

      
    </div>
  );
};

export default UpdateConsumptionForm;