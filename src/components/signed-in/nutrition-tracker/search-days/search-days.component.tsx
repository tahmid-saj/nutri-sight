import { ChangeEvent, FormEvent, useContext, useState } from "react";

import "./search-days.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";

import ConsumptionInfo from "../consumption-info/consumption-info.component";

import { NutritionTrackerContext } from "../../../../contexts/signed-in/nutrition-tracker/nutrition-tracker.context";

type FormFields = {
  dateTracked: string
}

const defaultFormFields = {
  dateTracked: ""
};

const SearchDays = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const [searchedClicked, setSearchClicked] = useState(false)

  const { getDayTracked } = useContext(NutritionTrackerContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    setSearchClicked(true)
    event.preventDefault();

    
    // resetFormFields();
    getDayTracked(formFields.dateTracked)
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    

    setFormFields({ ...formFields, [name]: value })
  };

  return (
    <div className="search-days-nutrition-tracker-container">
      <div className="search-days-container">
        <div className="search-days-nutrition-tracker-separator-container">
          <hr className="rounded"/>
        </div>
        <h4>Search Days Tracked</h4>

        <form onSubmit={ handleSubmit }>
          <FormInput type="date" required name="dateTracked" value={ formFields.dateTracked } 
                      onChange={ handleChange }></FormInput>

          <div className="buttons-container">
            <Button buttonType="regular-button" type="submit">Search Date</Button>
          </div>
        </form>
      </div>

      {
        formFields !== defaultFormFields && searchedClicked &&
        <ConsumptionInfo></ConsumptionInfo> 
      }
    </div>
  );
};

export default SearchDays;