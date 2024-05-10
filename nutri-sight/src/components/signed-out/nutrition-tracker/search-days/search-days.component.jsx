import { useState } from "react";

import "./search-days.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";

import ConsumptionInfo from "../consumption-info/consumption-info.component";

import { NutritionTrackerContext } from "../../../../contexts/signed-out/nutrition-tracker/nutrition-tracker.context";

const defaultFormFields = {
  dateTracked: ""
};

const SearchDays = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [searchedDay, setSearchedDay] = useState(false);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchedDay(true);

    console.log(event.target.value);
    // resetFormFields();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    console.log(name, value);

    setFormFields({ [name]: value })
    setSearchedDay(false);
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
            <Button buttonType="regularButton" type="submit">Search Date</Button>
          </div>
        </form>
      </div>

      { formFields !== defaultFormFields && searchedDay && 
        <ConsumptionInfo searchedDay={ formFields.dateTracked }></ConsumptionInfo> 
      }
    </div>
  );
};

export default SearchDays;