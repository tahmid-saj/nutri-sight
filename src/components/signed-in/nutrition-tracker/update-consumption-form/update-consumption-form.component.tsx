import { useState, useContext, MouseEvent, ChangeEvent } from "react";

import "./update-consumption-form.styles.tsx";
import { UpdateConsumptionFormContainer, ConsumptionFormButtonContainer } from "./update-consumption-form.styles.tsx";

import FormInput from "../../../shared/form-input/form-input.component.tsx";
import Button from "../../../shared/button/button.component.tsx";
import AddMicronutrients from "../add-micronutrients/add-micronutrients.component.tsx";

import { NutritionTrackerContext } from "../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context.tsx";
import { Typography } from "@mui/material";
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts";

type FormFields = {
  dateTracked: string,
  calories: string,
  carbohydrates: string,
  protein: string,
  fat: string
}

const defaultFormFields = {
  dateTracked: "",
  calories: "",
  carbohydrates: "",
  protein: "",
  fat: ""
};

const UpdateConsumptionForm = () => {
  const { nutritionTrackedDays, addDayTracked, updateDayTracked, formInputMicronutrients } = useContext(NutritionTrackerContext);

  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);

  const paperStyles = {
    backgroundColor: COLOR_CODES.general["1"],
    display: "block",
    justifyContent: "center",
    alignItems: "center"
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleAddTrackedDay = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await addDayTracked({
      dateTracked: formFields.dateTracked,
      calories: Number(formFields.calories),
      macronutrients: {
        carbohydrates: Number(formFields.carbohydrates),
        protein: Number(formFields.protein),
        fat: Number(formFields.fat),
      },
      micronutrients: []
    });

    resetFormFields(); 
  };

  const handleUpdateTrackedDay = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    

    await updateDayTracked({
      dateTracked: formFields.dateTracked,
      calories: Number(formFields.calories),
      macronutrients: {
        carbohydrates: Number(formFields.carbohydrates),
        protein: Number(formFields.protein),
        fat: Number(formFields.fat),
      },
      micronutrients: []
    });

    resetFormFields(); 
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  };

  return (
    <UpdateConsumptionFormContainer 
      // micronutrientsAdded={ formInputMicronutrients.length !== 0 }
      >
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