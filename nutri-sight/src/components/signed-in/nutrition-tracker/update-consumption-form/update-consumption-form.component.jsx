import { useState, useContext } from "react";

import "./update-consumption-form.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";
// import Button from "../../../shared/button/button.component";
import AddMicronutrients from "../add-micronutrients/add-micronutrients.component";

import { NutritionTrackerContext } from "../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context";

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

  const handleAddTrackedDay = (event) => {
    event.preventDefault();

    console.log(formFields);

    addDayTracked({
      dateTracked: formFields.dateTracked,
      calories: formFields.calories,
      macronutrients: {
        carbohydrates: formFields.carbohydrates,
        protein: formFields.protein,
        fat: formFields.fat,
      }
    });

    resetFormFields(); 
  };

  const handleUpdateTrackedDay = (event) => {
    event.preventDefault();

    console.log(formFields);

    updateDayTracked({
      dateTracked: formFields.dateTracked,
      calories: formFields.calories,
      macronutrients: {
        carbohydrates: formFields.carbohydrates,
        protein: formFields.protein,
        fat: formFields.fat,
      }
    });

    resetFormFields(); 
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  };

  return (
    <div className="update-consumption-form-container">
      <h2>Update Consumption</h2>

      <form>
        <h4>Date tracked</h4>
        <FormInput type="date" required onChange={ handleChange }
                    name="dateTracked" value={ formFields.dateTracked }></FormInput>

        <FormInput label="Total calories" type="text" required onChange={ handleChange }
                            name="calories" value={ formFields.calories }></FormInput>
        
        <FormInput label="Total carbohydrates (g)" type="text" required onChange={ handleChange }
                            name="carbohydrates" value={ formFields.carbohydrates }></FormInput>
        
        <FormInput label="Total protein (g)" type="text" required onChange={ handleChange }
                            name="protein" value={ formFields.protein }></FormInput>
        
        <FormInput label="Total fat (g)" type="text" required onChange={ handleChange }
                            name="fat" value={ formFields.fat }></FormInput>
                            
        <AddMicronutrients></AddMicronutrients>

        <div className="tracked-day-buttons-container">
          <button className="tracked-day-button" type="button"
                  onClick={ handleAddTrackedDay }>Add Day</button>
          {
            nutritionTrackedDays.length !== 0 &&
            <button className="tracked-day-button" type="submit"
                    onClick={ handleUpdateTrackedDay }>Update</button>
          }
        </div>

      </form>

      
    </div>
  );
};

export default UpdateConsumptionForm;