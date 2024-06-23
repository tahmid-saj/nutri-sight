import { useState, useContext } from "react";

import "./update-consumption-form.styles.jsx";
import { UpdateConsumptionFormContainer, ConsumptionFormButtonContainer } from "./update-consumption-form.styles.jsx";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";
import AddMicronutrients from "../add-micronutrients/add-micronutrients.component";

// import { NutritionTrackerContext } from "../../../../contexts/signed-out/nutrition-tracker/nutrition-tracker.context";
import { useDispatch, useSelector } from "react-redux"
import { selectNutritionTrackedDays, selectFormInputMicronutrients } from "../../../../store/signed-out/nutrition-tracker/nutrition-tracker.selector"
import { addDayTracked, updateDayTracked, setFormInputMicronutrients } from "../../../../store/signed-out/nutrition-tracker/nutrition-tracker.action";
import { Typography } from "@mui/material";
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.js";

const defaultFormFields = {
  dateTracked: "",
  calories: "",
  carbohydrates: "",
  protein: "",
  fat: ""
};

const UpdateConsumptionForm = () => {
  // const { nutritionTrackedDays, addDayTracked, updateDayTracked } = useContext(NutritionTrackerContext);
  const dispatch = useDispatch()
  const nutritionTrackedDays = useSelector(selectNutritionTrackedDays)
  const formInputMicronutrients = useSelector(selectFormInputMicronutrients)
  
  const [formFields, setFormFields] = useState(defaultFormFields);
  
  const paperStyles = {
    backgroundColor: COLOR_CODES.general["1"],
    display: "block",
    justifyContent: "center",
    alignItems: "center"
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleAddTrackedDay = (event) => {
    event.preventDefault();

    

    dispatch(addDayTracked(nutritionTrackedDays, formInputMicronutrients, {
      dateTracked: formFields.dateTracked,
      calories: formFields.calories,
      macronutrients: {
        carbohydrates: formFields.carbohydrates,
        protein: formFields.protein,
        fat: formFields.fat,
      }
    }))
    dispatch(setFormInputMicronutrients([]))

    resetFormFields(); 
  };

  const handleUpdateTrackedDay = (event) => {
    event.preventDefault();

    

    dispatch(updateDayTracked(nutritionTrackedDays, formInputMicronutrients, {
      dateTracked: formFields.dateTracked,
      calories: formFields.calories,
      macronutrients: {
        carbohydrates: formFields.carbohydrates,
        protein: formFields.protein,
        fat: formFields.fat,
      }
    }))
    dispatch(setFormInputMicronutrients([]))

    resetFormFields(); 
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  };

  return (
    <UpdateConsumptionFormContainer micronutrientsAdded={ formInputMicronutrients.length !== 0 }>
      <div className="container">
      <SimplePaper styles={ paperStyles }>
        <Typography variant="h6">Track some consumption</Typography>
        <Typography sx={{ marginBottom: "6%" }} 
          variant="body1">Start by adding the consumption of calories, carbohydrates, protein and fat for a specific day</Typography>

        <form>
          <Typography variant="body1">Date tracked</Typography>
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

          <div className="row">
            <div className="col-12">
              <div className="btn-group flex-wrap" role="group">
                <Button type="button" onClick={ handleAddTrackedDay }>Add Day</Button>
                {
                  nutritionTrackedDays.length !== 0 &&
                  <Button type="submit" onClick={ handleUpdateTrackedDay }>Update Day</Button>
                }
              </div>
            </div>
          </div>
        </form>
      </SimplePaper>
      
      </div>
    </UpdateConsumptionFormContainer>
  );
};

export default UpdateConsumptionForm;